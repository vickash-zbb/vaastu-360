import React, { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Upload,
  Camera,
  X,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  FileText,
  Image as ImageIcon,
  MapPin,
  Home,
  Search,
  Clock
} from "lucide-react";

interface UploadedFile {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  speed: string;
}

interface LocationData {
  lat: number;
  lng: number;
  address: string;
}

export default function Vaastu360Upload() {
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState<1 | 2 | 3>(1);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Stage 1: Property Address
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mapStyle, setMapStyle] = useState<'streets' | 'satellite' | 'terrain'>('streets');

  // Stage 3: Review & Settings
  const [fileSettings, setFileSettings] = useState<Record<string, {
    scale: string;
    detectionAccuracy: 'auto' | 'manual';
  }>>({});

  // Navigation functions
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

  // Stage 1 functions
  const handleLocationSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        setSelectedLocation({
          lat: parseFloat(lat),
          lng: parseFloat(lon),
          address: display_name
        });
      }
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleMapClick = () => {
    const newLat = (selectedLocation?.lat || 40.7128) + (Math.random() - 0.5) * 0.01;
    const newLng = (selectedLocation?.lng || -74.0060) + (Math.random() - 0.5) * 0.01;

    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${newLat}&lon=${newLng}`)
      .then(response => response.json())
      .then(data => {
        const address = data.display_name || `${newLat.toFixed(6)}, ${newLng.toFixed(6)}`;
        setSelectedLocation({ lat: newLat, lng: newLng, address });
      })
      .catch(() => {
        const address = `${newLat.toFixed(6)}, ${newLng.toFixed(6)}`;
        setSelectedLocation({ lat: newLat, lng: newLng, address });
      });
  };

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files) return;

    const newFiles: UploadedFile[] = Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      progress: 0,
      status: 'uploading' as const,
      speed: '0 KB/s'
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Initialize settings for new files
    const newSettings: Record<string, { scale: string; detectionAccuracy: 'auto' | 'manual' }> = {};
    newFiles.forEach(fileData => {
      newSettings[fileData.id] = { scale: '1:100', detectionAccuracy: 'auto' };
    });
    setFileSettings(prev => ({ ...prev, ...newSettings }));

    // Simulate upload progress
    newFiles.forEach(uploadedFile => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setUploadedFiles(prev =>
            prev.map(f =>
              f.id === uploadedFile.id
                ? { ...f, progress: 100, status: 'completed' as const, speed: '0 KB/s' }
                : f
            )
          );
        } else {
          setUploadedFiles(prev =>
            prev.map(f =>
              f.id === uploadedFile.id
                ? { ...f, progress, speed: `${Math.floor(Math.random() * 200) + 50} KB/s` }
                : f
            )
          );
        }
      }, 200);
    });
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
    setFileSettings(prev => {
      const newSettings = { ...prev };
      delete newSettings[fileId];
      return newSettings;
    });
  };

  // Stage 3 functions
  const updateFileSetting = (fileId: string, setting: 'scale' | 'detectionAccuracy', value: string) => {
    setFileSettings(prev => ({
      ...prev,
      [fileId]: {
        ...prev[fileId],
        [setting]: value
      }
    }));
  };

  const startAnalysis = () => {
    // Navigate to report page with analysis data
    navigate('/report', {
      state: {
        propertyName: 'Sunset Villa',
        address: selectedLocation?.address || 'Selected Location',
        location: selectedLocation,
        files: uploadedFiles.map(f => ({
          file: f.file,
          id: f.id,
          scale: fileSettings[f.id]?.scale || '1:100',
          detectionAccuracy: fileSettings[f.id]?.detectionAccuracy || 'auto'
        }))
      }
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) {
      return <ImageIcon className="h-4 w-4" />;
    }
    return <FileText className="h-4 w-4" />;
  };

  // Render functions for each stage
  const renderStage1 = () => (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Property Address</h1>
            <p className="text-gray-600">
              Select and confirm your property's location for accurate Vastu analysis
            </p>
          </div>

          {/* Search Box */}
          <div className="flex gap-2 max-w-md">
            <Input
              placeholder="Search for property address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLocationSearch()}
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
                <div className="text-xl font-medium text-gray-700 mb-2">Interactive Map</div>
                <div className="text-sm text-gray-500">
                  Lat: {selectedLocation?.lat.toFixed(4) || '40.7128'}, Lng: {selectedLocation?.lng.toFixed(4) || '-74.0060'}
                </div>
                <div className="text-xs text-gray-400 mt-2">Click to select location</div>
              </div>
            </div>

            {/* Map Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <div className="bg-white rounded-lg shadow-md p-1">
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant={mapStyle === 'streets' ? 'default' : 'ghost'}
                    onClick={() => setMapStyle('streets')}
                    className="text-xs"
                  >
                    Streets
                  </Button>
                  <Button
                    size="sm"
                    variant={mapStyle === 'satellite' ? 'default' : 'ghost'}
                    onClick={() => setMapStyle('satellite')}
                    className="text-xs"
                  >
                    Satellite
                  </Button>
                  <Button
                    size="sm"
                    variant={mapStyle === 'terrain' ? 'default' : 'ghost'}
                    onClick={() => setMapStyle('terrain')}
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
          <h3 className="text-lg font-semibold text-gray-900">Property Details</h3>

          {selectedLocation ? (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-start space-x-3 mb-4">
                <MapPin className="w-5 h-5 text-purple-600 mt-1" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">Selected Location</h4>
                  <p className="text-sm text-gray-600">{selectedLocation.address}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-gray-500">Latitude</Label>
                  <p className="text-sm font-medium">{selectedLocation.lat.toFixed(6)}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Longitude</Label>
                  <p className="text-sm font-medium">{selectedLocation.lng.toFixed(6)}</p>
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

  const renderStage2 = () => (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Upload Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title Section */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Floor Plan</h1>
            <p className="text-gray-600">
              Upload property's floor plan for AI-powered detection & Vastu analysis
            </p>
          </div>

          {/* Upload Options */}
          <div className="flex justify-center space-x-4">
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-3"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Files
            </Button>
            <Button variant="outline" className="px-6 py-3">
              <Camera className="mr-2 h-4 w-4" />
              Take Photo
            </Button>
          </div>

          {/* Drag & Drop Area */}
          <Card
            className={`border-2 border-dashed transition-colors ${
              isDragOver
                ? 'border-purple-400 bg-purple-50'
                : 'border-gray-300 hover:border-purple-300'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Drag and drop your floor plan
              </h3>
              <p className="text-gray-600 mb-4">
                Upload at least 4 images for comprehensive analysis
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Supports JPG, PNG, PDF files up to 10MB
              </p>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="border-purple-300 text-purple-600 hover:bg-purple-50"
              >
                Choose File
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,.pdf"
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
              />
            </CardContent>
          </Card>

          {/* File Thumbnails */}
          {uploadedFiles.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {uploadedFiles.map((uploadedFile) => (
                <div key={uploadedFile.id} className="relative group">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border">
                    {uploadedFile.file.type.startsWith('image/') ? (
                      <img
                        src={URL.createObjectURL(uploadedFile.file)}
                        alt={uploadedFile.file.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FileText className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity rounded-lg flex items-center justify-center">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeFile(uploadedFile.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-2 text-xs text-gray-600 truncate">
                    {uploadedFile.file.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upload Progress Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Upload Progress
              </h3>

              {uploadedFiles.length === 0 ? (
                <div className="text-center py-8">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No files uploaded yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {uploadedFiles.map((uploadedFile) => (
                    <div key={uploadedFile.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getFileIcon(uploadedFile.file.name)}
                          <span className="text-sm font-medium text-gray-900 truncate max-w-32">
                            {uploadedFile.file.name}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(uploadedFile.id)}
                          className="h-6 w-6 p-0 text-gray-400 hover:text-red-600"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>{formatFileSize(uploadedFile.file.size)}</span>
                          <span>{uploadedFile.speed}</span>
                        </div>
                        <Progress value={uploadedFile.progress} className="h-2" />
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">
                            {uploadedFile.progress.toFixed(0)}%
                          </span>
                          <Badge
                            variant={uploadedFile.status === 'completed' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {uploadedFile.status === 'completed' ? 'Completed' : 'Uploading'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upload Summary */}
          {uploadedFiles.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Upload Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Files:</span>
                    <span className="font-medium">{uploadedFiles.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Completed:</span>
                    <span className="font-medium text-green-600">
                      {uploadedFiles.filter(f => f.status === 'completed').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Size:</span>
                    <span className="font-medium">
                      {formatFileSize(uploadedFiles.reduce((total, f) => total + f.file.size, 0))}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );

  const renderStage3 = () => (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="space-y-8">
        {/* Title Section */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Review & Settings</h1>
          <p className="text-gray-600">
            Review your uploaded files and configure analysis settings before proceeding
          </p>
        </div>

        {/* Uploaded Files List */}
        <div className="grid gap-6">
          {uploadedFiles.map((fileData) => (
            <div key={fileData.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{fileData.file.name}</h3>
                    <p className="text-sm text-gray-600">
                      {(fileData.file.size / 1024 / 1024).toFixed(1)}MB • Uploaded successfully
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
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  fileData.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {fileData.status === 'completed' ? 'Ready for Analysis' : fileData.status}
                </div>
              </div>

              {/* Analysis Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Drawing Scale</Label>
                  <Select
                    value={fileSettings[fileData.id]?.scale || '1:100'}
                    onValueChange={(value) => updateFileSetting(fileData.id, 'scale', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1:50">1:50 (Large scale)</SelectItem>
                      <SelectItem value="1:100">1:100 (Standard)</SelectItem>
                      <SelectItem value="1:200">1:200 (Medium scale)</SelectItem>
                      <SelectItem value="1:500">1:500 (Small scale)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">Detection Accuracy</Label>
                  <Select
                    value={fileSettings[fileData.id]?.detectionAccuracy || 'auto'}
                    onValueChange={(value: 'auto' | 'manual') => updateFileSetting(fileData.id, 'detectionAccuracy', value)}
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
                    <h4 className="text-sm font-medium text-blue-900">Detection Accuracy</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Our AI will automatically detect rooms, doors, and windows in your floor plan.
                      You can choose to review and adjust detections manually in the next step.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Analysis Summary */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{uploadedFiles.length}</div>
              <div className="text-sm text-gray-600">Files Uploaded</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {uploadedFiles.filter(f => f.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-600">Ready for Analysis</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {formatFileSize(uploadedFiles.reduce((total, f) => total + f.file.size, 0))}
              </div>
              <div className="text-sm text-gray-600">Total Size</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <Home className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Vaastu 360</span>
          </div>

          {/* Progress Tracker */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStage >= 1 ? 'bg-green-500' : 'bg-gray-300'
              }`}>
                {currentStage > 1 ? (
                  <CheckCircle className="h-4 w-4 text-white" />
                ) : (
                  <span className="text-white font-medium text-sm">1</span>
                )}
              </div>
              <div className="text-sm">
                <div className={`font-medium ${currentStage >= 1 ? 'text-green-600' : 'text-gray-600'}`}>
                  Property Address
                </div>
                <div className="text-gray-500">
                  {currentStage === 1 ? 'In Progress' : currentStage > 1 ? 'Completed' : 'Pending'}
                </div>
              </div>
            </div>

            <div className={`w-12 h-0.5 ${
              currentStage >= 2 ? 'bg-green-500' : 'bg-gray-300'
            }`}></div>

            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStage === 2 ? 'bg-purple-600' :
                currentStage > 2 ? 'bg-green-500' : 'bg-gray-300'
              }`}>
                {currentStage > 2 ? (
                  <CheckCircle className="h-4 w-4 text-white" />
                ) : (
                  <span className="text-white font-medium text-sm">2</span>
                )}
              </div>
              <div className="text-sm">
                <div className={`font-medium ${
                  currentStage === 2 ? 'text-purple-600' :
                  currentStage > 2 ? 'text-green-600' : 'text-gray-600'
                }`}>
                  Upload Floor Plan
                </div>
                <div className="text-gray-500">
                  {currentStage === 2 ? 'In Progress' : currentStage > 2 ? 'Completed' : 'Pending'}
                </div>
              </div>
            </div>

            <div className={`w-12 h-0.5 ${
              currentStage >= 3 ? 'bg-green-500' : 'bg-gray-300'
            }`}></div>

            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStage === 3 ? 'bg-purple-600' : 'bg-gray-300'
              }`}>
                <span className="text-white font-medium text-sm">3</span>
              </div>
              <div className="text-sm">
                <div className={`font-medium ${currentStage === 3 ? 'text-purple-600' : 'text-gray-600'}`}>
                  Confirm Rooms
                </div>
                <div className="text-gray-500">
                  {currentStage === 3 ? 'In Progress' : 'Pending'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Dynamic Stage Content */}
      {currentStage === 1 && renderStage1()}
      {currentStage === 2 && renderStage2()}
      {currentStage === 3 && renderStage3()}

      {/* Navigation Controls */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between">
          <Button
            variant="outline"
            onClick={prevStage}
            disabled={currentStage === 1}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <Button
            onClick={currentStage === 3 ? startAnalysis : nextStage}
            disabled={
              (currentStage === 1 && !selectedLocation) ||
              (currentStage === 2 && (uploadedFiles.length === 0 || uploadedFiles.some(f => f.status !== 'completed')))
            }
            className="bg-purple-600 hover:bg-purple-700 flex items-center"
          >
            {currentStage === 3 ? 'Start Analysis' : 'Continue'}
            {currentStage !== 3 && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}