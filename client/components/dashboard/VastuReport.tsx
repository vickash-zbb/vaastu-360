import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, AlertTriangle, Download, Eye } from "lucide-react";

interface VastuReport {
  id: string;
  propertyName: string;
  floorPlan: string;
  overallScore: number;
  generatedDate: string;
  status: "compliant" | "partial" | "non-compliant";
  recommendations: string[];
  issues: Array<{
    category: string;
    severity: "high" | "medium" | "low";
    description: string;
    suggestion: string;
  }>;
}

const mockReports: VastuReport[] = [
  {
    id: "1",
    propertyName: "Sunset Villa",
    floorPlan: "Ground Floor Plan",
    overallScore: 85,
    generatedDate: "2024-09-01",
    status: "compliant",
    recommendations: [
      "Consider adding water element in the northeast corner",
      "Main entrance alignment is optimal"
    ],
    issues: [
      {
        category: "Direction",
        severity: "low",
        description: "Minor misalignment in bedroom orientation",
        suggestion: "Adjust bed position to align with magnetic north"
      }
    ]
  },
  {
    id: "2",
    propertyName: "Riverside Apartments",
    floorPlan: "Master Plan",
    overallScore: 45,
    generatedDate: "2024-08-28",
    status: "non-compliant",
    recommendations: [
      "Major restructuring required for Vastu compliance",
      "Consider professional Vastu consultant"
    ],
    issues: [
      {
        category: "Structure",
        severity: "high",
        description: "Main entrance faces negative direction",
        suggestion: "Relocate main entrance to northeast or east"
      },
      {
        category: "Elements",
        severity: "high",
        description: "Fire element dominates water element placement",
        suggestion: "Balance elements according to Vastu principles"
      },
      {
        category: "Rooms",
        severity: "medium",
        description: "Master bedroom in southwest corner",
        suggestion: "Consider relocating master bedroom to southwest"
      }
    ]
  }
];

const statusConfig = {
  compliant: { color: "bg-green-100 text-green-800", icon: CheckCircle },
  partial: { color: "bg-yellow-100 text-yellow-800", icon: AlertTriangle },
  "non-compliant": { color: "bg-red-100 text-red-800", icon: XCircle }
};

const severityColors = {
  high: "text-red-600",
  medium: "text-yellow-600",
  low: "text-green-600"
};

export default function VastuReport() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Vastu Compliance Reports</h2>
          <p className="text-muted-foreground">
            Detailed analysis of property Vastu compliance and recommendations
          </p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export All Reports
        </Button>
      </div>

      <div className="grid gap-6">
        {mockReports.map((report) => {
          const statusInfo = statusConfig[report.status];
          const StatusIcon = statusInfo.icon;

          return (
            <Card key={report.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{report.propertyName}</CardTitle>
                    <CardDescription>{report.floorPlan}</CardDescription>
                  </div>
                  <Badge className={statusInfo.color}>
                    <StatusIcon className="mr-1 h-3 w-3" />
                    {report.status.replace("-", " ")}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Overall Vastu Score</span>
                    <span className="font-semibold">{report.overallScore}/100</span>
                  </div>
                  <Progress value={report.overallScore} className="h-2" />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold mb-3">Issues Found</h4>
                    <div className="space-y-3">
                      {report.issues.map((issue, index) => (
                        <Alert key={index}>
                          <AlertTriangle className={`h-4 w-4 ${severityColors[issue.severity]}`} />
                          <AlertDescription>
                            <div className="font-medium">{issue.category}</div>
                            <div className="text-sm mt-1">{issue.description}</div>
                            <div className="text-sm text-muted-foreground mt-1">
                              <strong>Suggestion:</strong> {issue.suggestion}
                            </div>
                          </AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Recommendations</h4>
                    <ul className="space-y-2">
                      {report.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-sm text-muted-foreground">
                    Generated on {report.generatedDate}
                  </span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-1 h-3 w-3" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-1 h-3 w-3" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {mockReports.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Reports Available</h3>
            <p className="text-muted-foreground text-center mb-4">
              Upload floor plans to generate Vastu compliance reports
            </p>
            <Button>Upload Floor Plan</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
