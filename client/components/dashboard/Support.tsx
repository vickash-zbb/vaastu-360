import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { HelpCircle, MessageSquare, Phone, Mail, Clock, CheckCircle, AlertCircle, Send } from "lucide-react";

interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  createdDate: string;
  lastUpdate: string;
  description: string;
}

const mockTickets: SupportTicket[] = [
  {
    id: "T001",
    subject: "Floor plan analysis taking too long",
    category: "Technical Issue",
    status: "in-progress",
    priority: "medium",
    createdDate: "2024-09-01",
    lastUpdate: "2024-09-02",
    description: "The analysis of my uploaded floor plan is taking longer than expected..."
  },
  {
    id: "T002",
    subject: "Incorrect Vastu recommendations",
    category: "Report Issue",
    status: "resolved",
    priority: "high",
    createdDate: "2024-08-28",
    lastUpdate: "2024-08-30",
    description: "The generated report seems to have incorrect directional recommendations..."
  }
];

const faqData = [
  {
    question: "How do I upload a floor plan for analysis?",
    answer: "Navigate to the Floor Plans section in your dashboard. Click the 'Upload Floor Plan' button and select your image file. Supported formats include JPG, PNG, and PDF."
  },
  {
    question: "What does the energy flow map show?",
    answer: "The energy flow map visualizes the distribution of positive and negative energies across different zones of your property according to Vastu principles."
  },
  {
    question: "How accurate are the Vastu compliance reports?",
    answer: "Our reports are generated using traditional Vastu principles combined with modern analysis techniques. However, we recommend consulting with certified Vastu experts for critical decisions."
  },
  {
    question: "Can I export my analysis reports?",
    answer: "Yes, you can export all reports in PDF format from the respective sections. Premium users also have access to detailed Excel reports."
  },
  {
    question: "What should I do if I find an error in my report?",
    answer: "Please contact our support team through the ticket system below. Include your report ID and specific details about the issue for faster resolution."
  }
];

const statusColors = {
  open: "bg-blue-100 text-blue-800",
  "in-progress": "bg-yellow-100 text-yellow-800",
  resolved: "bg-green-100 text-green-800",
  closed: "bg-gray-100 text-gray-800"
};

const priorityColors = {
  low: "bg-gray-100 text-gray-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-orange-100 text-orange-800",
  urgent: "bg-red-100 text-red-800"
};

export default function Support() {
  const [activeTab, setActiveTab] = useState<"faq" | "tickets" | "contact">("faq");
  const [newTicket, setNewTicket] = useState({
    subject: "",
    category: "",
    priority: "",
    description: ""
  });

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!newTicket.subject || !newTicket.category || !newTicket.priority || !newTicket.description) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful ticket submission
      alert("Support ticket submitted successfully! We'll respond within 24 hours.");

      // Reset form
      setNewTicket({
        subject: "",
        category: "",
        priority: "",
        description: ""
      });
    } catch (error) {
      alert("Failed to submit ticket. Please try again.");
    }
  };

  const handleViewDocumentation = () => {
    // Open documentation in new tab
    window.open('/docs', '_blank');
  };

  const handleLiveChat = () => {
    // Initialize live chat widget
    alert("Live chat feature would be implemented here. For now, please use the support ticket system.");
  };

  const handleScheduleCall = () => {
    // Navigate to scheduling page or open modal
    alert("Call scheduling feature would be implemented here. Please use the support ticket system for now.");
  };

  const handleSendFeedback = () => {
    // Open feedback modal or navigate to feedback page
    alert("Feedback form would be implemented here. Please use the support ticket system for now.");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Support Center</h2>
          <p className="text-muted-foreground">
            Get help with your Vastu analysis and technical support
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        <Button
          variant={activeTab === "faq" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("faq")}
          className="flex-1"
        >
          <HelpCircle className="mr-2 h-4 w-4" />
          FAQ
        </Button>
        <Button
          variant={activeTab === "tickets" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("tickets")}
          className="flex-1"
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Support Tickets
        </Button>
        <Button
          variant={activeTab === "contact" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("contact")}
          className="flex-1"
        >
          <Mail className="mr-2 h-4 w-4" />
          Contact Us
        </Button>
      </div>

      {/* FAQ Section */}
      {activeTab === "faq" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
            <CardDescription>
              Find answers to common questions about our Vastu analysis platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )}

      {/* Support Tickets Section */}
      {activeTab === "tickets" && (
        <div className="space-y-6">
          {/* Existing Tickets */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Support Tickets</CardTitle>
              <CardDescription>
                Track the status of your support requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTickets.map((ticket) => (
                  <div key={ticket.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{ticket.subject}</h4>
                        <p className="text-sm text-muted-foreground">{ticket.category}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Badge className={statusColors[ticket.status]}>
                          {ticket.status.replace("-", " ")}
                        </Badge>
                        <Badge className={priorityColors[ticket.priority]}>
                          {ticket.priority}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {ticket.description.substring(0, 100)}...
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Created: {ticket.createdDate}</span>
                      <span>Last update: {ticket.lastUpdate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* New Ticket Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Create New Support Ticket</CardTitle>
              <CardDescription>
                Submit a new support request for assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitTicket} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Brief description of your issue"
                      value={newTicket.subject}
                      onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={newTicket.category} onValueChange={(value) => setNewTicket({...newTicket, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical Issue</SelectItem>
                        <SelectItem value="report">Report Issue</SelectItem>
                        <SelectItem value="billing">Billing</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={newTicket.priority} onValueChange={(value) => setNewTicket({...newTicket, priority: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide detailed information about your issue..."
                    rows={4}
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Submit Ticket
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Contact Section */}
      {activeTab === "contact" && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
              <CardDescription>
                Get in touch with our support team
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Phone Support</p>
                  <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Email Support</p>
                  <p className="text-sm text-muted-foreground">support@vastuanalyzer.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Business Hours</p>
                  <p className="text-sm text-muted-foreground">Mon-Fri: 9AM-6PM EST</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <CardDescription>
                Common support actions and resources
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start" onClick={handleViewDocumentation}>
                <HelpCircle className="mr-2 h-4 w-4" />
                View Documentation
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={handleLiveChat}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Live Chat Support
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={handleScheduleCall}>
                <Phone className="mr-2 h-4 w-4" />
                Schedule Call
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={handleSendFeedback}>
                <Mail className="mr-2 h-4 w-4" />
                Send Feedback
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Response Time Alert */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Response Time:</strong> We typically respond to support tickets within 24 hours.
          Urgent issues are prioritized and may receive faster responses.
        </AlertDescription>
      </Alert>
    </div>
  );
}