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

  // Stage 2: Upload Floor Plan
  const [uploadedFiles, setUploadedFiles] = React.useState<
    Array<{
      file: File;
      progress: number;
      status: "uploading" | "completed" | "error";
      speed: string;
      id: string;
    }>
  >([]);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

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
    if (!files) return;

    const newFiles = Array.from(files).map((file) => ({
      file,
      progress: 0,
      status: "uploading" as const,
      speed: "0 KB/sec",
      id: Date.now() + Math.random().toString(),
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);

    // Initialize settings for new files
    const newSettings: Record<
      string,
      { scale: string; detectionAccuracy: "auto" | "manual" }
    > = {};
    newFiles.forEach((fileData) => {
      newSettings[fileData.id] = { scale: "1:100", detectionAccuracy: "auto" };
    });
    setFileSettings((prev) => ({ ...prev, ...newSettings }));

    // Simulate upload progress
    newFiles.forEach((fileData) => {
      const interval = setInterval(() => {
        setUploadedFiles((prev) =>
          prev.map((f) => {
            if (f.id === fileData.id) {
              const newProgress = Math.min(
                f.progress + Math.random() * 15,
                100,
              );
              const newStatus = newProgress >= 100 ? "completed" : "uploading";
              return {
                ...f,
                progress: newProgress,
                status: newStatus,
                speed: `${Math.floor(Math.random() * 200) + 50} KB/sec`,
              };
            }
            return f;
          }),
        );
      }, 200);

      setTimeout(() => {
        clearInterval(interval);
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === fileData.id
              ? { ...f, progress: 100, status: "completed" as const }
              : f,
          ),
        );
      }, 3000);
    });
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
    handleFileUpload(e.dataTransfer.files);
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
              Upload Floor Plan
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Upload your property's floor plan for AI-powered room detection
              and comprehensive Vaastu analysis.
            </p>
            <p className="text-sm text-gray-500">
              Supports JPG, PNG, PDF files up to 10MB. Upload at least 4 images
              for detailed analysis.
            </p>
          </div>

          {/* Upload Options */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="secondary"
              className="text-white px-8 py-3 text-lg font-medium"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload Files
            </Button>
            <Button
              onClick={handleCameraUpload}
              variant="outline"
              className="px-8 py-3 text-lg font-medium border-secondary text-secondary hover:bg-secondary/10"
            >
              📷 Take Photo
            </Button>
          </div>

          {/* Drag & Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-xl p-16 text-center transition-all duration-200 ${
              isDragOver
                ? "border-purple-400 bg-purple-50 shadow-lg"
                : "border-gray-300 bg-white hover:border-purple-300 hover:shadow-md"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="space-y-4">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Upload className="w-10 h-10 text-purple-600" />
              </div>
              <div className="space-y-2">
                <p className="text-xl font-semibold text-gray-900">
                  Drag and drop your floor plan, or click below to browse
                </p>
                <p className="text-gray-600">
                  Upload at least 4 images for comprehensive analysis
                </p>
                <p className="text-sm text-gray-500">
                  Supports JPG, PNG, PDF files up to 10MB
                </p>
              </div>
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="secondary"
                className="text-white px-6 py-2"
              >
                Choose File
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,.pdf"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
              />
            </div>
          </div>

          {/* Validation Messages */}
          {uploadedFiles.length > 0 && uploadedFiles.length < 4 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">!</span>
                </div>
                <p className="text-sm text-yellow-800">
                  Please upload at least 4 files to continue with comprehensive
                  analysis.
                </p>
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
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
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
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            fileData.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : fileData.status === "error"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {fileData.status === "completed"
                            ? "Ready"
                            : fileData.status === "error"
                              ? "Error"
                              : "Uploading..."}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(fileData.id)}
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
                      AI will automatically detect rooms and their boundaries.
                      You can adjust these in the next step.
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
        {/* Title Section */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Review & Settings
          </h1>
          <p className="text-gray-600">
            Review your uploaded files and configure analysis settings before
            proceeding
          </p>
        </div>

        {/* Uploaded Files List */}
        <div className="grid gap-6">
          {uploadedFiles.map((fileData) => (
            <div
              key={fileData.id}
              className="bg-white border border-gray-200 rounded-lg p-6"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {fileData.file.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {(fileData.file.size / 1024 / 1024).toFixed(1)}MB •
                      Uploaded successfully
                    </p>
                    <Button
                      variant="link"
                      className="text-red-600 hover:text-red-700 p-0 h-auto mt-1"
                      onClick={() => removeFile(fileData.id)}
                    >
                      Remove file
                    </Button>
                  </div>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    fileData.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {fileData.status === "completed"
                    ? "Ready for Analysis"
                    : fileData.status}
                </div>
              </div>

              {/* Analysis Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Drawing Scale</Label>
                  <Select
                    value={fileSettings[fileData.id]?.scale || "1:100"}
                    onValueChange={(value) =>
                      updateFileSetting(fileData.id, "scale", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1:50">1:50 (Large scale)</SelectItem>
                      <SelectItem value="1:100">1:100 (Standard)</SelectItem>
                      <SelectItem value="1:200">
                        1:200 (Medium scale)
                      </SelectItem>
                      <SelectItem value="1:500">1:500 (Small scale)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    Detection Accuracy
                  </Label>
                  <Select
                    value={
                      fileSettings[fileData.id]?.detectionAccuracy || "auto"
                    }
                    onValueChange={(value: "auto" | "manual") =>
                      updateFileSetting(fileData.id, "detectionAccuracy", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto Detection</SelectItem>
                      <SelectItem value="manual">Manual Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Detection Accuracy Info */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-white text-xs">i</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">
                      Detection Accuracy
                    </h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Our AI will automatically detect rooms, doors, and windows
                      in your floor plan. You can choose to review and adjust
                      detections manually in the next step.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Analysis Summary */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Analysis Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {uploadedFiles.length}
              </div>
              <div className="text-sm text-gray-600">Files Uploaded</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {uploadedFiles.filter((f) => f.status === "completed").length}
              </div>
              <div className="text-sm text-gray-600">Ready for Analysis</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {(
                  uploadedFiles.reduce((total, f) => total + f.file.size, 0) /
                  1024 /
                  1024
                ).toFixed(1)}
                MB
              </div>
              <div className="text-sm text-gray-600">Total Size</div>
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
                    uploadedFiles.some((f) => f.status !== "completed") ||
                    uploadedFiles.length < 4))
              }
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 font-medium"
            >
              {currentStage === 3 ? "Start Analysis" : "Continue"}
            </Button>
          </div>
        </div>
      </div>

      {/* Add bottom padding to prevent content from being hidden behind sticky footer */}
      <div className="h-20"></div>
    </div>
  );
}
