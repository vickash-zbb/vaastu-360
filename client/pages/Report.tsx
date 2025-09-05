
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  FileText,
  Share2,
  Printer,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  User,
  Building,
  Ruler,
  Compass,
  ArrowLeft
} from "lucide-react";

interface AnalysisData {
  propertyName?: string;
  address?: string;
  location?: { lat: number; lng: number; address: string };
  files: Array<{
    file: File;
    id: string;
    scale?: string;
    detectionAccuracy?: 'auto' | 'manual';
  }>;
}

export default function Report() {
  const navigate = useNavigate();
  const location = useLocation();
  const analysisData = location.state as AnalysisData;

  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    message: ""
  });

  // Mock comprehensive analysis results
  const analysisResults = {
    overallScore: 98,
    compliantZones: 6,
    issuesFound: 2,
    remedies: 5,
    propertyName: analysisData?.propertyName || "123 Main Street, Mumbai",
    clientName: "John Doe",
    propertyType: "Residential Plot",
    plotArea: "1200 sq ft",
    floors: "Ground + 3 Floors",
    referenceImages: 4,
    facingDirection: "North",
    roadWidth: "40 ft main road",
    reportId: "VAR-2023-001",
    analysisDate: "October 15, 2023",
    reportGenerated: "2023-10-15"
  };

  const handleDownloadPDF = () => {
    alert("PDF download functionality would be implemented here. This would generate a comprehensive Vastu analysis report.");
  };

  const handleShare = (platform: string) => {
    const shareUrl = window.location.href;
    const shareText = `Check out my Vastu analysis report for ${analysisResults.propertyName}! Score: ${analysisResults.overallScore}/100`;

    switch (platform) {
      case 'copy':
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        alert("Link copied to clipboard!");
        break;
      case 'email':
        window.open(`mailto:?subject=Vastu Analysis Report&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`);
        break;
      default:
        alert("Share functionality would be implemented here");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Appointment booking request submitted! Our team will contact you within 24 hours.");
    setIsBookingDialogOpen(false);
    setBookingForm({
      name: "",
      email: "",
      phone: "",
      preferredDate: "",
      preferredTime: "",
      message: ""
    });
  };

  const zoneAnalysis = [
    {
      zone: "North",
      status: "Attention",
      assessment: "North zone represents wealth, career success, and opportunities. The main entrance is positioned well but lacks water element enhancement.",
      keyFindings: "Main entrance clearly visible in north wall\nEntrance pathway unobstructed\nLiving room in north zone",
      recommendations: "Add water element in north-east corner\nInstall wealth symbols\nEnhance entrance lighting"
    },
    {
      zone: "North-East",
      status: "Compliant",
      assessment: "North-east zone is well-maintained with proper spiritual and mental energy flow.",
      keyFindings: "Prayer area positioned correctly\nNatural light abundant\nClean and clutter-free",
      recommendations: "Maintain cleanliness\nKeep area well-lit\nRegular prayer rituals"
    },
    {
      zone: "East",
      status: "Compliant",
      assessment: "East zone shows excellent energy flow with proper room placement and natural light.",
      keyFindings: "Dining area in east zone\nGood morning light\nPositive energy flow",
      recommendations: "Keep area clean\nMaintain natural light\nRegular family meals"
    },
    {
      zone: "South-East",
      status: "Attention",
      assessment: "South-east zone needs attention for optimal fire element balance.",
      keyFindings: "Kitchen in south-east\nStove facing south\nNeed orientation adjustment",
      recommendations: "Adjust stove orientation\nAdd fire element symbols\nImprove ventilation"
    },
    {
      zone: "South",
      status: "Compliant",
      assessment: "South zone is optimally positioned for master bedroom and storage.",
      keyFindings: "Master bedroom in south-west\nHeavy items stored properly\nGood energy balance",
      recommendations: "Maintain heavy furniture placement\nKeep area clean\nRegular maintenance"
    },
    {
      zone: "South-West",
      status: "Compliant",
      assessment: "South-west zone perfectly aligned for stability and support.",
      keyFindings: "Master bedroom positioned well\nHeavy furniture placement\nStrong foundation energy",
      recommendations: "Keep area stable\nMaintain cleanliness\nRegular energy cleansing"
    },
    {
      zone: "West",
      status: "Attention",
      assessment: "West zone requires attention for proper energy distribution.",
      keyFindings: "Bathroom in west zone\nNeed water element balance\nPartial compliance",
      recommendations: "Add water element\nImprove ventilation\nBalance energy flow"
    },
    {
      zone: "North-West",
      status: "Compliant",
      assessment: "North-west zone shows good energy flow for social and travel aspects.",
      keyFindings: "Guest room positioned well\nSocial area functional\nGood connectivity",
      recommendations: "Maintain social activities\nKeep area welcoming\nRegular gatherings"
    },
    {
      zone: "Center",
      status: "Attention",
      assessment: "Central zone (Brahmasthan) has staircase which blocks cosmic energy.",
      keyFindings: "Staircase in center\nEnergy blockage\nNeed alternative placement",
      recommendations: "Relocate staircase\nAdd central open space\nBalance energy flow"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      {/* Header */}
      <div className="min-h-[85px] px-4 sm:px-6 lg:px-8 xl:px-16 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 lg:gap-8 border-b border-[#C1C1C1] bg-white">
        <div className="flex items-center flex-shrink-0">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 mr-2 sm:mr-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
          <div className="text-[#212529] font-['Noto Sans Devanagari'] text-xl sm:text-2xl lg:text-3xl font-semibold">
            Vaastu 360
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6 w-full lg:w-auto">
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-[#421034] rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-[#212529] font-roboto text-lg sm:text-xl lg:text-2xl xl:text-3xl font-normal leading-[120%]">
                Vaastu Analysis Result
              </div>
              <div className="text-[#6C757D] font-roboto text-sm sm:text-base font-normal leading-[150%]">
                Traditional Wisdom, Modern Solutions
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full lg:w-auto">
            <div className="text-[#212529] font-roboto text-lg sm:text-xl lg:text-2xl xl:text-3xl font-normal leading-[120%]">
              Property Vaastu Analysis Report
            </div>
            <div className="text-[#6C757D] font-roboto text-sm sm:text-base font-normal leading-[150%]">
              Report ID: {analysisResults.reportId}
            </div>
            <div className="text-[#6C757D] font-roboto text-sm sm:text-base font-normal leading-[150%]">
              Analysis Date: {analysisResults.analysisDate}
            </div>
            <div className="text-[#6C757D] font-roboto text-sm sm:text-base font-normal leading-[150%]">
              Report Generated: {analysisResults.reportGenerated}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-6 w-full lg:w-auto">
            <Button
              onClick={() => setIsBookingDialogOpen(true)}
              className="bg-[#421034] hover:bg-[#421034]/90 text-white px-3 py-2 sm:px-4 rounded-lg flex items-center gap-2 text-sm sm:text-base flex-1 sm:flex-none"
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Book Consultation</span>
              <span className="sm:hidden">Book</span>
            </Button>

            <Button
              onClick={handleDownloadPDF}
              variant="secondary"
              className="bg-[#6C757D] hover:bg-[#6C757D]/90 text-white px-3 py-2 sm:px-4 rounded-lg flex items-center gap-2 text-sm sm:text-base flex-1 sm:flex-none"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden">PDF</span>
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="secondary"
                  className="bg-[#6C757D] hover:bg-[#6C757D]/90 text-white px-3 py-2 sm:px-4 rounded-lg flex items-center gap-2 text-sm sm:text-base flex-1 sm:flex-none"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Share</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share Your Report</DialogTitle>
                  <DialogDescription>
                    Share your Vastu analysis report with others
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <Button onClick={() => handleShare('copy')} variant="outline" className="justify-start">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Copy Link
                  </Button>
                  <Button onClick={() => handleShare('email')} variant="outline" className="justify-start">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Share via Email
                  </Button>
                  <Button onClick={() => handleShare('whatsapp')} variant="outline" className="justify-start">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Share on WhatsApp
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              onClick={handlePrint}
              variant="secondary"
              className="bg-[#6C757D] hover:bg-[#6C757D]/90 text-white px-3 py-2 sm:px-4 rounded-lg flex items-center gap-2 text-sm sm:text-base flex-1 sm:flex-none"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 xl:px-10 py-8 sm:py-12 lg:py-16 xl:py-20">
        {/* Property Information */}
        <div className="mb-12 lg:mb-16 xl:mb-20">
          <div className="flex items-center gap-2 mb-6 sm:mb-8 lg:mb-10 border-b-3 border-[#7C2C66] pb-4">
            <div className="text-[#212529] font-roboto text-2xl sm:text-3xl lg:text-4xl font-normal leading-[120%]">
              Property Information
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            <div className="p-6 border-l-3 border-[#421034] bg-white shadow-lg rounded-lg">
              <div className="text-[#212529] font-roboto text-base font-normal leading-[200%] mb-2">
                Property Name/Address:
              </div>
              <div className="text-[#6C757D] font-roboto text-base font-normal leading-[200%]">
                {analysisResults.propertyName}
              </div>
            </div>

            <div className="p-6 border-l-3 border-[#421034] bg-white shadow-lg rounded-lg">
              <div className="text-[#212529] font-roboto text-base font-normal leading-[200%] mb-2">
                Client Name:
              </div>
              <div className="text-[#6C757D] font-roboto text-base font-normal leading-[200%]">
                {analysisResults.clientName}
              </div>
            </div>

            <div className="p-6 border-l-3 border-[#421034] bg-white shadow-lg rounded-lg">
              <div className="text-[#212529] font-roboto text-base font-normal leading-[200%] mb-2">
                Property Type:
              </div>
              <div className="text-[#6C757D] font-roboto text-base font-normal leading-[200%]">
                {analysisResults.propertyType}
              </div>
            </div>

            <div className="p-6 border-l-3 border-[#421034] bg-white shadow-lg rounded-lg">
              <div className="text-[#212529] font-roboto text-base font-normal leading-[200%] mb-2">
                Plot Area:
              </div>
              <div className="text-[#6C757D] font-roboto text-base font-normal leading-[200%]">
                {analysisResults.plotArea}
              </div>
            </div>

            <div className="p-6 border-l-3 border-[#421034] bg-white shadow-lg rounded-lg">
              <div className="text-[#212529] font-roboto text-base font-normal leading-[200%] mb-2">
                Floors:
              </div>
              <div className="text-[#6C757D] font-roboto text-base font-normal leading-[200%]">
                {analysisResults.floors}
              </div>
            </div>

            <div className="p-6 border-l-3 border-[#421034] bg-white shadow-lg rounded-lg">
              <div className="text-[#212529] font-roboto text-base font-normal leading-[200%] mb-2">
                Reference Images:
              </div>
              <div className="text-[#6C757D] font-roboto text-base font-normal leading-[200%]">
                {analysisResults.referenceImages} images analyzed
              </div>
            </div>

            <div className="p-6 border-l-3 border-[#421034] bg-white shadow-lg rounded-lg">
              <div className="text-[#212529] font-roboto text-base font-normal leading-[200%] mb-2">
                Facing Direction:
              </div>
              <div className="text-[#6C757D] font-roboto text-base font-normal leading-[200%]">
                {analysisResults.facingDirection}
              </div>
            </div>

            <div className="p-6 border-l-3 border-[#421034] bg-white shadow-lg rounded-lg">
              <div className="text-[#212529] font-roboto text-base font-normal leading-[200%] mb-2">
                Road Width:
              </div>
              <div className="text-[#6C757D] font-roboto text-base font-normal leading-[200%]">
                {analysisResults.roadWidth}
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Methodology */}
        <div className="mb-12 lg:mb-16 xl:mb-20">
          <div className="flex items-center gap-2 mb-6 sm:mb-8 lg:mb-10 border-b-3 border-[#7C2C66] pb-4">
            <div className="text-[#212529] font-roboto text-2xl sm:text-3xl lg:text-4xl font-normal leading-[120%]">
              Analysis Methodology
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <Card className="p-5 bg-white shadow-lg">
              <div className="border-b-3 border-[#7C2C66] pb-4 mb-6">
                <div className="text-[#212529] font-roboto text-3xl font-normal leading-[120%]">
                  Approach & Standards
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 border-l-3 border-[#421034] bg-[#F7F7F7] shadow-lg rounded-lg">
                  <div className="text-[#212529] font-roboto text-base font-normal leading-[200%] mb-2">
                    Approach:
                  </div>
                  <div className="text-[#6C757D] font-roboto text-base font-normal leading-[200%]">
                    Traditional principles combined with modern scientific validation
                  </div>
                </div>

                <div className="p-6 border-l-3 border-[#421034] bg-[#F7F7F7] shadow-lg rounded-lg">
                  <div className="text-[#212529] font-roboto text-base font-normal leading-[200%] mb-2">
                    Standards:
                  </div>
                  <div className="text-[#6C757D] font-roboto text-base font-normal leading-[200%]">
                    Based on ancient Vedic texts and modern architectural science
                  </div>
                </div>

                <div className="p-6 border-l-3 border-[#421034] bg-[#F7F7F7] shadow-lg rounded-lg">
                  <div className="text-[#212529] font-roboto text-base font-normal leading-[200%] mb-2">
                    Accuracy:
                  </div>
                  <div className="text-[#6C757D] font-roboto text-base font-normal leading-[200%]">
                    95% confidence level based on multiple verification methods
                  </div>
                </div>

                <div className="p-6 border-l-3 border-[#421034] bg-[#F7F7F7] shadow-lg rounded-lg">
                  <div className="text-[#212529] font-roboto text-base font-normal leading-[200%] mb-2">
                    Limitations:
                  </div>
                  <div className="text-[#6C757D] font-roboto text-base font-normal leading-[200%]">
                    Analysis based on provided floor plans and site visit observations
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-5 bg-white shadow-lg">
              <div className="border-b-3 border-[#7C2C66] pb-4 mb-6">
                <div className="text-[#212529] font-roboto text-3xl font-normal leading-[120%]">
                  Tools & Equipment Used
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-6 border-b border-[#6C757D] bg-white">
                  <div className="text-[#212529] font-roboto text-base font-normal leading-[200%]">
                    ✓ Professional compass for directional accuracy
                  </div>
                </div>

                <div className="p-6 border-b border-[#6C757D] bg-white">
                  <div className="text-[#212529] font-roboto text-base font-normal leading-[200%]">
                    ✓ Laser measuring tools for precise dimensions
                  </div>
                </div>

                <div className="p-6 border-b border-[#6C757D] bg-white">
                  <div className="text-[#212529] font-roboto text-base font-normal leading-[200%]">
                    ✓ Vaastu grid analysis
                  </div>
                </div>

                <div className="p-6 border-b border-[#6C757D] bg-white">
                  <div className="text-[#212529] font-roboto text-base font-normal leading-[200%]">
                    ✓ Energy flow mapping techniques
                  </div>
                </div>

                <div className="p-6 border-b border-[#6C757D] bg-white">
                  <div className="text-[#212529] font-roboto text-base font-normal leading-[200%]">
                    ✓ Magnetic field strength measurement
                  </div>
                </div>

                <div className="p-6 border-b border-[#6C757D] bg-white">
                  <div className="text-[#212529] font-roboto text-base font-normal leading-[200%]">
                    ✓ Natural light and ventilation assessment
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="mb-12 lg:mb-16 xl:mb-20">
          <div className="flex items-center gap-2 mb-6 sm:mb-8 lg:mb-10 border-b-3 border-[#7C2C66] pb-4">
            <div className="text-[#212529] font-roboto text-2xl sm:text-3xl lg:text-4xl font-normal leading-[120%]">
              Executive Summary
            </div>
          </div>

          <div className="mb-6 sm:mb-8">
            <div className="text-[#212529] font-roboto text-lg sm:text-xl font-bold leading-[200%] mb-4">
              This comprehensive Vaastu analysis has been conducted for the property located at {analysisResults.propertyName}. The analysis is based on traditional Vaastu Shastra principles and modern architectural considerations.
            </div>
            <div className="text-[#212529] font-roboto text-lg sm:text-xl font-bold leading-[200%]">
              The property demonstrates good overall compliance with Vaastu guidelines, with {analysisResults.overallScore}% alignment to optimal energy flow principles. Key findings include {analysisResults.compliantZones} compliant zones and {analysisResults.issuesFound} areas requiring attention.
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-4 sm:p-6 border-l-3 border-[#421034] bg-white shadow-lg rounded-lg text-center">
              <div className="text-[#212529] font-roboto text-3xl sm:text-4xl lg:text-5xl font-normal leading-[120%] mb-2">
                {analysisResults.overallScore}%
              </div>
              <div className="text-[#6C757D] font-roboto text-sm sm:text-base font-normal leading-[200%]">
                Overall Score
              </div>
            </div>

            <div className="p-4 sm:p-6 border-l-3 border-[#421034] bg-white shadow-lg rounded-lg text-center">
              <div className="text-[#212529] font-roboto text-3xl sm:text-4xl lg:text-5xl font-normal leading-[120%] mb-2">
                {analysisResults.compliantZones}
              </div>
              <div className="text-[#6C757D] font-roboto text-sm sm:text-base font-normal leading-[200%]">
                Compliant Zones
              </div>
            </div>

            <div className="p-4 sm:p-6 border-l-3 border-[#421034] bg-white shadow-lg rounded-lg text-center">
              <div className="text-[#212529] font-roboto text-3xl sm:text-4xl lg:text-5xl font-normal leading-[120%] mb-2">
                {analysisResults.issuesFound}
              </div>
              <div className="text-[#6C757D] font-roboto text-sm sm:text-base font-normal leading-[200%]">
                Issues Found
              </div>
            </div>

            <div className="p-4 sm:p-6 border-l-3 border-[#421034] bg-white shadow-lg rounded-lg text-center">
              <div className="text-[#212529] font-roboto text-3xl sm:text-4xl lg:text-5xl font-normal leading-[120%] mb-2">
                {analysisResults.remedies}
              </div>
              <div className="text-[#6C757D] font-roboto text-sm sm:text-base font-normal leading-[200%]">
                Remedies
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Overview */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-10 border-b-3 border-[#7C2C66] pb-4">
            <div className="text-[#212529] font-roboto text-3xl font-normal leading-[120%]">
              Analysis Overview
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <Card className="p-4 sm:p-6 bg-white shadow-lg">
              <div className="border-t-3 border-[#421034] pt-4">
                <div className="text-[#212529] font-roboto text-xl sm:text-2xl lg:text-3xl font-normal leading-[120%] mb-4">
                  Property Assessment
                </div>
                <div className="text-[#6C757D] font-roboto text-sm sm:text-base font-normal leading-[200%] mb-6">
                  {analysisResults.floors}
                </div>

                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r="54"
                        stroke="#E9ECEF"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="54"
                        stroke="#421034"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${(analysisResults.overallScore / 100) * 339} 339`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-[#212529] font-roboto text-2xl sm:text-3xl lg:text-4xl font-normal">
                          {analysisResults.overallScore}
                        </div>
                        <div className="text-[#212529] font-roboto text-xs sm:text-sm">Score</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-[#212529] font-roboto text-sm sm:text-base font-normal leading-[200%]">
                  The property shows strong alignment with positive energy principles, with room for minor improvements.
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 bg-white shadow-lg">
              <div className="border-t-3 border-[#421034] pt-4">
                <div className="text-[#212529] font-roboto text-xl sm:text-2xl lg:text-3xl font-normal leading-[120%] mb-4">
                  Zone Compliance
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-[#421034] font-roboto text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-normal leading-[120%]">
                      {analysisResults.compliantZones}
                    </div>
                    <div className="text-[#6C757D] font-roboto text-xs sm:text-sm lg:text-base font-normal leading-[200%]">
                      Compliant Zones
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-[#421034] font-roboto text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-normal leading-[120%]">
                      {analysisResults.issuesFound}
                    </div>
                    <div className="text-[#6C757D] font-roboto text-xs sm:text-sm lg:text-base font-normal leading-[200%]">
                      Need Attention
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-[#421034] font-roboto text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-normal leading-[120%]">
                      1
                    </div>
                    <div className="text-[#6C757D] font-roboto text-xs sm:text-sm lg:text-base font-normal leading-[200%]">
                      Issues
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 bg-white shadow-lg">
              <div className="border-t-3 border-[#421034] pt-4">
                <div className="text-[#212529] font-roboto text-xl sm:text-2xl lg:text-3xl font-normal leading-[120%] mb-4">
                  Priority Actions
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="p-3 sm:p-5 border-b border-[#6C757D]">
                    <div className="text-red-600 font-roboto text-sm sm:text-base font-normal leading-[200%]">
                      High: Address staircase placement
                    </div>
                  </div>

                  <div className="p-3 sm:p-5 border-b border-[#6C757D]">
                    <div className="text-yellow-600 font-roboto text-sm sm:text-base font-normal leading-[200%]">
                      Medium: Adjust kitchen orientation
                    </div>
                  </div>

                  <div className="p-3 sm:p-5 border-b border-[#6C757D]">
                    <div className="text-green-600 font-roboto text-sm sm:text-base font-normal leading-[200%]">
                      Low: Enhance prayer area
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Floor Plan Analysis */}
        <div className="mb-12 lg:mb-16 xl:mb-20">
          <div className="flex items-center gap-2 mb-6 sm:mb-8 lg:mb-10 border-b-3 border-[#7C2C66] pb-4">
            <div className="text-[#212529] font-roboto text-2xl sm:text-3xl lg:text-4xl font-normal leading-[120%]">
              Floor Plan Analysis
            </div>
          </div>

          <Card className="p-4 sm:p-6 lg:p-8 xl:p-10 bg-white shadow-lg">
            <div className="text-center mb-6 sm:mb-8">
              <div className="text-[#212529] font-roboto text-xl sm:text-2xl lg:text-3xl font-normal leading-[120%]">
                Overall Assessment
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
              <div className="p-6 bg-[#F6F6F6] rounded-lg text-center">
                <div className="text-[#212529] font-roboto text-base font-normal leading-[200%] mb-2">
                  Layout Score:
                </div>
                <div className="text-[#212529] font-roboto text-2xl font-normal leading-[120%]">
                  78/100
                </div>
              </div>

              <div className="p-6 bg-[#F6F6F6] rounded-lg text-center">
                <div className="text-[#212529] font-roboto text-base font-normal leading-[200%] mb-2">
                  Energy Flow:
                </div>
                <div className="text-[#212529] font-roboto text-2xl font-normal leading-[120%]">
                  Moderate with some blockages
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Major Issues and Positive Aspects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 lg:mb-16 xl:mb-20">
          <Card className="p-4 sm:p-6 lg:p-8 bg-white shadow-lg">
            <div className="border-b-3 border-[#7C2C66] pb-4 mb-4 sm:mb-6">
              <div className="text-[#212529] font-roboto text-xl sm:text-2xl lg:text-3xl font-normal leading-[120%]">
                Major Issues Identified
              </div>
            </div>

            <div className="text-[#212529] font-roboto text-sm sm:text-base font-normal leading-[200%] space-y-2">
              <div>• Staircase in Brahmasthan (central area)</div>
              <div>• Kitchen stove facing south</div>
              <div>• Toilet in north-east zone</div>
              <div>• Missing water element in north</div>
            </div>
          </Card>

          <Card className="p-4 sm:p-6 lg:p-8 bg-white shadow-lg">
            <div className="border-b-3 border-[#7C2C66] pb-4 mb-4 sm:mb-6">
              <div className="text-[#212529] font-roboto text-xl sm:text-2xl lg:text-3xl font-normal leading-[120%]">
                Positive Aspects
              </div>
            </div>

            <div className="text-[#212529] font-roboto text-sm sm:text-base font-normal leading-[200%] space-y-2">
              <div>• North-facing main entrance</div>
              <div>• Master bedroom in south-west</div>
              <div>• Dining area in east zone</div>
              <div>• Good natural light distribution</div>
            </div>
          </Card>
        </div>

        {/* Critical Observations */}
        <div className="mb-12 lg:mb-16 xl:mb-20">
          <div className="flex items-center gap-2 mb-6 sm:mb-8 lg:mb-10 border-b-3 border-[#7C2C66] pb-4">
            <div className="text-[#212529] font-roboto text-2xl sm:text-3xl lg:text-4xl font-normal leading-[120%]">
              Critical Observations
            </div>
          </div>

          <Card className="p-4 sm:p-6 lg:p-8 bg-white shadow-lg">
            <div className="text-[#212529] font-roboto text-sm sm:text-base font-normal leading-[200%] space-y-2">
              <div>• Central staircase blocks cosmic energy</div>
              <div>• Incorrect stove orientation affects digestion</div>
              <div>• North-east toilet disrupts spiritual energy</div>
              <div>• Missing water feature reduces prosperity energy</div>
            </div>
          </Card>
        </div>

        {/* Image Analysis Details */}
        <div className="mb-12 lg:mb-16 xl:mb-20">
          <div className="flex items-center gap-2 mb-6 sm:mb-8 lg:mb-10 border-b-3 border-[#7C2C66] pb-4">
            <div className="text-[#212529] font-roboto text-2xl sm:text-3xl lg:text-4xl font-normal leading-[120%]">
              Image Analysis Details
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <Card className="p-4 sm:p-6 bg-[#F7F7F7] shadow-lg">
              <div className="text-[#421034] font-roboto text-lg sm:text-xl lg:text-2xl font-normal leading-[120%] mb-3 sm:mb-4">
                Floor Plan Layout
              </div>
              <div className="text-[#212529] font-roboto text-sm sm:text-base font-normal leading-[200%] space-y-2">
                <div><strong>Description:</strong> Main floor plan showing room layout and door positions</div>
                <div><strong>Measurements:</strong> Plot: 30' × 40', Built-up: 950 sq ft</div>
                <div><strong>Orientation:</strong> North-facing property with accurate directional alignment</div>
                <div><strong>Key Observations:</strong></div>
                <div className="ml-4 space-y-1">
                  <div>• Main entrance clearly visible in north wall</div>
                  <div>• Kitchen positioned in south-east corner</div>
                  <div>• Master bedroom in south-west zone</div>
                  <div>• Staircase located in central area</div>
                  <div>• Bathrooms positioned in north-east and west zones</div>
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 bg-[#F7F7F7] shadow-lg">
              <div className="text-[#421034] font-roboto text-lg sm:text-xl lg:text-2xl font-normal leading-[120%] mb-3 sm:mb-4">
                Site Plan
              </div>
              <div className="text-[#212529] font-roboto text-sm sm:text-base font-normal leading-[200%] space-y-2">
                <div><strong>Description:</strong> Property plot layout with surrounding areas</div>
                <div><strong>Measurements:</strong> Plot Area: 1200 sq ft, Road Width: 40 ft</div>
                <div><strong>Orientation:</strong> Optimal plot orientation with good road access</div>
                <div><strong>Key Observations:</strong></div>
                <div className="ml-4 space-y-1">
                  <div>• Property located on corner plot</div>
                  <div>• Main road access from north side</div>
                  <div>• Open space available in north-east</div>
                  <div>• Neighboring buildings on east and south sides</div>
                  <div>• Sufficient setback maintained on all sides</div>
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 bg-[#F7F7F7] shadow-lg">
              <div className="text-[#421034] font-roboto text-lg sm:text-xl lg:text-2xl font-normal leading-[120%] mb-3 sm:mb-4">
                Entrance View
              </div>
              <div className="text-[#212529] font-roboto text-sm sm:text-base font-normal leading-[200%] space-y-2">
                <div><strong>Description:</strong> Main entrance area and approach path</div>
                <div><strong>Measurements:</strong> Door Size: 42" × 84", Pathway Width: 4 ft</div>
                <div><strong>Orientation:</strong> Perfect north alignment with welcoming energy flow</div>
                <div><strong>Key Observations:</strong></div>
                <div className="ml-4 space-y-1">
                  <div>• Main door faces magnetic north</div>
                  <div>• Entrance pathway clear and unobstructed</div>
                  <div>• Threshold stone present at entrance</div>
                  <div>• Nameplate positioned on east side of door</div>
                  <div>• Natural light illuminates entrance area</div>
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 bg-[#F7F7F7] shadow-lg">
              <div className="text-[#421034] font-roboto text-lg sm:text-xl lg:text-2xl font-normal leading-[120%] mb-3 sm:mb-4">
                Interior Layout
              </div>
              <div className="text-[#212529] font-roboto text-sm sm:text-base font-normal leading-[200%] space-y-2">
                <div><strong>Description:</strong> Internal room arrangement and furniture placement</div>
                <div><strong>Measurements:</strong> Room Heights: 10 ft, Door Width: 36"</div>
                <div><strong>Orientation:</strong> Well-planned interior with positive energy circulation</div>
                <div><strong>Key Observations:</strong></div>
                <div className="ml-4 space-y-1">
                  <div>• Bedroom doors open clockwise</div>
                  <div>• Kitchen platform faces east</div>
                  <div>• Dining area in east zone</div>
                  <div>• Study room in north-east corner</div>
                  <div>• Heavy furniture in south-west</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Detailed Zone Analysis */}
        <div className="mb-12 lg:mb-16 xl:mb-20">
          <div className="flex items-center gap-2 mb-6 sm:mb-8 lg:mb-10 border-b-3 border-[#7C2C66] pb-4">
            <div className="text-[#212529] font-roboto text-2xl sm:text-3xl lg:text-4xl font-normal leading-[120%]">
              Detailed Zone Analysis
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block">
            <div className="bg-[#7C2C66] text-white">
              <div className="grid grid-cols-5 p-4">
                <div className="font-roboto text-sm sm:text-base font-normal">Zone</div>
                <div className="font-roboto text-sm sm:text-base font-normal">Status</div>
                <div className="font-roboto text-sm sm:text-base font-normal">Assessment</div>
                <div className="font-roboto text-sm sm:text-base font-normal">Key Findings</div>
                <div className="font-roboto text-sm sm:text-base font-normal">Recommendations</div>
              </div>
            </div>

            <div className="space-y-0">
              {zoneAnalysis.map((zone, index) => (
                <div key={index} className="grid grid-cols-5 border border-[#DEE2E6]">
                  <div className="p-4 sm:p-6 border-l border-[#DEE2E6]">
                    <div className="font-roboto text-sm sm:text-base font-bold leading-[150%] text-[#212529]">
                      {zone.zone}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      {zone.zone === "North" && (
                        <>
                          <div className="px-2 py-1 bg-blue-100 rounded-full text-[#212529] font-roboto text-xs">Water</div>
                          <div className="px-2 py-1 bg-blue-100 rounded-full text-[#212529] font-roboto text-xs">Kubera (Wealth)</div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 border-l border-[#DEE2E6]">
                    <div className="font-roboto text-sm sm:text-base font-bold leading-[150%] text-[#212529]">
                      {zone.status}
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 border-l border-[#DEE2E6]">
                    <div className="font-roboto text-xs sm:text-sm leading-[150%] text-[#212529] mb-3">
                      {zone.assessment}
                    </div>
                    <div className="p-3 border-l-3 border-green-600 bg-[#F7F7F7] shadow-lg rounded-lg">
                      <div className="text-[#6C757D] font-roboto text-xs sm:text-sm leading-[150%]">
                        Assessment: {zone.assessment}
                      </div>
                    </div>
                    <div className="p-3 border-l-3 border-yellow-600 bg-[#F7F7F7] shadow-lg rounded-lg mt-3">
                      <div className="text-[#6C757D] font-roboto text-xs sm:text-sm leading-[150%]">
                        Measurements: Entrance: 42" × 84", Living Room: 12' × 15', North Wall Length: 24'
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 border-l border-[#DEE2E6]">
                    <div className="font-roboto text-xs sm:text-sm leading-[150%] text-[#212529]">
                      {zone.keyFindings}
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 border-l border-[#DEE2E6]">
                    <div className="font-roboto text-xs sm:text-sm leading-[150%] text-[#212529]">
                      {zone.recommendations}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {zoneAnalysis.map((zone, index) => (
              <Card key={index} className="p-4 bg-white shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="font-roboto text-lg font-bold text-[#212529]">
                      {zone.zone}
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      zone.status === 'Compliant' ? 'bg-green-100 text-green-800' :
                      zone.status === 'Attention' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {zone.status}
                    </div>
                  </div>

                  {zone.zone === "North" && (
                    <div className="flex flex-wrap gap-2">
                      <div className="px-3 py-1 bg-blue-100 rounded-full text-[#212529] font-roboto text-sm">Water</div>
                      <div className="px-3 py-1 bg-blue-100 rounded-full text-[#212529] font-roboto text-sm">Kubera (Wealth)</div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-[#212529] mb-2">Assessment</h4>
                      <p className="text-sm text-[#6C757D] leading-relaxed">{zone.assessment}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#212529] mb-2">Key Findings</h4>
                      <p className="text-sm text-[#6C757D] leading-relaxed">{zone.keyFindings}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#212529] mb-2">Recommendations</h4>
                      <p className="text-sm text-[#6C757D] leading-relaxed">{zone.recommendations}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Analysis Notes */}
        <div className="mb-12 lg:mb-16 xl:mb-20">
          <div className="flex items-center gap-2 mb-6 sm:mb-8 lg:mb-10 border-b-3 border-[#7C2C66] pb-4">
            <div className="text-[#212529] font-roboto text-2xl sm:text-3xl lg:text-4xl font-normal leading-[120%]">
              Analysis Notes
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <Card className="p-6 bg-white shadow-lg">
              <div className="text-[#212529] font-roboto text-3xl font-normal leading-[120%] mb-6">
                Analysis Notes
              </div>

              <div className="space-y-6">
                <div className="p-5 border-b border-[#212529]">
                  <div className="text-[#212529] font-roboto text-base font-normal leading-[200%]">
                    North direction indicated by arrow
                  </div>
                </div>

                <div className="p-5 border-b border-[#212529]">
                  <div className="text-[#212529] font-roboto text-base font-normal leading-[200%]">
                    Grid overlay shows Vaastu zone divisions
                  </div>
                </div>

                <div className="p-5 border-b border-[#212529]">
                  <div className="text-[#212529] font-roboto text-base font-normal leading-[200%]">
                    Red markers indicate areas requiring attention
                  </div>
                </div>

                <div className="p-5 border-b border-[#6C757D]">
                  <div className="text-[#212529] font-roboto text-base font-normal leading-[200%]">
                    Green zones show optimal placement
                  </div>
                </div>

                <Button className="w-full bg-[#421034] hover:bg-[#421034]/90 text-white">
                  North
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-white shadow-lg">
              <div className="text-center mb-8">
                <div className="text-[#212529] font-roboto text-base font-normal leading-[200%] mb-4">
                  The legend behind Vastu Sastra
                </div>

                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-600 rounded-full"></div>
                    <div className="text-[#6C757D] font-roboto text-base font-normal leading-[200%]">
                      Compliant Zones
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-yellow-600 rounded-full"></div>
                    <div className="text-[#6C757D] font-roboto text-base font-normal leading-[200%]">
                      Needs Attention
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-red-600 rounded-full"></div>
                    <div className="text-[#6C757D] font-roboto text-base font-normal leading-[200%]">
                      Issues Identified
                    </div>
                  </div>
                </div>

                <div className="bg-[#E9ECEF] p-6 rounded-lg">
                  <div className="text-[#212529] font-roboto text-base font-normal leading-[200%]">
                    The legend behind Vastu Sastra
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Book Consultation</DialogTitle>
            <DialogDescription>
              Schedule a consultation with our Vaastu experts to discuss your property analysis and recommendations.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={bookingForm.email}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={bookingForm.phone}
                onChange={(e) => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="preferredDate">Preferred Date</Label>
                <Input
                  id="preferredDate"
                  type="date"
                  value={bookingForm.preferredDate}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, preferredDate: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredTime">Preferred Time</Label>
                <Input
                  id="preferredTime"
                  type="time"
                  value={bookingForm.preferredTime}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, preferredTime: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea
                id="message"
                value={bookingForm.message}
                onChange={(e) => setBookingForm(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Any specific questions or concerns you'd like to discuss..."
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsBookingDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-[#421034] hover:bg-[#421034]/90">
                Book Consultation
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};