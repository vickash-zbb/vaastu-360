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

// Import dashboard components
import VastuReport from "@/components/dashboard/VastuReport";
import EnergyMap from "@/components/dashboard/EnergyMap";
import Support from "@/components/dashboard/Support";
import UserProfile from "@/components/dashboard/UserProfile";
import Vaastu360Upload from "@/components/dashboard/Vaastu360Upload";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import NewAnalysis from "@/components/dashboard/NewAnalysis";
import SubscriptionHistory from "@/components/dashboard/SubscriptionHistory";
import SubscriptionUpgrade from "@/components/dashboard/SubscriptionUpgrade";

type DashboardSection =
  | "overview"
  | "new-analysis"
  | "vastu-report"
  | "energy-map"
  | "support"
  | "profile"
  | "subscription-history"
  | "subscription-upgrade";

const menuItems = [
  { id: "overview" as const, label: "Dashboard Overview", icon: Home },
  { id: "new-analysis" as const, label: "New Analysis", icon: Plus },
  { id: "vastu-report" as const, label: "Vastu Compliance", icon: FileText },
  { id: "energy-map" as const, label: "Energy Flow Map", icon: Map },
  { id: "support" as const, label: "Support", icon: HelpCircle },
  { id: "profile" as const, label: "Profile", icon: User },
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
  const navigate = useNavigate();
  const [activeSection, setActiveSection] =
    useState<DashboardSection>("overview");

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <DashboardOverview
            setActiveSection={setActiveSection}
            navigate={navigate}
          />
        );
      case "new-analysis":
        return <NewAnalysis />;
      case "vastu-report":
        return <VastuReport />;
      case "energy-map":
        return <EnergyMap />;
      case "support":
        return <Support />;
      case "profile":
        return <UserProfile />;
      case "subscription-history":
        return <SubscriptionHistory />;
      case "subscription-upgrade":
        return <SubscriptionUpgrade />;
      default:
        return (
          <DashboardOverview
            setActiveSection={setActiveSection}
            navigate={navigate}
          />
        );
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
