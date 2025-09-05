import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Home,
  FileText,
  Map,
  BarChart3,
  HelpCircle,
  User,
  Users,
  LogOut,
  Plus,
  Play,
  Clock,
  TrendingUp,
  Upload,
  Search,
  Settings,
  Zap,
  Filter,
  Calendar,
  X,
  ChevronDown,
  CreditCard,
  History,
  ArrowUpDown,
  Download,
  CheckCircle,
  MapPin,
  Navigation,
} from "lucide-react";

// Import dashboard components (we'll create these next)
import VastuReport from "@/components/dashboard/VastuReport";
import EnergyMap from "@/components/dashboard/EnergyMap";
import Support from "@/components/dashboard/Support";
import UserProfile from "@/components/dashboard/UserProfile";
import UserManagement from "@/components/dashboard/UserManagement";
import GoogleStyleUpload from "@/components/dashboard/GoogleStyleUpload";
import Vaastu360Upload from "@/components/dashboard/Vaastu360Upload";

type DashboardSection =
  | "overview"
  | "new-analysis"
  | "google-upload"
  | "floor-plans"
  | "vastu-report"
  | "energy-map"
  | "support"
  | "profile"
  | "user-management"
  | "subscription-history"
  | "subscription-upgrade";

const menuItems = [
  { id: "overview" as const, label: "Dashboard Overview", icon: Home },
  { id: "new-analysis" as const, label: "New Analysis", icon: Plus },
  { id: "google-upload" as const, label: "Google Style Upload", icon: Upload },
  { id: "floor-plans" as const, label: "Floor Plans", icon: FileText },
  { id: "vastu-report" as const, label: "Vastu Compliance", icon: FileText },
  { id: "energy-map" as const, label: "Energy Flow Map", icon: Map },
  { id: "support" as const, label: "Support", icon: HelpCircle },
  { id: "profile" as const, label: "Profile", icon: User },
  { id: "user-management" as const, label: "User Management", icon: Users },
  {
    id: "subscription-history" as const,
    label: "Subscription History",
    icon: History,
  },
  {
    id: "subscription-upgrade" as const,
    label: "Upgrade Plan",
    icon: ArrowUpDown,
  },
];

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

export default function Dashboard() {
  const [activeSection, setActiveSection] =
    useState<DashboardSection>("overview");

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <DashboardOverview setActiveSection={setActiveSection} />;
      case "new-analysis":
        return <Vaastu360Upload />;
      case "google-upload":
        return <GoogleStyleUpload />;
      case "floor-plans":
        return <Vaastu360Upload />;
      case "vastu-report":
        return <VastuReport />;
      case "energy-map":
        return <EnergyMap />;
      case "support":
        return <Support />;
      case "profile":
        return <UserProfile />;
      case "user-management":
        return <UserManagement />;
      case "subscription-history":
        return <SubscriptionHistory />;
      case "subscription-upgrade":
        return <SubscriptionUpgrade />;
      default:
        return <DashboardOverview setActiveSection={setActiveSection} />;
    }
  };

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <Home className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Vastu Dashboard</span>
              <span className="truncate text-xs">Property Analysis</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveSection(item.id)}
                      isActive={activeSection === item.id}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span>John Doe</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <LogOut />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-sidebar-border" />
            <h1 className="text-lg font-semibold">
              {menuItems.find((item) => item.id === activeSection)?.label ||
                "Dashboard"}
            </h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {renderContent()}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

// Dashboard Overview Component
function DashboardOverview({
  setActiveSection,
}: {
  setActiveSection: (section: DashboardSection) => void;
}) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [typeFilter, setTypeFilter] = React.useState<string>("all");
  const [dateFilter, setDateFilter] = React.useState<string>("all");

  const allAnalyses = [
    {
      id: "1",
      propertyName: "Sunset Villa",
      type: "Floor Plan Analysis",
      status: "completed",
      date: "2024-09-01",
      score: 85,
    },
    {
      id: "2",
      propertyName: "Riverside Apartments",
      type: "Energy Flow Analysis",
      status: "in-progress",
      date: "2024-08-30",
      score: null,
    },
    {
      id: "3",
      propertyName: "Green Valley Complex",
      type: "Vastu Compliance",
      status: "completed",
      date: "2024-08-28",
      score: 72,
    },
    {
      id: "4",
      propertyName: "Ocean View Resort",
      type: "Floor Plan Analysis",
      status: "completed",
      date: "2024-08-25",
      score: 91,
    },
    {
      id: "5",
      propertyName: "Mountain Retreat",
      type: "Energy Flow Analysis",
      status: "pending",
      date: "2024-08-20",
      score: null,
    },
    {
      id: "6",
      propertyName: "Urban Heights",
      type: "Vastu Compliance",
      status: "in-progress",
      date: "2024-08-18",
      score: 68,
    },
    // Add the new completed analysis
    {
      id: "7",
      propertyName: "Sunset Villa",
      type: "Comprehensive Vastu Analysis",
      status: "completed",
      date: new Date().toISOString().split("T")[0],
      score: 78,
    },
  ];

  // Filter analyses based on search and filters
  const filteredAnalyses = allAnalyses.filter((analysis) => {
    const matchesSearch =
      analysis.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      analysis.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || analysis.status === statusFilter;
    const matchesType = typeFilter === "all" || analysis.type === typeFilter;

    let matchesDate = true;
    if (dateFilter !== "all") {
      const analysisDate = new Date(analysis.date);
      const now = new Date();
      const daysDiff = Math.floor(
        (now.getTime() - analysisDate.getTime()) / (1000 * 3600 * 24),
      );

      switch (dateFilter) {
        case "today":
          matchesDate = daysDiff === 0;
          break;
        case "week":
          matchesDate = daysDiff <= 7;
          break;
        case "month":
          matchesDate = daysDiff <= 30;
          break;
      }
    }

    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setTypeFilter("all");
    setDateFilter("all");
  };

  const quickActions = [
    {
      title: "New Analysis",
      description: "Start a new property analysis",
      icon: Plus,
      action: () => setActiveSection("new-analysis"),
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      title: "Upload Floor Plan",
      description: "Upload and analyze floor plans",
      icon: Upload,
      action: () => setActiveSection("floor-plans"),
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      title: "View Reports",
      description: "Check your analysis reports",
      icon: FileText,
      action: () => setActiveSection("vastu-report"),
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      title: "Energy Analysis",
      description: "Analyze energy flow patterns",
      icon: Zap,
      action: () => setActiveSection("energy-map"),
      color: "bg-orange-500 hover:bg-orange-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg p-6 border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Welcome back, John! 👋
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Here's what's happening with your Vastu analysis today.
            </p>
          </div>
          <div className="flex space-x-3">
            <Button
              onClick={() => setActiveSection("new-analysis")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Analysis
            </Button>
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 sm:p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-xs sm:text-sm font-medium">
              Total Properties
            </h3>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-xl sm:text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
            +2 from last month
          </p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 sm:p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-xs sm:text-sm font-medium">
              Vastu Compliant
            </h3>
            <Map className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-xl sm:text-2xl font-bold">8</div>
          <p className="text-xs text-muted-foreground">66.7% compliance rate</p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 sm:p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-xs sm:text-sm font-medium">
              Active Users
            </h3>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-xl sm:text-2xl font-bold">24</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
            +4 from last week
          </p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 sm:p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-xs sm:text-sm font-medium">
              Reports Generated
            </h3>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-xl sm:text-2xl font-bold">156</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
            +12 from yesterday
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Quick Actions</h3>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action, index) => (
            <div
              key={index}
              onClick={action.action}
              className={`${action.color} text-white rounded-lg p-4 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg`}
            >
              <div className="flex items-center space-x-3">
                <action.icon className="h-6 w-6 flex-shrink-0" />
                <div className="min-w-0">
                  <h4 className="font-medium text-sm sm:text-base">
                    {action.title}
                  </h4>
                  <p className="text-xs sm:text-sm opacity-90">
                    {action.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Analysis */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            Recent Analysis ({filteredAnalyses.length})
          </h3>
          <Button variant="outline" size="sm">
            <Search className="mr-2 h-4 w-4" />
            View All
          </Button>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border shadow-sm">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search analyses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Floor Plan Analysis">Floor Plan</SelectItem>
                <SelectItem value="Energy Flow Analysis">
                  Energy Flow
                </SelectItem>
                <SelectItem value="Vastu Compliance">
                  Vastu Compliance
                </SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={clearFilters}
              className="flex items-center"
            >
              <X className="mr-2 h-4 w-4" />
              Clear
            </Button>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAnalyses.map((analysis) => (
            <div key={analysis.id} className="rounded-lg border bg-card p-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2">
                <div className="min-w-0">
                  <h4 className="font-medium text-sm sm:text-base truncate">
                    {analysis.propertyName}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {analysis.type}
                  </p>
                </div>
                <div
                  className={`px-2 py-1 rounded-full text-xs font-medium self-start ${
                    analysis.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {analysis.status === "completed"
                    ? "Completed"
                    : "In Progress"}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm gap-2">
                <span className="text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                  <span className="truncate">{analysis.date}</span>
                </span>
                {analysis.score && (
                  <span className="font-medium text-green-600">
                    {analysis.score}% Score
                  </span>
                )}
              </div>
              <div className="mt-3 flex flex-col sm:flex-row gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setActiveSection("vastu-report")}
                  className="flex-1 sm:flex-none"
                >
                  View Report
                </Button>
                {analysis.status === "in-progress" && (
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 flex-1 sm:flex-none"
                  >
                    <Play className="mr-1 h-3 w-3" />
                    Continue
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// New Analysis Component - Vaastu 360 Complete 3-Stage Upload Flow
function NewAnalysis() {
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
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg font-medium"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload Files
            </Button>
            <Button
              onClick={handleCameraUpload}
              variant="outline"
              className="border-purple-200 text-purple-600 hover:bg-purple-50 px-8 py-3 text-lg font-medium"
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
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2"
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

// Subscription History Component
function SubscriptionHistory() {
  const subscriptionHistory = [
    {
      id: "1",
      plan: "Premium Plan",
      status: "Active",
      startDate: "2024-01-15",
      endDate: "2024-12-15",
      amount: "$29.99",
      paymentMethod: "Credit Card ****1234",
      autoRenew: true,
    },
    {
      id: "2",
      plan: "Basic Plan",
      status: "Expired",
      startDate: "2023-01-15",
      endDate: "2024-01-15",
      amount: "$19.99",
      paymentMethod: "PayPal",
      autoRenew: false,
    },
    {
      id: "3",
      plan: "Free Trial",
      status: "Expired",
      startDate: "2022-12-01",
      endDate: "2023-01-01",
      amount: "$0.00",
      paymentMethod: "N/A",
      autoRenew: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Subscription History
          </h2>
          <p className="text-muted-foreground">
            View your subscription history and billing information
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download Invoice
        </Button>
      </div>

      <div className="grid gap-4">
        {subscriptionHistory.map((subscription) => (
          <Card key={subscription.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{subscription.plan}</CardTitle>
                  <CardDescription>
                    {subscription.startDate} - {subscription.endDate}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      subscription.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {subscription.status}
                  </div>
                  <div className="text-lg font-semibold mt-1">
                    {subscription.amount}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-sm font-medium">Payment Method</Label>
                  <p className="text-sm text-muted-foreground">
                    {subscription.paymentMethod}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Auto Renewal</Label>
                  <p className="text-sm text-muted-foreground">
                    {subscription.autoRenew ? "Enabled" : "Disabled"}
                  </p>
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" size="sm">
                  View Invoice
                </Button>
                {subscription.status === "Active" && (
                  <Button variant="outline" size="sm">
                    Cancel Subscription
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Current Subscription Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Current Subscription</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <Label className="text-sm font-medium">Current Plan</Label>
              <p className="text-lg font-semibold">Premium Plan</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Next Billing Date</Label>
              <p className="text-lg font-semibold">Dec 15, 2024</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Monthly Cost</Label>
              <p className="text-lg font-semibold">$29.99</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
// Subscription Upgrade Component
function SubscriptionUpgrade() {
  const currentPlan = {
    name: "Premium Plan",
    price: 29.99,
    features: [
      "Unlimited property analyses",
      "Advanced Vastu reports",
      "Energy flow mapping",
      "Priority support",
      "API access",
    ],
  };

  const availablePlans = [
    {
      id: "basic",
      name: "Basic Plan",
      price: 19.99,
      period: "month",
      features: [
        "Up to 10 property analyses",
        "Basic Vastu reports",
        "Standard support",
        "Email notifications",
      ],
      popular: false,
      current: false,
    },
    {
      id: "premium",
      name: "Premium Plan",
      price: 29.99,
      period: "month",
      features: [
        "Unlimited property analyses",
        "Advanced Vastu reports",
        "Energy flow mapping",
        "Priority support",
        "API access",
      ],
      popular: true,
      current: true,
    },
    {
      id: "enterprise",
      name: "Enterprise Plan",
      price: 49.99,
      period: "month",
      features: [
        "Everything in Premium",
        "White-label reports",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced analytics",
        "Phone support",
      ],
      popular: false,
      current: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Upgrade Your Plan
          </h2>
          <p className="text-muted-foreground">
            Choose the perfect plan for your Vastu analysis needs
          </p>
        </div>
      </div>

      {/* Current Plan */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">
                Current Plan: {currentPlan.name}
              </CardTitle>
              <CardDescription>${currentPlan.price}/month</CardDescription>
            </div>
            <Badge className="bg-blue-100 text-blue-800">Active</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {currentPlan.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <div className="grid gap-6 md:grid-cols-3">
        {availablePlans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative ${plan.popular ? "border-blue-500 shadow-lg" : ""} ${plan.current ? "border-green-500" : ""}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-500 text-white">Most Popular</Badge>
              </div>
            )}
            {plan.current && (
              <div className="absolute -top-3 right-4">
                <Badge className="bg-green-500 text-white">Current</Badge>
              </div>
            )}
            <CardHeader className="text-center">
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <div className="text-3xl font-bold">
                ${plan.price}
                <span className="text-sm font-normal text-muted-foreground">
                  /{plan.period}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full mt-6 ${plan.current ? "bg-gray-100 text-gray-500 hover:bg-gray-100" : "bg-blue-600 hover:bg-blue-700"}`}
                disabled={plan.current}
              >
                {plan.current ? "Current Plan" : "Upgrade Now"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Can I change plans anytime?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, you can upgrade or downgrade your plan at any time. Changes
              take effect immediately.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Is there a free trial?</h4>
            <p className="text-sm text-muted-foreground">
              We offer a 14-day free trial for all plans. No credit card
              required to start.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">
              What payment methods do you accept?
            </h4>
            <p className="text-sm text-muted-foreground">
              We accept all major credit cards, PayPal, and bank transfers for
              annual plans.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
