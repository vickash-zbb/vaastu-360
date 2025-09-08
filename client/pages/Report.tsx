import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AnalysisData } from "@/components/dashboard/VastuReport";

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
    message: "",
  });

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
    reportGenerated: "2023-10-15",
  };

  const handleDownloadPDF = () => {
    alert("PDF download functionality would be implemented here. This would generate a comprehensive Vastu analysis report.");
  };

  const handleShare = (platform: string) => {
    const shareUrl = window.location.href;
    const shareText = `Check out my Vastu analysis report for ${analysisResults.propertyName}! Score: ${analysisResults.overallScore}/100`;

    switch (platform) {
      case "copy":
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        alert("Link copied to clipboard!");
        break;
      case "email":
        window.open(`mailto:?subject=Vastu Analysis Report&body=${encodeURIComponent(shareText + "\n\n" + shareUrl)}`);
        break;
      case "whatsapp":
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`);
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
    setBookingForm({ name: "", email: "", phone: "", preferredDate: "", preferredTime: "", message: "" });
  };

  const zoneAnalysis = [
    {
      zone: "North",
      status: "Attention",
      assessment:
        "North zone represents wealth and opportunities. Main entrance positioned well but needs water element enhancement.",
      keyFindings:
        "Main entrance clearly visible\nEntrance pathway unobstructed\nLiving room in north zone",
      recommendations:
        "Add water element in north-east corner\nInstall wealth symbols",
    },
    {
      zone: "North-East",
      status: "Compliant",
      assessment: "North-east zone well-maintained with proper spiritual energy flow.",
      keyFindings:
        "Prayer area positioned correctly\nNatural light abundant\nClean and clutter-free",
      recommendations: "Maintain cleanliness\nKeep area well-lit",
    },
    {
      zone: "East",
      status: "Compliant",
      assessment: "East zone shows excellent energy flow with proper room placement.",
      keyFindings: "Dining area in east zone\nGood morning light\nPositive energy flow",
      recommendations: "Keep area clean\nMaintain natural light",
    },
    {
      zone: "South-East",
      status: "Attention",
      assessment: "South-east zone needs attention for optimal fire element balance.",
      keyFindings: "Kitchen in south-east\nStove facing south\nNeed orientation adjustment",
      recommendations: "Adjust stove orientation\nAdd fire element symbols",
    },
    {
      zone: "South",
      status: "Compliant",
      assessment: "South zone optimally positioned for master bedroom and storage.",
      keyFindings: "Master bedroom in south-west\nHeavy items stored properly",
      recommendations: "Maintain heavy furniture placement\nKeep area clean",
    },
    {
      zone: "South-West",
      status: "Compliant",
      assessment: "South-west zone perfectly aligned for stability and support.",
      keyFindings: "Master bedroom positioned well\nStrong foundation energy",
      recommendations: "Keep area stable\nMaintain cleanliness",
    },
    {
      zone: "West",
      status: "Attention",
      assessment: "West zone requires attention for proper energy distribution.",
      keyFindings: "Bathroom in west zone\nNeed water element balance",
      recommendations: "Add water element\nImprove ventilation",
    },
    {
      zone: "North-West",
      status: "Compliant",
      assessment: "North-west zone shows good energy flow for social aspects.",
      keyFindings: "Guest room positioned well\nSocial area functional",
      recommendations: "Maintain social activities\nKeep area welcoming",
    },
    {
      zone: "Center",
      status: "Attention",
      assessment: "Central zone (Brahmasthan) has staircase blocking cosmic energy.",
      keyFindings: "Staircase in center\nEnergy blockage",
      recommendations: "Relocate staircase\nAdd central open space",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-10 py-4 border-b bg-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate("/dashboard")} className="h-9 px-2">
              <span className="material-icons-outlined text-[20px]">arrow_back</span>
              <span className="sr-only">Back</span>
            </Button>
            <div>
              <div className="text-xl sm:text-2xl font-semibold text-[#212529]">Vaastu 360</div>
              <div className="text-sm text-[#6C757D]">Vaastu Analysis Result — Traditional Wisdom, Modern Solutions</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Button onClick={() => setIsBookingDialogOpen(true)} className="bg-[#421034] hover:bg-[#421034]/90 text-white">
              <span className="material-icons-outlined text-[18px] mr-2">event</span>
              Book
            </Button>
            <Button variant="secondary" className="bg-[#6C757D] hover:bg-[#6C757D]/90 text-white" onClick={handleDownloadPDF}>
              <span className="material-icons-outlined text-[18px] mr-2">picture_as_pdf</span>
              PDF
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary" className="bg-[#6C757D] hover:bg-[#6C757D]/90 text-white">
                  <span className="material-icons-outlined text-[18px] mr-2">share</span>
                  Share
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share Your Report</DialogTitle>
                  <DialogDescription>Share your Vastu analysis report with others</DialogDescription>
                </DialogHeader>
                <div className="grid gap-2">
                  <Button onClick={() => handleShare("copy")} variant="outline" className="justify-start">
                    <span className="material-icons-outlined text-[18px] mr-2">content_copy</span>
                    Copy Link
                  </Button>
                  <Button onClick={() => handleShare("email")} variant="outline" className="justify-start">
                    <span className="material-icons-outlined text-[18px] mr-2">mail</span>
                    Share via Email
                  </Button>
                  <Button onClick={() => handleShare("whatsapp")} variant="outline" className="justify-start">
                    <span className="material-icons-outlined text-[18px] mr-2">chat</span>
                    Share on WhatsApp
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="secondary" className="bg-[#6C757D] hover:bg-[#6C757D]/90 text-white" onClick={handlePrint}>
              <span className="material-icons-outlined text-[18px] mr-2">print</span>
              Print
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-10 py-8 space-y-10">
        {/* Quick Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="text-3xl font-semibold text-[#212529]">{analysisResults.overallScore}%</div>
            <div className="text-sm text-[#6C757D]">Overall Score</div>
          </Card>
          <Card className="p-4">
            <div className="text-3xl font-semibold text-[#212529]">{analysisResults.compliantZones}</div>
            <div className="text-sm text-[#6C757D]">Compliant Zones</div>
          </Card>
          <Card className="p-4">
            <div className="text-3xl font-semibold text-[#212529]">{analysisResults.issuesFound}</div>
            <div className="text-sm text-[#6C757D]">Issues Found</div>
          </Card>
          <Card className="p-4">
            <div className="text-3xl font-semibold text-[#212529]">{analysisResults.remedies}</div>
            <div className="text-sm text-[#6C757D]">Remedies</div>
          </Card>
        </div>

        {/* Property Info */}
        <Card className="p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-xl">Property Information</CardTitle>
            <CardDescription>Key details about the property</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-0">
            <InfoRow icon="place" label="Property Name/Address" value={analysisResults.propertyName} />
            <InfoRow icon="person" label="Client Name" value={analysisResults.clientName} />
            <InfoRow icon="home" label="Property Type" value={analysisResults.propertyType} />
            <InfoRow icon="square_foot" label="Plot Area" value={analysisResults.plotArea} />
            <InfoRow icon="layers" label="Floors" value={analysisResults.floors} />
            <InfoRow icon="image" label="Reference Images" value={`${analysisResults.referenceImages} images analyzed`} />
            <InfoRow icon="explore" label="Facing Direction" value={analysisResults.facingDirection} />
            <InfoRow icon="signpost" label="Road Width" value={analysisResults.roadWidth} />
            <InfoRow icon="receipt_long" label="Report ID" value={analysisResults.reportId} />
          </CardContent>
        </Card>

        {/* Priority Actions */}
        <Card className="p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-xl">Priority Actions</CardTitle>
            <CardDescription>Focus on these items first</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 p-0">
            <ActionRow color="text-red-600" icon="priority_high" text="High: Address staircase placement" />
            <ActionRow color="text-amber-600" icon="warning" text="Medium: Adjust kitchen orientation" />
            <ActionRow color="text-green-600" icon="check_circle" text="Low: Enhance prayer area" />
          </CardContent>
        </Card>

        {/* Details (Collapsible) */}
        <Accordion type="multiple" className="bg-white rounded-md">
          <AccordionItem value="methodology">
            <AccordionTrigger className="px-4">Analysis Methodology</AccordionTrigger>
            <AccordionContent className="px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-5">
                  <div className="text-lg font-medium mb-4">Approach & Standards</div>
                  <div className="space-y-4">
                    <Bullet title="Approach" text="Traditional principles combined with modern scientific validation" />
                    <Bullet title="Standards" text="Based on ancient Vedic texts and modern architectural science" />
                    <Bullet title="Accuracy" text="95% confidence level based on multiple verification methods" />
                    <Bullet title="Limitations" text="Analysis based on provided floor plans and site visit observations" />
                  </div>
                </Card>
                <Card className="p-5">
                  <div className="text-lg font-medium mb-4">Tools & Equipment Used</div>
                  <ul className="space-y-2 text-sm text-[#212529]">
                    <li>• Professional compass for directional accuracy</li>
                    <li>• Laser measuring tools for precise dimensions</li>
                    <li>• Vaastu grid analysis</li>
                    <li>• Energy flow mapping techniques</li>
                    <li>• Magnetic field strength measurement</li>
                    <li>• Natural light and ventilation assessment</li>
                  </ul>
                </Card>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="zones">
            <AccordionTrigger className="px-4">Detailed Zone Analysis</AccordionTrigger>
            <AccordionContent className="px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {zoneAnalysis.map((zone, idx) => (
                  <Card key={idx} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-base font-medium">{zone.zone}</div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        zone.status === "Compliant"
                          ? "bg-green-100 text-green-800"
                          : zone.status === "Attention"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-100 text-red-800"
                      }`}>{zone.status}</span>
                    </div>
                    <div className="text-sm text-[#6C757D] whitespace-pre-line">{zone.assessment}</div>
                    <div className="mt-3">
                      <div className="text-xs font-medium text-[#212529] mb-1">Key Findings</div>
                      <div className="text-sm text-[#6C757D] whitespace-pre-line">{zone.keyFindings}</div>
                    </div>
                    <div className="mt-3">
                      <div className="text-xs font-medium text-[#212529] mb-1">Recommendations</div>
                      <div className="text-sm text-[#6C757D] whitespace-pre-line">{zone.recommendations}</div>
                    </div>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="floor-plan">
            <AccordionTrigger className="px-4">Floor Plan Analysis</AccordionTrigger>
            <AccordionContent className="px-4">
              <Card className="p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <StatTile label="Layout Score" value="78/100" />
                  <StatTile label="Energy Flow" value="Moderate with some blockages" />
                </div>
              </Card>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="image-details">
            <AccordionTrigger className="px-4">Image Analysis Details</AccordionTrigger>
            <AccordionContent className="px-4">
              <div className="space-y-4">
                <InfoCard title="Floor Plan Layout" items={[
                  { k: "Description", v: "Main floor plan showing room layout and door positions" },
                  { k: "Measurements", v: "Plot: 30' × 40', Built-up: 950 sq ft" },
                  { k: "Orientation", v: "North-facing property with accurate directional alignment" },
                ]} bullets={[
                  "Main entrance clearly visible in north wall",
                  "Kitchen positioned in south-east corner",
                  "Master bedroom in south-west zone",
                  "Staircase located in central area",
                  "Bathrooms positioned in north-east and west zones",
                ]} />

                <InfoCard title="Site Plan" items={[
                  { k: "Description", v: "Property plot layout with surrounding areas" },
                  { k: "Measurements", v: "Plot Area: 1200 sq ft, Road Width: 40 ft" },
                  { k: "Orientation", v: "Optimal plot orientation with good road access" },
                ]} bullets={[
                  "Property located on corner plot",
                  "Main road access from north side",
                  "Open space available in north-east",
                  "Neighboring buildings on east and south sides",
                  "Sufficient setback maintained on all sides",
                ]} />

                <InfoCard title="Entrance View" items={[
                  { k: "Description", v: "Main entrance area and approach path" },
                  { k: "Measurements", v: "Door Size: 42\" × 84\", Pathway Width: 4 ft" },
                  { k: "Orientation", v: "Perfect north alignment with welcoming energy flow" },
                ]} bullets={[
                  "Main door faces magnetic north",
                  "Entrance pathway clear and unobstructed",
                  "Threshold stone present at entrance",
                  "Nameplate positioned on east side of door",
                  "Natural light illuminates entrance area",
                ]} />

                <InfoCard title="Interior Layout" items={[
                  { k: "Description", v: "Internal room arrangement and furniture placement" },
                  { k: "Measurements", v: "Room Heights: 10 ft, Door Width: 36\"" },
                  { k: "Orientation", v: "Well-planned interior with positive energy circulation" },
                ]} bullets={[
                  "Bedroom doors open clockwise",
                  "Kitchen platform faces east",
                  "Dining area in east zone",
                  "Study room in north-east corner",
                  "Heavy furniture in south-west",
                ]} />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="image-table">
            <AccordionTrigger className="px-4">Image Analysis Table</AccordionTrigger>
            <AccordionContent className="px-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-[#421034] text-white">
                      <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                      <th className="border border-gray-300 px-4 py-2 text-center">Vaastu Score (10)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Main Gate/Entrance", 3],
                      ["Kitchen", 9],
                      ["Living Room", 8],
                      ["Family Room", 9],
                      ["Dining Room", 4],
                      ["Master Bedroom", 5],
                      ["Bedroom #2", 4],
                      ["Bedroom #3", 4],
                      ["Master Bathroom", 6],
                      ["Staircase", 7],
                      ["Bathroom #2", 7],
                      ["Bathroom #3", 5],
                      ["Brahmasthan", 9],
                      ["Garage", 5],
                      ["Position of House", 10],
                      ["More Space in NE", 9],
                    ].map(([name, score], i) => (
                      <tr key={i} className={Number(score) >= 8 ? "bg-green-100" : Number(score) >= 5 ? "bg-orange-100" : "bg-red-100"}>
                        <td className="border border-gray-300 px-4 py-2">{name as string}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">{score as number}</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-200 font-bold">
                      <td className="border border-gray-300 px-4 py-2">TOTAL</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">104 / 160 (65%)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="legend">
            <AccordionTrigger className="px-4">Analysis Legend</AccordionTrigger>
            <AccordionContent className="px-4">
              <Card className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <LegendItem color="bg-green-600" icon="check_circle" title="Compliant Zones" text="Areas following Vastu principles" />
                  <LegendItem color="bg-amber-600" icon="warning" title="Needs Attention" text="Minor adjustments recommended" />
                  <LegendItem color="bg-red-600" icon="error" title="Issues Identified" text="Major corrections needed" />
                </div>
                <div className="mt-6 p-4 bg-[#F7F7F7] rounded-md text-sm text-[#212529]">
                  <strong>Note:</strong> This analysis is based on traditional Vastu Shastra principles combined with modern architectural considerations. For personalized recommendations, consult with our certified Vastu experts.
                </div>
              </Card>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Call to Action */}
        <Card className="p-8 bg-gradient-to-r from-[#421034] to-[#E5B13A] text-white">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold mb-2">Book a Consultation → $499</div>
            <div className="text-base sm:text-lg mb-4">General guidance only, consult our Vaastu professional for in-depth solutions.</div>
            <Button onClick={() => setIsBookingDialogOpen(true)} className="bg-[#E5B13A] hover:bg-[#E5B13A]/90 text-[#421034] font-semibold px-6">
              <span className="material-icons-outlined text-[18px] mr-2">event_available</span>
              Book Now
            </Button>
          </div>
        </Card>
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
                <Input id="name" value={bookingForm.name} onChange={(e) => setBookingForm((p) => ({ ...p, name: e.target.value }))} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={bookingForm.email} onChange={(e) => setBookingForm((p) => ({ ...p, email: e.target.value }))} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" value={bookingForm.phone} onChange={(e) => setBookingForm((p) => ({ ...p, phone: e.target.value }))} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="preferredDate">Preferred Date</Label>
                <Input id="preferredDate" type="date" value={bookingForm.preferredDate} onChange={(e) => setBookingForm((p) => ({ ...p, preferredDate: e.target.value }))} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredTime">Preferred Time</Label>
                <Input id="preferredTime" type="time" value={bookingForm.preferredTime} onChange={(e) => setBookingForm((p) => ({ ...p, preferredTime: e.target.value }))} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea id="message" rows={3} value={bookingForm.message} onChange={(e) => setBookingForm((p) => ({ ...p, message: e.target.value }))} placeholder="Any specific questions or concerns you'd like to discuss..." />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => setIsBookingDialogOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-[#421034] hover:bg-[#421034]/90">Book Consultation</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-md bg-[#FAFAFA]">
      <span className="material-icons-outlined text-[20px] text-[#7C2C66]" aria-hidden>{icon}</span>
      <div>
        <div className="text-xs text-[#6C757D]">{label}</div>
        <div className="text-sm text-[#212529]">{value}</div>
      </div>
    </div>
  );
}

function ActionRow({ color, icon, text }: { color: string; icon: string; text: string }) {
  return (
    <div className="flex items-center p-3 rounded-md bg-[#FAFAFA]">
      <span className={`material-icons-outlined text-[20px] mr-3 ${color}`} aria-hidden>{icon}</span>
      <span className="text-sm text-[#212529]">{text}</span>
    </div>
  );
}

function Bullet({ title, text }: { title: string; text: string }) {
  return (
    <div className="p-4 rounded-md bg-[#F7F7F7]">
      <div className="text-sm text-[#212529] mb-1">{title}:</div>
      <div className="text-sm text-[#6C757D]">{text}</div>
    </div>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 rounded-md bg-[#FAFAFA] text-center">
      <div className="text-xs text-[#6C757D] mb-1">{label}</div>
      <div className="text-lg text-[#212529]">{value}</div>
    </div>
  );
}

function InfoCard({ title, items, bullets }: { title: string; items: { k: string; v: string }[]; bullets: string[] }) {
  return (
    <Card className="p-5">
      <div className="text-[#421034] text-lg font-medium mb-3">{title}</div>
      <div className="space-y-2 text-sm text-[#212529]">
        {items.map((it, i) => (
          <div key={i} className="flex gap-2"><strong>{it.k}:</strong><span className="text-[#6C757D]">{it.v}</span></div>
        ))}
      </div>
      <div className="mt-3">
        <div className="text-sm font-medium text-[#212529] mb-1">Key Observations:</div>
        <ul className="list-disc pl-5 text-sm text-[#6C757D] space-y-1">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

function LegendItem({ color, icon, title, text }: { color: string; icon: string; title: string; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 ${color} rounded-full flex items-center justify-center text-white`}>
        <span className="material-icons-outlined text-[18px]" aria-hidden>{icon}</span>
      </div>
      <div>
        <div className="text-sm font-semibold text-[#212529]">{title}</div>
        <div className="text-xs text-[#6C757D]">{text}</div>
      </div>
    </div>
  );
}
