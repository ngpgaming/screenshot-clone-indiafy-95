import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from "recharts";
import { TrendingUp, TrendingDown, Users, Eye, MousePointer, DollarSign, Target, Download, Share2, RefreshCw, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";

interface AdDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: {
    id: string;
    name: string;
    active: boolean;
    delivery: string;
    actions: string;
    bid_strategy: string;
    budget: string;
    amount_spent: string;
    reach: string;
    impressions: string;
    cost_per_result: string;
  };
}

const AdDetailsModal = ({ isOpen, onClose, campaign }: AdDetailsModalProps) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");
  const [isLiveData, setIsLiveData] = useState(false);

  // Performance data
  const performanceData = [
    { day: "Mon", clicks: 145, impressions: 1520, cost: 12.5, conversions: 8, ctr: 9.5, cpc: 1.56 },
    { day: "Tue", clicks: 162, impressions: 1840, cost: 18.2, conversions: 12, ctr: 8.8, cpc: 1.12 },
    { day: "Wed", clicks: 138, impressions: 1295, cost: 15.8, conversions: 6, ctr: 10.7, cpc: 2.63 },
    { day: "Thu", clicks: 185, impressions: 2180, cost: 24.1, conversions: 15, ctr: 8.5, cpc: 1.61 },
    { day: "Fri", clicks: 198, impressions: 2365, cost: 28.7, conversions: 18, ctr: 8.4, cpc: 1.59 },
    { day: "Sat", clicks: 172, impressions: 2100, cost: 34.8, conversions: 22, ctr: 8.2, cpc: 1.58 },
    { day: "Sun", clicks: 141, impressions: 1810, cost: 23.3, conversions: 11, ctr: 7.8, cpc: 2.12 },
  ];

  // Audience segmentation data
  const audienceSegments = [
    { segment: "Gaming Enthusiasts", users: 35, revenue: 2840, engagement: 8.5, color: "#8884d8" },
    { segment: "Casual Players", users: 28, revenue: 1960, engagement: 6.2, color: "#82ca9d" },
    { segment: "High Spenders", users: 15, revenue: 4200, engagement: 9.8, color: "#ffc658" },
    { segment: "Mobile Users", users: 22, revenue: 1580, engagement: 5.9, color: "#ff7300" },
  ];

  // Device performance comparison
  const devicePerformance = [
    { device: "Mobile", users: 65, sessions: 2840, revenue: 4200, avgSession: "3m 24s", bounceRate: 32 },
    { device: "Desktop", users: 25, sessions: 980, revenue: 2800, avgSession: "5m 12s", bounceRate: 28 },
    { device: "Tablet", users: 10, sessions: 420, revenue: 980, avgSession: "4m 08s", bounceRate: 35 },
  ];

  // Funnel conversion data
  const conversionFunnel = [
    { stage: "Impressions", count: 12500, rate: 100 },
    { stage: "Clicks", count: 1041, rate: 8.3 },
    { stage: "Landing Page Views", count: 892, rate: 7.1 },
    { stage: "Sign-ups", count: 178, rate: 1.4 },
    { stage: "Purchases", count: 89, rate: 0.7 },
  ];

  // Competitor analysis
  const competitorData = [
    { metric: "CTR", ourCampaign: 8.5, competitor1: 6.2, competitor2: 7.1, industry: 5.8 },
    { metric: "CPC", ourCampaign: 1.65, competitor1: 2.1, competitor2: 1.9, industry: 2.3 },
    { metric: "Conversion Rate", ourCampaign: 2.8, competitor1: 2.1, competitor2: 2.4, industry: 1.9 },
    { metric: "ROAS", ourCampaign: 4.2, competitor1: 3.1, competitor2: 3.6, industry: 2.8 },
  ];

  // A/B test data
  const abTestData = [
    { variant: "Original", impressions: 6250, clicks: 520, conversions: 44, ctr: 8.3, cr: 8.5 },
    { variant: "Variant A", impressions: 6250, clicks: 521, conversions: 45, ctr: 8.3, cr: 8.6 },
  ];

  const chartConfig = {
    clicks: { label: "Clicks", color: "#8884d8" },
    impressions: { label: "Impressions", color: "#82ca9d" },
    cost: { label: "Cost", color: "#ffc658" },
    conversions: { label: "Conversions", color: "#ff7300" },
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-facebook-blue flex items-center gap-2">
                {campaign.name} - Advanced Analytics Dashboard
                <Badge variant={campaign.active ? "default" : "secondary"} className="ml-2">
                  {campaign.active ? "Live" : "Paused"}
                </Badge>
              </DialogTitle>
              <DialogDescription className="text-lg mt-2">
                Comprehensive performance insights and advanced analytics
              </DialogDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsLiveData(!isLiveData)}
                className={isLiveData ? "bg-green-100 text-green-700" : ""}
              >
                <RefreshCw className={`h-4 w-4 mr-1 ${isLiveData ? 'animate-spin' : ''}`} />
                {isLiveData ? "Live" : "Static"}
              </Button>
              <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1d">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="campaign-details" className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="campaign-details">Campaign Details</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="conversion">Conversion</TabsTrigger>
            <TabsTrigger value="competitor">Competitor</TabsTrigger>
            <TabsTrigger value="testing">A/B Testing</TabsTrigger>
          </TabsList>

          <TabsContent value="campaign-details" className="space-y-6">
            {/* Key Performance Metrics Cards */}
            <div className="grid grid-cols-5 gap-4 mb-6">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600 font-medium">Total Reach</p>
                      <p className="text-2xl font-bold text-blue-700">{campaign.reach}</p>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +12.5% vs last week
                      </p>
                      <p className="text-xs text-gray-500">Peak: 89K at 8PM</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600 font-medium">Impressions</p>
                      <p className="text-2xl font-bold text-green-700">{campaign.impressions}</p>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +8.3% vs last week
                      </p>
                      <p className="text-xs text-gray-500">Avg: 64K daily</p>
                    </div>
                    <Eye className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-600 font-medium">Total Clicks</p>
                      <p className="text-2xl font-bold text-purple-700">{campaign.actions}</p>
                      <p className="text-xs text-red-600 flex items-center mt-1">
                        <TrendingDown className="h-3 w-3 mr-1" />
                        -2.1% vs last week
                      </p>
                      <p className="text-xs text-gray-500">CTR: 8.5%</p>
                    </div>
                    <MousePointer className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-orange-600 font-medium">Cost Per Click</p>
                      <p className="text-2xl font-bold text-orange-700">{campaign.cost_per_result}</p>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +5.2% efficiency
                      </p>
                      <p className="text-xs text-gray-500">Target: ₹1.50</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-red-600 font-medium">ROAS</p>
                      <p className="text-2xl font-bold text-red-700">4.2x</p>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +15.8% vs target
                      </p>
                      <p className="text-xs text-gray-500">Revenue: ₹3.2L</p>
                    </div>
                    <Target className="h-8 w-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Campaign Configuration Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-facebook-blue">Campaign Information</CardTitle>
                  <CardDescription>Basic campaign configuration and settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Campaign ID</label>
                      <div className="text-base font-semibold">{campaign.id}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Status</label>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${campaign.active ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className={`text-base font-semibold ${campaign.active ? 'text-green-600' : 'text-red-600'}`}>
                          {campaign.active ? 'Active' : 'Paused'}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Campaign Name</label>
                      <div className="text-base font-semibold">{campaign.name}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Delivery Status</label>
                      <div className="text-base">{campaign.delivery}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Campaign Type</label>
                      <div className="text-base">Awareness & Traffic</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Objective</label>
                      <div className="text-base">Brand Awareness</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Created Date</label>
                      <div className="text-base">2 August 2025</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Start Date</label>
                      <div className="text-base">2 August 2025</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-facebook-blue">Budget & Bidding</CardTitle>
                  <CardDescription>Financial configuration and strategy</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Budget Type</label>
                      <div className="text-base">Daily Budget</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Budget</label>
                      <div className="text-lg font-bold text-green-600">{campaign.budget}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Amount Spent</label>
                      <div className="text-lg font-bold text-orange-600">{campaign.amount_spent}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Remaining Budget</label>
                      <div className="text-lg font-bold text-blue-600">₹{(parseFloat(campaign.budget.replace(/[₹,]/g, '')) - parseFloat(campaign.amount_spent.replace(/[₹,]/g, ''))).toLocaleString()}</div>
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium text-gray-600">Bid Strategy</label>
                      <div className="text-base">{campaign.bid_strategy}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Bid Amount</label>
                      <div className="text-base">₹2.50</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Attribution Window</label>
                      <div className="text-base">7-day click, 1-day view</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Targeting & Audience Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-facebook-blue">Audience Targeting</CardTitle>
                  <CardDescription>Target audience configuration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Age Range</label>
                      <div className="text-base">18-65</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Gender</label>
                      <div className="text-base">All</div>
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium text-gray-600">Locations</label>
                      <div className="text-base">India, Mumbai, Delhi, Bangalore</div>
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium text-gray-600">Languages</label>
                      <div className="text-base">English, Hindi</div>
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium text-gray-600">Interests</label>
                      <div className="text-base">Gaming, Mobile Games, Casino Games</div>
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium text-gray-600">Behaviors</label>
                      <div className="text-base">Mobile game players, Frequent travelers</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-facebook-blue">Ad Placement</CardTitle>
                  <CardDescription>Placement and device targeting</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Placement Type</label>
                      <div className="text-base">Automatic Placements</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Device Types</label>
                      <div className="text-base">All Devices</div>
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium text-gray-600">Platforms</label>
                      <div className="text-base">Facebook, Instagram, Messenger, Audience Network</div>
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium text-gray-600">Ad Formats</label>
                      <div className="text-base">Single Image, Carousel, Video</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Operating Systems</label>
                      <div className="text-base">iOS, Android</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Network</label>
                      <div className="text-base">WiFi & Cellular</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Multi-Metric Performance</CardTitle>
                  <CardDescription>Comprehensive view of all key metrics over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="clicks" stroke="#8884d8" name="Clicks" />
                        <Line type="monotone" dataKey="impressions" stroke="#82ca9d" name="Impressions" />
                        <Line type="monotone" dataKey="conversions" stroke="#ff7300" name="Conversions" />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue & Cost Analysis</CardTitle>
                  <CardDescription>Financial performance breakdown with profitability trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area type="monotone" dataKey="cost" stackId="1" stroke="#ffc658" fill="#ffc658" name="Cost" />
                        <Area type="monotone" dataKey="conversions" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Revenue" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="audience" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Audience Segments</CardTitle>
                  <CardDescription>Breakdown of audience by demographics and behavior</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={audienceSegments}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="users"
                          label={({ segment, users }) => `${segment}: ${users}%`}
                        >
                          {audienceSegments.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Device Performance</CardTitle>
                  <CardDescription>Performance comparison across different devices</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {devicePerformance.map((device, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold">{device.device}</h4>
                          <Badge variant="outline">{device.users}% users</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Sessions:</span> {device.sessions}
                          </div>
                          <div>
                            <span className="text-gray-600">Revenue:</span> ₹{device.revenue}
                          </div>
                          <div>
                            <span className="text-gray-600">Avg Session:</span> {device.avgSession}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Daily performance metrics and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="clicks" fill="#8884d8" name="Clicks" />
                      <Bar dataKey="conversions" fill="#ff7300" name="Conversions" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conversion" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Conversion Funnel</CardTitle>
                <CardDescription>Step-by-step conversion analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conversionFunnel.map((stage, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">{stage.stage}</h4>
                        <div className="text-right">
                          <div className="text-lg font-bold">{stage.count.toLocaleString()}</div>
                          <div className="text-sm text-gray-600">{stage.rate}%</div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${stage.rate}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="competitor" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Competitive Analysis</CardTitle>
                <CardDescription>How your campaign performs against competitors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {competitorData.map((metric, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">{metric.metric}</h4>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">{metric.ourCampaign}</div>
                          <div className="text-gray-600">Our Campaign</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold">{metric.competitor1}</div>
                          <div className="text-gray-600">Competitor 1</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold">{metric.competitor2}</div>
                          <div className="text-gray-600">Competitor 2</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold">{metric.industry}</div>
                          <div className="text-gray-600">Industry Avg</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>A/B Test Results</CardTitle>
                <CardDescription>Performance comparison between ad variants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {abTestData.map((variant, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-4">{variant.variant}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Impressions:</span>
                          <span className="font-semibold">{variant.impressions.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Clicks:</span>
                          <span className="font-semibold">{variant.clicks}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Conversions:</span>
                          <span className="font-semibold">{variant.conversions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">CTR:</span>
                          <span className="font-semibold">{variant.ctr}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Conversion Rate:</span>
                          <span className="font-semibold">{variant.cr}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AdDetailsModal;