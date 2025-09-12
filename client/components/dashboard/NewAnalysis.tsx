import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  Search,
  MapPin,
  FileText,
  CheckCircle,
  X,
  Map,
  Navigation,
} from "lucide-react";

// Simple Location Picker without React Leaflet
function SimpleLocationPicker({
  onLocationSelect,
  initialLocation,
}: {
  onLocationSelect: (location: {
    lat: number;
    lng: number;
    address: string;
  }) => void;
  initialLocation?: { lat: number; lng: number };
}) {
  const [position, setPosition] = React.useState(
    initialLocation || { lat: 40.7128, lng: -74.006 },
  );
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`,
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const newPosition = { lat: parseFloat(lat), lng: parseFloat(lon) };
        setPosition(newPosition);
        onLocationSelect({
          lat: parseFloat(lat),
          lng: parseFloat(lon),
          address: display_name,
        });
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMapClick = () => {
    const newLat = position.lat + (Math.random() - 0.5) * 0.01;
    const newLng = position.lng + (Math.random() - 0.5) * 0.01;
    const newPosition = { lat: newLat, lng: newLng };
    setPosition(newPosition);

    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${newLat}&lon=${newLng}`,
    )
      .then((response) => response.json())
      .then((data) => {
        const address =
          data.display_name || `${newLat.toFixed(6)}, ${newLng.toFixed(6)}`;
        onLocationSelect({ lat: newLat, lng: newLng, address });
      })
      .catch(() => {
        const address = `${newLat.toFixed(6)}, ${newLng.toFixed(6)}`;
        onLocationSelect({ lat: newLat, lng: newLng, address });
      });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Search for a location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          className="flex-1"
          disabled={isLoading}
        />
        <Button onClick={handleSearch} variant="outline" disabled={isLoading}>
          <Search className="h-4 w-4" />
        </Button>
      </div>

      <div
        className="h-64 rounded-lg border bg-gray-50 cursor-pointer flex items-center justify-center hover:bg-gray-100 transition-colors"
        onClick={handleMapClick}
      >
        <div className="text-center">
          <div className="text-4xl mb-2">🗺️</div>
          <div className="font-medium text-gray-700">Interactive Map</div>
          <div className="text-sm text-gray-500 mt-1">
            Lat: {position.lat.toFixed(4)}, Lng: {position.lng.toFixed(4)}
          </div>
          <div className="text-xs text-gray-400 mt-2">
            Click to select a location
          </div>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <MapPin className="inline h-4 w-4 mr-1" />
        Click on the map to select a location, or use the search bar above
      </div>
    </div>
  );
}

// Location Picker Component - Simplified working version
function LocationPicker({
  onLocationSelect,
  initialLocation,
}: {
  onLocationSelect: (location: {
    lat: number;
    lng: number;
    address: string;
  }) => void;
  initialLocation?: { lat: number; lng: number };
}) {
  return (
    <SimpleLocationPicker
      onLocationSelect={onLocationSelect}
      initialLocation={initialLocation}
    />
  );
}

export default function NewAnalysis() {
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = React.useState<1 | 2 | 3>(1);

  // Stage 1: Property Address
  const [selectedLocation, setSelectedLocation] = React.useState<{
    lat: number;
    lng: number;
    address: string;
  } | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [mapStyle, setMapStyle] = React.useState<
    "streets" | "satellite" | "terrain"
  >("streets");

  // Stage 2: Upload Floor Plan with Sequential Verification
  const [uploadedFiles, setUploadedFiles] = React.useState<
    Array<{
      file: File;
      progress: number;
      status: "uploading" | "completed" | "error" | "analyzing" | "verified";
      speed: string;
      id: string;
      ocrText?: string;
      detectedRooms?: Array<{
        id: string;
        name: string;
        x: number;
        y: number;
        width: number;
        height: number;
      }>;
      verified: boolean;
    }>
  >([]);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [currentVerificationIndex, setCurrentVerificationIndex] =
    React.useState<number>(-1);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [showAnalysisModal, setShowAnalysisModal] = React.useState(false);
  const [analysisResults, setAnalysisResults] = React.useState<{
    fileId: string;
    ocrText: string;
    detectedRooms: any[];
    verified: boolean;
    isEditing?: boolean;
  } | null>(null);

  // Stage 3: Review & Settings
  const [fileSettings, setFileSettings] = React.useState<
    Record<
      string,
      {
        scale: string;
        detectionAccuracy: "auto" | "manual";
      }
    >
  >({});

  // Navigation
  const nextStage = () => {
    if (currentStage < 3) {
      setCurrentStage((currentStage + 1) as 1 | 2 | 3);
    }
  };

  const prevStage = () => {
    if (currentStage > 1) {
      setCurrentStage((currentStage - 1) as 1 | 2 | 3);
    }
  };

  // Stage 1 Functions
  const handleLocationSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`,
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        setSelectedLocation({
          lat: parseFloat(lat),
          lng: parseFloat(lon),
          address: display_name,
        });
      }
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const handleMapClick = () => {
    // Simulate map click - in real implementation, this would use actual map coordinates
    const newLat =
      (selectedLocation?.lat || 40.7128) + (Math.random() - 0.5) * 0.01;
    const newLng =
      (selectedLocation?.lng || -74.006) + (Math.random() - 0.5) * 0.01;

    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${newLat}&lon=${newLng}`,
    )
      .then((response) => response.json())
      .then((data) => {
        const address =
          data.display_name || `${newLat.toFixed(6)}, ${newLng.toFixed(6)}`;
        setSelectedLocation({ lat: newLat, lng: newLng, address });
      })
      .catch(() => {
        const address = `${newLat.toFixed(6)}, ${newLng.toFixed(6)}`;
        setSelectedLocation({ lat: newLat, lng: newLng, address });
      });
  };

  // Stage 2 Functions
  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    // Only take the first file for single upload
    const file = files[0];
    const newFileData = {
      file,
      progress: 0,
      status: "uploading" as const,
      speed: "0 KB/sec",
      id: Date.now() + Math.random().toString(),
      verified: false,
    };

    setUploadedFiles((prev) => [...prev, newFileData]);

    // Initialize settings for new file
    setFileSettings((prev) => ({
      ...prev,
      [newFileData.id]: { scale: "1:100", detectionAccuracy: "auto" },
    }));

    // Simulate upload progress - faster for demo
    const interval = setInterval(() => {
      setUploadedFiles((prev) =>
        prev.map((f) => {
          if (f.id === newFileData.id) {
            const newProgress = Math.min(f.progress + Math.random() * 25, 100); // Increased increment
            const newStatus = newProgress >= 100 ? "completed" : "uploading";
            return {
              ...f,
              progress: newProgress,
              status: newStatus,
              speed: `${Math.floor(Math.random() * 300) + 100} KB/sec`, // Higher speed
            };
          }
          return f;
        }),
      );
    }, 100); // Reduced interval from 200ms to 100ms

    setTimeout(() => {
      clearInterval(interval);
      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.id === newFileData.id
            ? { ...f, progress: 100, status: "completed" as const }
            : f,
        ),
      );

      // Automatically start verification for the newly uploaded image - instant for demo
      setCurrentVerificationIndex(uploadedFiles.length); // Index of the new image
      performOCRAnalysis(newFileData.id);
    }, 600); // Reduced from 1200ms to 600ms for super fast demo
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    // Only take the first file if multiple are dropped
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const singleFileList = new DataTransfer();
      singleFileList.items.add(files[0]);
      handleFileUpload(singleFileList.files);
    }
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
    setFileSettings((prev) => {
      const newSettings = { ...prev };
      delete newSettings[fileId];
      return newSettings;
    });
  };

  const handleCameraUpload = () => {
    alert("Camera upload functionality would be implemented here");
  };

  // OCR and Room Detection Functions
  const performOCRAnalysis = async (fileId: string) => {
    setIsAnalyzing(true);
    setShowAnalysisModal(true);

    // Simulate OCR analysis - instant for demo
    const sampleRooms = [
      { id: "1", name: "Living Room", x: 50, y: 50, width: 200, height: 150 },
      { id: "2", name: "Kitchen", x: 300, y: 50, width: 150, height: 100 },
      { id: "3", name: "Bedroom", x: 50, y: 250, width: 180, height: 120 },
      { id: "4", name: "Bathroom", x: 300, y: 200, width: 100, height: 80 },
    ];

    const ocrText = "Sample OCR text from floor plan analysis...";

    // Update file with analysis results
    setUploadedFiles((prev) =>
      prev.map((f) =>
        f.id === fileId
          ? {
              ...f,
              status: "analyzing" as const,
              ocrText,
              detectedRooms: sampleRooms,
            }
          : f,
      ),
    );

    // Store results for modal display
    setAnalysisResults({
      fileId,
      ocrText,
      detectedRooms: sampleRooms,
      verified: false,
    });

    setIsAnalyzing(false);
  };

  const detectRooms = (fileId: string) => {
    // Simulate room detection - instant for demo
    const sampleRooms = [
      { id: "1", name: "Living Room", x: 50, y: 50, width: 200, height: 150 },
      { id: "2", name: "Kitchen", x: 300, y: 50, width: 150, height: 100 },
      { id: "3", name: "Bedroom", x: 50, y: 250, width: 180, height: 120 },
      { id: "4", name: "Bathroom", x: 300, y: 200, width: 100, height: 80 },
    ];

    setUploadedFiles((prev) =>
      prev.map((f) =>
        f.id === fileId
          ? {
              ...f,
              detectedRooms: sampleRooms,
            }
          : f,
      ),
    );
  };

  const verifyImage = (fileId: string) => {
    // Update analysis results to show verification
    setAnalysisResults((prev) => (prev ? { ...prev, verified: true } : null));

    // Update the file status
    setUploadedFiles((prev) =>
      prev.map((f) =>
        f.id === fileId
          ? {
              ...f,
              status: "verified" as const,
              verified: true,
            }
          : f,
      ),
    );

    // Auto-close modal after 2 seconds
    setTimeout(() => {
      setShowAnalysisModal(false);
      setAnalysisResults(null);

      // Move to next image for verification or allow next upload
      const currentIndex = uploadedFiles.findIndex((f) => f.id === fileId);
      if (currentIndex < 3) {
        // Allow up to 4 images (0-3 index)
        setCurrentVerificationIndex(-1); // Reset to allow next upload
      } else {
        // All 4 images verified, can proceed to next stage
        setCurrentVerificationIndex(-1);
      }
    }, 2000);
  };

  const openAnalysisModal = (fileId: string, isEditing = false) => {
    const fileData = uploadedFiles.find((f) => f.id === fileId);
    if (!fileData) return;

    setAnalysisResults({
      fileId,
      ocrText:
        fileData.ocrText || "Sample OCR text from floor plan analysis...",
      detectedRooms: fileData.detectedRooms || [
        { id: "1", name: "Living Room", x: 50, y: 50, width: 200, height: 150 },
        { id: "2", name: "Kitchen", x: 300, y: 50, width: 150, height: 100 },
        { id: "3", name: "Bedroom", x: 50, y: 250, width: 180, height: 120 },
        { id: "4", name: "Bathroom", x: 300, y: 200, width: 100, height: 80 },
      ],
      verified: fileData.verified,
      isEditing,
    });
    setShowAnalysisModal(true);
  };

  const closeAnalysisModal = () => {
    setShowAnalysisModal(false);
    setAnalysisResults(null);

    // If there are analysis results, mark the image as verified
    if (analysisResults) {
      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.id === analysisResults.fileId
            ? {
                ...f,
                status: "verified" as const,
                verified: true,
              }
            : f,
        ),
      );

      // Move to next image for verification or allow next upload
      const currentIndex = uploadedFiles.findIndex(
        (f) => f.id === analysisResults.fileId,
      );
      if (currentIndex < 3) {
        setCurrentVerificationIndex(-1);
      } else {
        setCurrentVerificationIndex(-1);
      }
    }
  };

  const startVerificationProcess = () => {
    if (uploadedFiles.length > 0) {
      setCurrentVerificationIndex(0);
      performOCRAnalysis(uploadedFiles[0].id);
    }
  };

  // Stage 3 Functions
  const updateFileSetting = (
    fileId: string,
    setting: "scale" | "detectionAccuracy",
    value: string,
  ) => {
    setFileSettings((prev) => ({
      ...prev,
      [fileId]: {
        ...prev[fileId],
        [setting]: value,
      },
    }));
  };

  // Render Header with Progress
  const renderHeader = () => (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">V</span>
          </div>
          <span className="text-xl font-bold text-gray-900">Vaastu 360</span>
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                currentStage >= 1 ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              {currentStage > 1 ? (
                <CheckCircle className="w-4 h-4 text-white" />
              ) : (
                <span className="text-white font-bold text-xs">1</span>
              )}
            </div>
            <span
              className={`text-sm font-medium ${
                currentStage >= 1 ? "text-green-600" : "text-gray-600"
              }`}
            >
              Property Address
            </span>
          </div>
          <div
            className={`w-8 h-0.5 ${
              currentStage >= 2 ? "bg-green-500" : "bg-gray-300"
            }`}
          ></div>
          <div className="flex items-center space-x-2">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                currentStage === 2
                  ? "bg-purple-600"
                  : currentStage > 2
                    ? "bg-green-500"
                    : "bg-gray-300"
              }`}
            >
              {currentStage > 2 ? (
                <CheckCircle className="w-4 h-4 text-white" />
              ) : (
                <span className="text-white font-bold text-xs">2</span>
              )}
            </div>
            <span
              className={`text-sm font-medium ${
                currentStage === 2
                  ? "text-purple-600"
                  : currentStage > 2
                    ? "text-green-600"
                    : "text-gray-600"
              }`}
            >
              Upload Floor Plan
            </span>
          </div>
          <div
            className={`w-8 h-0.5 ${
              currentStage >= 3 ? "bg-green-500" : "bg-gray-300"
            }`}
          ></div>
          <div className="flex items-center space-x-2">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                currentStage === 3 ? "bg-purple-600" : "bg-gray-300"
              }`}
            >
              <span className="text-white font-bold text-xs">3</span>
            </div>
            <span
              className={`text-sm font-medium ${
                currentStage === 3 ? "text-purple-600" : "text-gray-600"
              }`}
            >
              Confirm Rooms
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Stage 1: Property Address
  const renderStage1 = () => (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Property Address
            </h1>
            <p className="text-gray-600">
              Select and confirm your property's location for accurate Vastu
              analysis
            </p>
          </div>

          {/* Search Box */}
          <div className="flex gap-2 max-w-md">
            <Input
              placeholder="Search for property address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleLocationSearch()}
              className="flex-1"
            />
            <Button onClick={handleLocationSearch} variant="outline">
              <Search className="w-4 h-4" />
            </Button>
          </div>

          {/* Interactive Map */}
          <div className="relative">
            <div
              className="h-96 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg cursor-pointer flex items-center justify-center hover:shadow-lg transition-shadow"
              onClick={handleMapClick}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <div className="text-xl font-medium text-gray-700 mb-2">
                  Interactive Map
                </div>
                <div className="text-sm text-gray-500">
                  Lat: {selectedLocation?.lat.toFixed(4) || "40.7128"}, Lng:{" "}
                  {selectedLocation?.lng.toFixed(4) || "-74.0060"}
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  Click to select location
                </div>
              </div>
            </div>

            {/* Map Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <div className="bg-white rounded-lg shadow-md p-1">
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant={mapStyle === "streets" ? "default" : "ghost"}
                    onClick={() => setMapStyle("streets")}
                    className="text-xs"
                  >
                    Streets
                  </Button>
                  <Button
                    size="sm"
                    variant={mapStyle === "satellite" ? "default" : "ghost"}
                    onClick={() => setMapStyle("satellite")}
                    className="text-xs"
                  >
                    Satellite
                  </Button>
                  <Button
                    size="sm"
                    variant={mapStyle === "terrain" ? "default" : "ghost"}
                    onClick={() => setMapStyle("terrain")}
                    className="text-xs"
                  >
                    Terrain
                  </Button>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-2">
                <div className="flex flex-col gap-1">
                  <Button size="sm" variant="ghost" className="p-1">
                    <span className="text-lg">+</span>
                  </Button>
                  <Button size="sm" variant="ghost" className="p-1">
                    <span className="text-lg">−</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Property Info Card */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Property Details
          </h3>

          {selectedLocation ? (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-start space-x-3 mb-4">
                <MapPin className="w-5 h-5 text-purple-600 mt-1" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">
                    Selected Location
                  </h4>
                  <p className="text-sm text-gray-600">
                    {selectedLocation.address}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-gray-500">Latitude</Label>
                  <p className="text-sm font-medium">
                    {selectedLocation.lat.toFixed(6)}
                  </p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Longitude</Label>
                  <p className="text-sm font-medium">
                    {selectedLocation.lng.toFixed(6)}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No location selected</p>
              <p className="text-sm text-gray-500 mt-1">
                Search or click on the map to select your property location
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Render Stage 2: Upload Floor Plan
  const renderStage2 = () => (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Content - Main Upload Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Page Title & Subtitle */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Upload Floor Plan - Image {uploadedFiles.length + 1} of 4
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Upload your property's floor plan images one by one for Smart room
              detection and comprehensive Vaastu analysis.
            </p>
            <p className="text-sm text-gray-500">
              Supports JPG, PNG, PDF files up to 10MB. Upload and verify each
              image before proceeding to the next.
            </p>
          </div>

          {/* Upload Options */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="secondary"
              className="text-white px-8 py-3 text-lg font-medium"
              disabled={
                currentVerificationIndex >= 0 ||
                uploadedFiles.length >= 4 ||
                (uploadedFiles.length > 0 &&
                  !uploadedFiles[uploadedFiles.length - 1].verified)
              }
            >
              <Upload className="w-5 h-5 mr-2" />
              {uploadedFiles.length === 0
                ? "Upload Image 1"
                : uploadedFiles[uploadedFiles.length - 1].verified
                  ? `Upload Image ${uploadedFiles.length + 1}`
                  : "Complete Verification First"}
            </Button>
            <Button
              onClick={handleCameraUpload}
              variant="outline"
              className="px-8 py-3 text-lg font-medium border-secondary text-secondary hover:bg-secondary/10"
              disabled={
                currentVerificationIndex >= 0 ||
                uploadedFiles.length >= 4 ||
                (uploadedFiles.length > 0 &&
                  !uploadedFiles[uploadedFiles.length - 1].verified)
              }
            >
              📷 Take Photo {uploadedFiles.length + 1}
            </Button>
          </div>

          {/* Drag & Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-xl p-16 text-center transition-all duration-200 ${
              currentVerificationIndex >= 0 ||
              (uploadedFiles.length > 0 &&
                !uploadedFiles[uploadedFiles.length - 1].verified)
                ? "border-gray-200 bg-gray-50 cursor-not-allowed"
                : isDragOver
                  ? "border-purple-400 bg-purple-50 shadow-lg cursor-pointer"
                  : "border-gray-300 bg-white hover:border-purple-300 hover:shadow-md cursor-pointer"
            }`}
            onDragOver={
              currentVerificationIndex >= 0 ||
              (uploadedFiles.length > 0 &&
                !uploadedFiles[uploadedFiles.length - 1].verified)
                ? undefined
                : handleDragOver
            }
            onDragLeave={
              currentVerificationIndex >= 0 ||
              (uploadedFiles.length > 0 &&
                !uploadedFiles[uploadedFiles.length - 1].verified)
                ? undefined
                : handleDragLeave
            }
            onDrop={
              currentVerificationIndex >= 0 ||
              (uploadedFiles.length > 0 &&
                !uploadedFiles[uploadedFiles.length - 1].verified)
                ? undefined
                : handleDrop
            }
          >
            <div className="space-y-4">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Upload className="w-10 h-10 text-purple-600" />
              </div>
              <div className="space-y-2">
                {currentVerificationIndex >= 0 ? (
                  <>
                    <p className="text-xl font-semibold text-gray-900">
                      Verification in Progress
                    </p>
                    <p className="text-gray-600">
                      Please complete the verification process before uploading
                      the next image
                    </p>
                  </>
                ) : uploadedFiles.length > 0 &&
                  !uploadedFiles[uploadedFiles.length - 1].verified ? (
                  <>
                    <p className="text-xl font-semibold text-gray-900">
                      Analysis in Progress
                    </p>
                    <p className="text-gray-600">
                      Please complete the analysis in the modal before uploading
                      the next image
                    </p>
                  </>
                ) : uploadedFiles.length >= 4 ? (
                  <>
                    <p className="text-xl font-semibold text-gray-900">
                      All Images Uploaded
                    </p>
                    <p className="text-gray-600">
                      You have uploaded all 4 required images. Proceed to
                      analysis.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-xl font-semibold text-gray-900">
                      Drag and drop your floor plan image{" "}
                      {uploadedFiles.length + 1}, or click below to browse
                    </p>
                    <p className="text-gray-600">
                      Upload one image at a time for detailed verification
                    </p>
                    <p className="text-sm text-gray-500">
                      Supports JPG, PNG, PDF files up to 10MB
                    </p>
                  </>
                )}
              </div>
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="secondary"
                className="text-white px-6 py-2"
                disabled={
                  currentVerificationIndex >= 0 ||
                  uploadedFiles.length >= 4 ||
                  (uploadedFiles.length > 0 &&
                    !uploadedFiles[uploadedFiles.length - 1].verified)
                }
              >
                {currentVerificationIndex >= 0
                  ? "Verification in Progress..."
                  : uploadedFiles.length >= 4
                    ? "All Images Uploaded"
                    : uploadedFiles.length > 0 &&
                        !uploadedFiles[uploadedFiles.length - 1].verified
                      ? "Analysis in Progress..."
                      : "Choose File"}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
              />
            </div>
          </div>

          {/* Upload Progress Messages */}
          {uploadedFiles.length > 0 &&
            uploadedFiles.length < 4 &&
            currentVerificationIndex === -1 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">ℹ️</span>
                  </div>
                  <p className="text-sm text-blue-800">
                    {uploadedFiles[uploadedFiles.length - 1].verified
                      ? `Image ${uploadedFiles.length} verified successfully. Ready to upload Image ${uploadedFiles.length + 1}.`
                      : `Image ${uploadedFiles.length} uploaded. Analysis modal will open automatically.`}
                  </p>
                </div>
              </div>
            )}

          {/* Start Verification Button */}
          {uploadedFiles.length >= 4 &&
            uploadedFiles.every((f) => f.status === "verified") &&
            currentVerificationIndex === -1 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-sm text-green-800">
                      All 4 images uploaded and verified successfully! Ready to
                      proceed to analysis.
                    </p>
                  </div>
                </div>
              </div>
            )}

          {/* Uploaded Files Grid */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Uploaded Files
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {uploadedFiles.map((fileData) => (
                  <div
                    key={fileData.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() =>
                      fileData.verified && openAnalysisModal(fileData.id, true)
                    }
                  >
                    <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                      <FileText className="w-12 h-12 text-gray-400" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {fileData.file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(fileData.file.size / 1024 / 1024).toFixed(1)}MB
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              fileData.status === "verified"
                                ? "bg-green-100 text-green-800"
                                : fileData.status === "analyzing"
                                  ? "bg-blue-100 text-blue-800"
                                  : fileData.status === "completed"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : fileData.status === "error"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {fileData.status === "verified"
                              ? "Verified ✓"
                              : fileData.status === "analyzing"
                                ? "Analyzing..."
                                : fileData.status === "completed"
                                  ? "Ready for Verification"
                                  : fileData.status === "error"
                                    ? "Error"
                                    : "Uploading..."}
                          </span>
                          {fileData.verified && (
                            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                              Click to edit
                            </span>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(fileData.id);
                          }}
                          className="text-red-500 hover:text-red-700 p-1 h-auto"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analysis Settings (shown when files are uploaded) */}
          {uploadedFiles.length > 0 &&
            uploadedFiles.every((f) => f.status === "completed") && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-purple-600 text-sm">ℹ️</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-purple-900 mb-2">
                      Analysis Settings
                    </h4>
                    <p className="text-sm text-purple-700 mb-3">
                      Smart system will automatically detect rooms and their
                      boundaries. You can adjust these in the next step.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {uploadedFiles.slice(0, 4).map((fileData) => (
                        <div key={fileData.id} className="space-y-2">
                          <Label className="text-xs text-purple-800">
                            {fileData.file.name.split(".")[0]} Scale
                          </Label>
                          <Select
                            value={fileSettings[fileData.id]?.scale || "1:100"}
                            onValueChange={(value) =>
                              updateFileSetting(fileData.id, "scale", value)
                            }
                          >
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1:50">
                                1:50 (Large scale)
                              </SelectItem>
                              <SelectItem value="1:100">
                                1:100 (Standard)
                              </SelectItem>
                              <SelectItem value="1:200">
                                1:200 (Medium scale)
                              </SelectItem>
                              <SelectItem value="1:500">
                                1:500 (Small scale)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>

        {/* Right Sidebar - Upload Progress */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Uploading
            </h3>

            {uploadedFiles.length === 0 ? (
              <div className="text-center py-8">
                <Upload className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No files uploaded yet</p>
                <p className="text-sm text-gray-400 mt-1">
                  Files will appear here during upload
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {uploadedFiles.map((fileData) => (
                  <div
                    key={fileData.id}
                    className="border border-gray-100 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                          <FileText className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {fileData.file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(fileData.file.size / 1024 / 1024).toFixed(1)}MB •{" "}
                            {fileData.speed}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(fileData.id)}
                        className="text-gray-400 hover:text-red-500 p-1"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">
                          {fileData.status === "completed"
                            ? "Completed"
                            : fileData.status === "error"
                              ? "Error"
                              : "Uploading..."}
                        </span>
                        <span className="text-gray-900 font-medium">
                          {Math.round(fileData.progress)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            fileData.status === "completed"
                              ? "bg-green-500"
                              : fileData.status === "error"
                                ? "bg-red-500"
                                : "bg-blue-500"
                          }`}
                          style={{ width: `${fileData.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upload Summary */}
          {uploadedFiles.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                Upload Summary
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Files</span>
                  <span className="font-medium">{uploadedFiles.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-medium text-green-600">
                    {
                      uploadedFiles.filter((f) => f.status === "completed")
                        .length
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Size</span>
                  <span className="font-medium">
                    {(
                      uploadedFiles.reduce(
                        (total, f) => total + f.file.size,
                        0,
                      ) /
                      1024 /
                      1024
                    ).toFixed(1)}
                    MB
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Render Stage 3: Review & Settings
  const renderStage3 = () => (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="space-y-8">
        {/* Enhanced Header Section */}
        <div className="text-center bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-100">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            🎯 Review & Finalize
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Perfect! All your files are uploaded. Review the settings below and
            get ready for comprehensive Vastu analysis.
          </p>
          <div className="flex items-center justify-center mt-4 space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Files Ready</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Settings Configured</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Analysis Ready</span>
            </div>
          </div>
        </div>

        {/* Enhanced Files Review Grid */}
        <div className="grid gap-6">
          {uploadedFiles.map((fileData, index) => (
            <div
              key={fileData.id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200"
            >
              {/* File Header with Enhanced Design */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center shadow-sm">
                      <FileText className="w-8 h-8 text-purple-600" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {fileData.file.name}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        {(fileData.file.size / 1024 / 1024).toFixed(1)} MB
                      </span>
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        {fileData.status === "completed"
                          ? "Verified"
                          : "Processing"}
                      </span>
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        Floor Plan {index + 1}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      fileData.status === "completed"
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                    }`}
                  >
                    {fileData.status === "completed"
                      ? "✅ Ready"
                      : "⏳ Processing"}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(fileData.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Enhanced Settings Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Drawing Scale Setting */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 text-sm">📐</span>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-gray-900">
                        Drawing Scale
                      </Label>
                      <p className="text-xs text-gray-600">
                        Floor plan measurement scale
                      </p>
                    </div>
                  </div>
                  <Select
                    value={fileSettings[fileData.id]?.scale || "1:100"}
                    onValueChange={(value) =>
                      updateFileSetting(fileData.id, "scale", value)
                    }
                  >
                    <SelectTrigger className="w-full bg-white border-gray-200 focus:ring-2 focus:ring-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1:50">
                        <div className="flex items-center space-x-2">
                          <span>📏</span>
                          <span>1:50 (Large scale - Detailed)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="1:100">
                        <div className="flex items-center space-x-2">
                          <span>📐</span>
                          <span>1:100 (Standard - Recommended)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="1:200">
                        <div className="flex items-center space-x-2">
                          <span>📊</span>
                          <span>1:200 (Medium scale)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="1:500">
                        <div className="flex items-center space-x-2">
                          <span>🗺️</span>
                          <span>1:500 (Small scale - Overview)</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Detection Accuracy Setting */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 text-sm">🎯</span>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-gray-900">
                        Detection Mode
                      </Label>
                      <p className="text-xs text-gray-600">
                        AI detection accuracy level
                      </p>
                    </div>
                  </div>
                  <Select
                    value={
                      fileSettings[fileData.id]?.detectionAccuracy || "auto"
                    }
                    onValueChange={(value: "auto" | "manual") =>
                      updateFileSetting(fileData.id, "detectionAccuracy", value)
                    }
                  >
                    <SelectTrigger className="w-full bg-white border-gray-200 focus:ring-2 focus:ring-green-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">
                        <div className="flex items-center space-x-2">
                          <span>🤖</span>
                          <span>Auto Detection (Recommended)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="manual">
                        <div className="flex items-center space-x-2">
                          <span>👁️</span>
                          <span>Manual Review (Advanced)</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Enhanced Info Panel */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">ℹ️</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-blue-900 mb-1">
                      Smart Analysis Ready
                    </h4>
                    <p className="text-sm text-blue-700">
                      Our AI will automatically detect rooms, doors, windows,
                      and structural elements.
                      {fileSettings[fileData.id]?.detectionAccuracy === "manual"
                        ? " You'll have the opportunity to review and adjust all detections manually."
                        : " The system will optimize detection accuracy automatically for best results."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Analysis Summary Dashboard */}
        <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                📊 Analysis Dashboard
              </h3>
              <p className="text-gray-600">
                Comprehensive overview of your upload session
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">All systems ready</span>
            </div>
          </div>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Files Uploaded
                  </p>
                  <p className="text-3xl font-bold text-purple-600 mt-1">
                    {uploadedFiles.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: "100%" }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Complete</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Ready for Analysis
                  </p>
                  <p className="text-3xl font-bold text-green-600 mt-1">
                    {
                      uploadedFiles.filter((f) => f.status === "completed")
                        .length
                    }
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{
                      width: `${(uploadedFiles.filter((f) => f.status === "completed").length / uploadedFiles.length) * 100}%`,
                    }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {Math.round(
                    (uploadedFiles.filter((f) => f.status === "completed")
                      .length /
                      uploadedFiles.length) *
                      100,
                  )}
                  % ready
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Size
                  </p>
                  <p className="text-3xl font-bold text-blue-600 mt-1">
                    {(
                      uploadedFiles.reduce(
                        (total, f) => total + f.file.size,
                        0,
                      ) /
                      1024 /
                      1024
                    ).toFixed(1)}
                  </p>
                  <p className="text-xs text-gray-500">MB</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-lg">💾</span>
                </div>
              </div>
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Optimized</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Estimated Time
                  </p>
                  <p className="text-3xl font-bold text-orange-600 mt-1">
                    {Math.max(2, uploadedFiles.length * 1.5).toFixed(0)}
                  </p>
                  <p className="text-xs text-gray-500">minutes</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-orange-600 text-lg">⏱️</span>
                </div>
              </div>
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-600 h-2 rounded-full"
                    style={{ width: "90%" }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Fast processing</p>
              </div>
            </div>
          </div>

          {/* Final Action Panel */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">🚀</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    Ready for Vastu Analysis!
                  </h4>
                  <p className="text-gray-600">
                    Your files are configured and ready. Click "Start Analysis"
                    to begin comprehensive Vastu evaluation.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Analysis Quality</p>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-yellow-400 text-sm">
                        ⭐
                      </span>
                    ))}
                    <span className="text-sm text-gray-600 ml-1">
                      Excellent
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Main Render
  return (
    <div className="min-h-screen bg-gray-50">
      {renderHeader()}

      {currentStage === 1 && renderStage1()}
      {currentStage === 2 && renderStage2()}
      {currentStage === 3 && renderStage3()}

      {/* Sticky Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={prevStage}
              disabled={currentStage === 1}
              className="px-8 py-3 font-medium"
            >
              Previous
            </Button>

            <Button
              onClick={
                currentStage === 3
                  ? () => {
                      // Navigate to report page with analysis data
                      navigate("/report", {
                        state: {
                          propertyName: "Sunset Villa", // This would come from form data
                          address:
                            selectedLocation?.address || "Selected Location",
                          location: selectedLocation,
                          files: uploadedFiles.map((f) => ({
                            file: f.file,
                            id: f.id,
                            scale: fileSettings[f.id]?.scale || "1:100",
                            detectionAccuracy:
                              fileSettings[f.id]?.detectionAccuracy || "auto",
                            ocrText: f.ocrText,
                            detectedRooms: f.detectedRooms,
                            verified: f.verified,
                          })),
                        },
                      });
                    }
                  : nextStage
              }
              disabled={
                (currentStage === 1 && !selectedLocation) ||
                (currentStage === 2 &&
                  (uploadedFiles.length === 0 ||
                    uploadedFiles.some((f) => f.status !== "verified") ||
                    uploadedFiles.length < 4 ||
                    currentVerificationIndex >= 0))
              }
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 font-medium"
            >
              {currentStage === 3
                ? "Start Analysis"
                : currentStage === 2 && currentVerificationIndex >= 0
                  ? "Verification in Progress..."
                  : "Continue"}
            </Button>
          </div>
        </div>
      </div>

      {/* Add bottom padding to prevent content from being hidden behind sticky footer */}
      <div className="h-20"></div>

      {/* Full-Screen Analysis Modal */}
      {showAnalysisModal && analysisResults && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full h-full max-w-7xl max-h-[95vh] rounded-lg shadow-2xl overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 sm:px-6 py-4 flex items-center justify-between shadow-lg">
              <div className="flex-1 min-w-0">
                <h2 className="text-xl sm:text-2xl font-bold truncate">
                  {analysisResults?.isEditing
                    ? "✏️ Edit Analysis Results"
                    : "🤖 AI Analysis in Progress"}
                </h2>
                <p className="text-purple-100 mt-1 text-sm sm:text-base">
                  {analysisResults?.isEditing
                    ? "Review and modify the detected analysis results"
                    : "Analyzing floor plan with advanced AI technology"}
                </p>
              </div>
              <button
                onClick={closeAnalysisModal}
                className="text-white hover:text-purple-200 hover:bg-purple-500 rounded-full p-2 transition-colors duration-200 ml-4 flex-shrink-0"
                title="Close modal"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 min-h-full">
                {/* Left Side - Image Display */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 text-sm">🏠</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Floor Plan Analysis
                    </h3>
                  </div>

                  {/* Image Display */}
                  <div className="bg-gray-50 rounded-lg h-80 md:h-96 flex items-center justify-center relative border-2 border-dashed border-gray-300">
                    {uploadedFiles.find(
                      (f) => f.id === analysisResults.fileId,
                    ) ? (
                      <img
                        src={URL.createObjectURL(
                          uploadedFiles.find(
                            (f) => f.id === analysisResults.fileId,
                          )!.file,
                        )}
                        alt="Floor plan"
                        className="max-w-full max-h-full rounded object-contain shadow-lg"
                      />
                    ) : (
                      <div className="text-center text-gray-500">
                        <div className="text-6xl mb-4">📄</div>
                        <p className="text-lg font-medium">Floor Plan Image</p>
                        <p className="text-sm">Image not available</p>
                      </div>
                    )}

                    {/* Analysis Overlay - Only show when not editing */}
                    {!analysisResults?.isEditing && (
                      <div className="absolute inset-0 bg-blue-500 bg-opacity-10 rounded flex items-center justify-center">
                        <div className="text-center bg-white bg-opacity-90 rounded-lg p-4 shadow-lg">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-3"></div>
                          <p className="text-blue-700 font-medium text-sm">
                            {analysisResults.verified
                              ? "✅ Analysis Complete!"
                              : "🔍 Analyzing..."}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Analysis Progress */}
                  <div
                    className={`border rounded-lg p-4 ${
                      analysisResults?.isEditing
                        ? "bg-orange-50 border-orange-200"
                        : analysisResults?.verified
                          ? "bg-green-50 border-green-200"
                          : "bg-blue-50 border-blue-200"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          analysisResults?.isEditing
                            ? "bg-orange-500 animate-pulse"
                            : analysisResults?.verified
                              ? "bg-green-500"
                              : "bg-blue-500 animate-pulse"
                        }`}
                      ></div>
                      <div className="flex-1">
                        <p
                          className={`text-sm font-medium ${
                            analysisResults?.isEditing
                              ? "text-orange-900"
                              : analysisResults?.verified
                                ? "text-green-900"
                                : "text-blue-900"
                          }`}
                        >
                          {analysisResults?.isEditing
                            ? "✏️ Editing Analysis Results"
                            : analysisResults?.verified
                              ? "✅ Analysis Complete - Ready for verification"
                              : "🔍 Scanning floor plan for structural elements..."}
                        </p>
                        <div
                          className={`w-full rounded-full h-2 mt-2 ${
                            analysisResults?.isEditing
                              ? "bg-orange-200"
                              : analysisResults?.verified
                                ? "bg-green-200"
                                : "bg-blue-200"
                          }`}
                        >
                          <div
                            className={`h-2 rounded-full transition-all duration-1000 ${
                              analysisResults?.isEditing
                                ? "bg-orange-500"
                                : analysisResults?.verified
                                  ? "bg-green-500"
                                  : "bg-blue-500"
                            }`}
                            style={{
                              width: analysisResults?.isEditing
                                ? "50%"
                                : analysisResults?.verified
                                  ? "100%"
                                  : "75%",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Analysis Results */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 text-sm">📊</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Analysis Results
                    </h3>
                  </div>

                  {/* OCR Text */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-700">
                        📝 OCR Text Detected:
                      </h4>
                      {analysisResults?.isEditing && (
                        <button
                          onClick={() => {
                            const textarea =
                              document.getElementById("ocr-textarea");
                            if (textarea) textarea.focus();
                          }}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          ✏️ Edit
                        </button>
                      )}
                    </div>
                    {analysisResults?.isEditing ? (
                      <textarea
                        id="ocr-textarea"
                        className="text-sm text-gray-700 bg-white p-3 rounded-lg border border-gray-300 w-full resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        rows={4}
                        placeholder="Enter OCR text..."
                        value={analysisResults.ocrText}
                        onChange={(e) =>
                          setAnalysisResults((prev) =>
                            prev ? { ...prev, ocrText: e.target.value } : null,
                          )
                        }
                      />
                    ) : (
                      <p className="text-sm text-gray-600 bg-white p-3 rounded border">
                        {analysisResults.ocrText}
                      </p>
                    )}
                  </div>

                  {/* Detected Rooms */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-gray-700">
                        🏠 Detected Rooms:
                      </h4>
                      {analysisResults?.isEditing && (
                        <button
                          onClick={() => {
                            const newRoom = {
                              id: `room-${Date.now()}`,
                              name: "New Room",
                              x: 100,
                              y: 100,
                              width: 150,
                              height: 120,
                            };
                            setAnalysisResults((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    detectedRooms: [
                                      ...prev.detectedRooms,
                                      newRoom,
                                    ],
                                  }
                                : null,
                            );
                          }}
                          className="text-xs text-green-600 hover:text-green-800 bg-green-50 hover:bg-green-100 px-3 py-2 rounded-lg font-medium transition-colors duration-200 border border-green-200"
                        >
                          ➕ Add Room
                        </button>
                      )}
                    </div>
                    <div className="space-y-2">
                      {analysisResults.detectedRooms.map((room, index) => (
                        <div
                          key={room.id}
                          className="flex items-center justify-between bg-white p-3 rounded border"
                        >
                          <div className="flex items-center space-x-3 flex-1">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                              <span className="text-purple-600 text-sm font-bold">
                                {index + 1}
                              </span>
                            </div>
                            <div className="flex-1">
                              {analysisResults?.isEditing ? (
                                <div className="space-y-2">
                                  <input
                                    type="text"
                                    className="text-sm font-medium text-gray-900 bg-white px-3 py-2 rounded-lg border border-gray-300 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Room name"
                                    value={room.name}
                                    onChange={(e) => {
                                      const newRooms = [
                                        ...analysisResults.detectedRooms,
                                      ];
                                      newRooms[index] = {
                                        ...newRooms[index],
                                        name: e.target.value,
                                      };
                                      setAnalysisResults((prev) =>
                                        prev
                                          ? { ...prev, detectedRooms: newRooms }
                                          : null,
                                      );
                                    }}
                                  />
                                  <div className="flex items-center space-x-3">
                                    <div className="flex items-center space-x-2">
                                      <input
                                        type="number"
                                        placeholder="Width"
                                        className="text-sm text-gray-700 bg-white px-3 py-2 rounded-lg border border-gray-300 w-20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        min="0"
                                        value={room.width}
                                        onChange={(e) => {
                                          const newRooms = [
                                            ...analysisResults.detectedRooms,
                                          ];
                                          newRooms[index] = {
                                            ...newRooms[index],
                                            width:
                                              parseInt(e.target.value) || 0,
                                          };
                                          setAnalysisResults((prev) =>
                                            prev
                                              ? {
                                                  ...prev,
                                                  detectedRooms: newRooms,
                                                }
                                              : null,
                                          );
                                        }}
                                      />
                                      <span className="text-gray-500 font-medium">
                                        ×
                                      </span>
                                      <input
                                        type="number"
                                        placeholder="Height"
                                        className="text-sm text-gray-700 bg-white px-3 py-2 rounded-lg border border-gray-300 w-20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        min="0"
                                        value={room.height}
                                        onChange={(e) => {
                                          const newRooms = [
                                            ...analysisResults.detectedRooms,
                                          ];
                                          newRooms[index] = {
                                            ...newRooms[index],
                                            height:
                                              parseInt(e.target.value) || 0,
                                          };
                                          setAnalysisResults((prev) =>
                                            prev
                                              ? {
                                                  ...prev,
                                                  detectedRooms: newRooms,
                                                }
                                              : null,
                                          );
                                        }}
                                      />
                                    </div>
                                    <span className="text-sm text-gray-500 font-medium">
                                      units
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    {room.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {room.width}×{room.height} units
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {analysisResults?.isEditing && (
                              <button
                                onClick={() => {
                                  const newRooms =
                                    analysisResults.detectedRooms.filter(
                                      (_, i) => i !== index,
                                    );
                                  setAnalysisResults((prev) =>
                                    prev
                                      ? { ...prev, detectedRooms: newRooms }
                                      : null,
                                  );
                                }}
                                className="text-red-500 hover:text-red-700 text-sm"
                              >
                                🗑️
                              </button>
                            )}
                            <div className="text-green-600">
                              <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Verification Status */}
                  <div
                    className={`border rounded-lg p-4 ${
                      analysisResults.verified
                        ? "bg-green-50 border-green-200"
                        : "bg-yellow-50 border-yellow-200"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          analysisResults.verified
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                      ></div>
                      <div>
                        <p
                          className={`text-sm font-medium ${
                            analysisResults.verified
                              ? "text-green-900"
                              : "text-yellow-900"
                          }`}
                        >
                          {analysisResults.verified
                            ? "✅ Verification Complete"
                            : "⏳ Awaiting Verification"}
                        </p>
                        <p
                          className={`text-xs mt-1 ${
                            analysisResults.verified
                              ? "text-green-700"
                              : "text-yellow-700"
                          }`}
                        >
                          {analysisResults.verified
                            ? "Analysis results have been verified and saved."
                            : "Please review the analysis results and verify."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                    {analysisResults?.isEditing ? (
                      <>
                        <button
                          onClick={() => {
                            // Save changes and mark as verified
                            setUploadedFiles((prev) =>
                              prev.map((f) =>
                                f.id === analysisResults.fileId
                                  ? {
                                      ...f,
                                      ocrText: analysisResults.ocrText,
                                      detectedRooms:
                                        analysisResults.detectedRooms,
                                      status: "verified" as const,
                                      verified: true,
                                    }
                                  : f,
                              ),
                            );
                            setTimeout(() => {
                              setShowAnalysisModal(false);
                              setAnalysisResults(null);
                            }, 1000);
                          }}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                          💾 Save Changes
                        </button>
                        <button
                          onClick={closeAnalysisModal}
                          className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                          ❌ Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        {!analysisResults.verified && (
                          <button
                            onClick={() => verifyImage(analysisResults.fileId)}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                          >
                            ✅ Verify & Continue
                          </button>
                        )}
                        <button
                          onClick={closeAnalysisModal}
                          className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                          {analysisResults.verified
                            ? "➡️ Continue"
                            : "❌ Close"}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
