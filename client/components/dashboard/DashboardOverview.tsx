import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  FileText,
  Map,
  BarChart3,
  Plus,
  Clock,
  TrendingUp,
  Search,
  Settings,
  Zap,
  X,
  Play,
} from "lucide-react";

type DashboardSection =
  | "overview"
  | "new-analysis"
  | "vastu-report"
  | "energy-map"
  | "support"
  | "profile"
  | "subscription-history"
  | "subscription-upgrade";

interface DashboardOverviewProps {
  setActiveSection: (section: DashboardSection) => void;
}

export default function DashboardOverview({
  setActiveSection,
}: DashboardOverviewProps) {
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
      color: "bg-primary hover:bg-primary/90",
    },
    {
      title: "View Reports",
      description: "Check your analysis reports",
      icon: FileText,
      action: () => setActiveSection("vastu-report"),
      color: "bg-secondary hover:bg-secondary/90",
    },
    {
      title: "Energy Analysis",
      description: "Analyze energy flow patterns",
      icon: Zap,
      action: () => setActiveSection("energy-map"),
      color: "bg-success hover:bg-success/90",
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
              variant="primary"
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
            <Home className="h-4 w-4 text-muted-foreground" />
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
              <SelectContent className="bg-white">
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
              <SelectContent className="bg-white">
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
              <SelectContent className="bg-white">
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
                    variant="primary"
                    className="flex-1 sm:flex-none"
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
