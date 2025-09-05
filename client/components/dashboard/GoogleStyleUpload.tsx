import React, { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Upload,
  MapPin,
  Camera,
  FileText,
  CheckCircle,
  X,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Image as ImageIcon,
  Home,
  Building,
  Map,
  Search,
  Plus
} from "lucide-react";

// Simple Location Picker Component (Google Maps style)
function GoogleStyleLocationPicker({ onLocationSelect, initialLocation }: {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
  initialLocation?: { lat: number; lng: number };
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation || { lat: 40.7128, lng: -74.0060 });

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const newLocation = { lat: parseFloat(lat), lng: parseFloat(lon) };
        setSelectedLocation(newLocation);
        onLocationSelect({
          lat: parseFloat(lat),
          lng: parseFloat(lon),
          address: display_name
        });
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          placeholder="Search for a location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="pl-10 pr-12 h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          disabled={isSearching}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <Button
            onClick={handleSearch}
            variant="ghost"
            size="sm"
            disabled={isSearching || !searchQuery.trim()}
            className="h-8 w-8 p-0"
          >
            {isSearching ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowRight className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Map className="h-8 w-8 text-gray-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Select Property Location</h3>
            <p className="text-sm text-gray-600 mb-4">
              Search above or click on the map to set the property location
            </p>
            <div className="text-xs text-gray-500">
              Coordinates: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
            </div>
          </div>
        </div>

        {/* Current Location Indicator */}
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-red-500" />
            <span className="text-sm font-medium">Current Location</span>
          </div>
        </div>
      </div>

      {/* Location Details */}
      {selectedLocation && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-900">Location Selected</h4>
              <p className="text-sm text-blue-700 mt-1">
                Lat: {selectedLocation.lat.toFixed(6)}, Lng: {selectedLocation.lng.toFixed(6)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function GoogleStyleUpload() {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadData, setUploadData] = useState({
    propertyName: "",
    propertyType: "",
    address: "",
    location: { lat: 40.7128, lng: -74.0060, address: "" },
    files: [] as File[],
    description: "",
    priority: "normal"
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadData(prev => ({
      ...prev,
      files: [...prev.files, ...files]
    }));
  }, []);

  const removeFile = (index: number) => {
    setUploadData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const handleInputChange = (field: string, value: any) => {
    setUploadData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleUpload = async () => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Information</h2>
              <p className="text-gray-600">Tell us about the property you want to analyze</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="propertyName" className="text-sm font-medium text-gray-700">
                    Property Name
                  </Label>
                  <Input
                    id="propertyName"
                    placeholder="e.g., Sunset Villa"
                    value={uploadData.propertyName}
                    onChange={(e) => handleInputChange('propertyName', e.target.value)}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="propertyType" className="text-sm font-medium text-gray-700">
                    Property Type
                  </Label>
                  <Select value={uploadData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">🏠 Residential</SelectItem>
                      <SelectItem value="commercial">🏢 Commercial</SelectItem>
                      <SelectItem value="industrial">🏭 Industrial</SelectItem>
                      <SelectItem value="mixed-use">🏙️ Mixed Use</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority" className="text-sm font-medium text-gray-700">
                    Analysis Priority
                  </Label>
                  <Select value={uploadData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                    <SelectTrigger className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">🟢 Low Priority</SelectItem>
                      <SelectItem value="normal">🟡 Normal Priority</SelectItem>
                      <SelectItem value="high">🟠 High Priority</SelectItem>
                      <SelectItem value="urgent">🔴 Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Property Address
                  </Label>
                  <Input
                    placeholder="Enter complete address"
                    value={uploadData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Select Location on Map
                  </Label>
                  <GoogleStyleLocationPicker
                    onLocationSelect={(location) => {
                      setUploadData(prev => ({
                        ...prev,
                        location,
                        address: location.address
                      }));
                    }}
                    initialLocation={uploadData.location}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Floor Plans</h2>
              <p className="text-gray-600">Upload your property floor plans for Vastu analysis</p>
            </div>

            {/* Upload Area */}
            <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="h-10 w-10 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Drop your files here, or click to browse
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Supports JPG, PNG, PDF files up to 10MB each
                  </p>
                  <div className="flex justify-center space-x-4 text-sm text-gray-500">
                    <span>• Multiple files supported</span>
                    <span>• Max 10MB per file</span>
                    <span>• JPG, PNG, PDF formats</span>
                  </div>
                  <Input
                    type="file"
                    multiple
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <Label htmlFor="file-upload">
                    <Button variant="outline" className="mt-4">
                      <Plus className="mr-2 h-4 w-4" />
                      Choose Files
                    </Button>
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Uploaded Files */}
            {uploadData.files.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700">
                  Uploaded Files ({uploadData.files.length})
                </h4>
                <div className="space-y-2">
                  {uploadData.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                          {file.type.startsWith('image/') ? (
                            <ImageIcon className="h-5 w-5 text-gray-600" />
                          ) : (
                            <FileText className="h-5 w-5 text-gray-600" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{file.name}</p>
                          <p className="text-xs text-gray-600">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* File Requirements */}
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>File Requirements:</strong> Please ensure your floor plans are clear, high-resolution images or PDFs.
                Include all floors and clearly mark north direction for accurate Vastu analysis.
              </AlertDescription>
            </Alert>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Upload</h2>
              <p className="text-gray-600">Review your information before starting the analysis</p>
            </div>

            {/* Summary */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Property Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Property Name</Label>
                    <p className="text-sm text-gray-900">{uploadData.propertyName || 'Not specified'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Property Type</Label>
                    <p className="text-sm text-gray-900">{uploadData.propertyType || 'Not specified'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Address</Label>
                    <p className="text-sm text-gray-900">{uploadData.address || 'Not specified'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Priority</Label>
                    <Badge variant="outline" className="capitalize">
                      {uploadData.priority}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Upload Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Files Uploaded</Label>
                    <p className="text-sm text-gray-900">{uploadData.files.length} files</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Total Size</Label>
                    <p className="text-sm text-gray-900">
                      {(uploadData.files.reduce((total, file) => total + file.size, 0) / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Estimated Analysis Time</Label>
                    <p className="text-sm text-gray-900">
                      {uploadData.files.length <= 2 ? '5-10 minutes' : uploadData.files.length <= 5 ? '15-30 minutes' : '30-60 minutes'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Additional Notes (Optional)</CardTitle>
                <CardDescription>
                  Any specific requirements or questions for the analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="e.g., Please pay special attention to the master bedroom orientation..."
                  value={uploadData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </CardContent>
            </Card>

            {/* Upload Progress */}
            {isUploading && (
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Uploading files...</h4>
                      <span className="text-sm text-gray-600">{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                    <p className="text-xs text-gray-600">
                      Please wait while we process your files. This may take a few minutes.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Property for Analysis</h1>
          <p className="text-gray-600">Follow the steps below to upload your property details and floor plans</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[
              { step: 1, label: "Property Info", icon: Home },
              { step: 2, label: "Upload Files", icon: Upload },
              { step: 3, label: "Review & Upload", icon: CheckCircle }
            ].map((item, index) => (
              <div key={item.step} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= item.step
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > item.step ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <item.icon className="h-5 w-5" />
                  )}
                </div>
                <span className={`ml-3 text-sm font-medium ${
                  currentStep >= item.step ? 'text-blue-600' : 'text-gray-600'
                }`}>
                  {item.label}
                </span>
                {index < 2 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    currentStep > item.step ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="shadow-lg">
          <CardContent className="p-8">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <div className="flex space-x-3">
            {currentStep < 3 ? (
              <Button
                onClick={nextStep}
                disabled={
                  (currentStep === 1 && (!uploadData.propertyName || !uploadData.propertyType)) ||
                  (currentStep === 2 && uploadData.files.length === 0)
                }
                className="flex items-center"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleUpload}
                disabled={isUploading}
                className="bg-blue-600 hover:bg-blue-700 flex items-center"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Start Analysis
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}