import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, TrendingUp, Users, DollarSign, Eye, MousePointer, Clock, Target, Smartphone, Globe, Heart, Share, MessageCircle, Calendar, Filter, Download, RefreshCw, Info } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from "recharts";
import { useCampaigns } from "@/hooks/useCampaigns";

interface ReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignsData: ReturnType<typeof useCampaigns>;
}

const ReportsModal = ({ isOpen, onClose, campaignsData }: ReportsModalProps) => {
  const { campaigns } = campaignsData;
  
  // Calculate comprehensive analytics data
  const totalSpent = campaigns.reduce((sum, campaign) => {
    const spent = parseFloat(campaign.amount_spent.replace(/[₹,]/g, ''));
    return sum + spent;
  }, 0);

  const totalBudget = campaigns.reduce((sum, campaign) => {
    const budget = parseFloat(campaign.budget.replace(/[₹,]/g, ''));
    return sum + budget;
  }, 0);

  const totalReach = campaigns.reduce((sum, campaign) => {
    const reach = parseInt(campaign.reach.replace(/,/g, ''));
    return sum + reach;
  }, 0);

  const totalImpressions = campaigns.reduce((sum, campaign) => {
    const impressions = parseInt(campaign.impressions.replace(/,/g, ''));
    return sum + impressions;
  }, 0);

  const activeCampaigns = campaigns.filter(c => c.active);
  const averageCtr = totalImpressions > 0 ? ((totalReach / totalImpressions) * 100).toFixed(2) : '0.00';
  const costPerClick = totalReach > 0 ? (totalSpent / totalReach).toFixed(2) : '0.00';
  const frequency = totalReach > 0 ? (totalImpressions / totalReach).toFixed(2) : '0.00';
  const costPer1000Impressions = totalImpressions > 0 ? ((totalSpent / totalImpressions) * 1000).toFixed(2) : '0.00';
  const budgetUtilization = totalBudget > 0 ? ((totalSpent / totalBudget) * 100).toFixed(1) : '0.0';

  // Advanced metrics
  const estimatedClicks = Math.round(totalImpressions * (parseFloat(averageCtr) / 100));
  const costPerThousandReach = totalReach > 0 ? ((totalSpent / totalReach) * 1000).toFixed(2) : '0.00';
  const reachRate = totalReach > 0 ? ((totalReach / 1000000) * 100).toFixed(3) : '0.000'; // Assuming 1M potential audience

  // Performance trend data (simulated based on campaign data)
  const performanceData = [
    { date: '1 Aug', impressions: Math.round(totalImpressions * 0.8), reach: Math.round(totalReach * 0.75), spent: Math.round(totalSpent * 0.7), clicks: Math.round(estimatedClicks * 0.8) },
    { date: '2 Aug', impressions: Math.round(totalImpressions * 0.9), reach: Math.round(totalReach * 0.85), spent: Math.round(totalSpent * 0.85), clicks: Math.round(estimatedClicks * 0.9) },
    { date: '3 Aug', impressions: totalImpressions, reach: totalReach, spent: totalSpent, clicks: estimatedClicks },
  ];

  // Device breakdown data (simulated)
  const deviceData = [
    { device: 'Mobile', percentage: 75, reach: Math.round(totalReach * 0.75), spent: Math.round(totalSpent * 0.75) },
    { device: 'Desktop', percentage: 20, reach: Math.round(totalReach * 0.20), spent: Math.round(totalSpent * 0.20) },
    { device: 'Tablet', percentage: 5, reach: Math.round(totalReach * 0.05), spent: Math.round(totalSpent * 0.05) },
  ];

  // Age and gender breakdown (simulated)
  const demographicData = [
    { age: '18-24', male: 25, female: 30 },
    { age: '25-34', male: 35, female: 40 },
    { age: '35-44', male: 20, female: 25 },
    { age: '45-54', male: 15, female: 18 },
    { age: '55+', male: 5, female: 7 },
  ];

  // Geographic data (simulated)
  const geoData = [
    { location: 'Mumbai', reach: Math.round(totalReach * 0.30), spent: Math.round(totalSpent * 0.35), ctr: '2.8%' },
    { location: 'Delhi', reach: Math.round(totalReach * 0.25), spent: Math.round(totalSpent * 0.25), ctr: '2.5%' },
    { location: 'Bangalore', reach: Math.round(totalReach * 0.20), spent: Math.round(totalSpent * 0.20), ctr: '3.1%' },
    { location: 'Chennai', reach: Math.round(totalReach * 0.15), spent: Math.round(totalSpent * 0.12), ctr: '2.3%' },
    { location: 'Others', reach: Math.round(totalReach * 0.10), spent: Math.round(totalSpent * 0.08), ctr: '2.0%' },
  ];

  // Engagement metrics (simulated)
  const engagementData = [
    { metric: 'Likes', count: Math.round(estimatedClicks * 0.8), change: '+12%' },
    { metric: 'Comments', count: Math.round(estimatedClicks * 0.2), change: '+8%' },
    { metric: 'Shares', count: Math.round(estimatedClicks * 0.1), change: '+15%' },
    { metric: 'Saves', count: Math.round(estimatedClicks * 0.05), change: '+25%' },
  ];

  // Funnel data
  const funnelData = [
    { stage: 'Impressions', value: totalImpressions, percentage: 100 },
    { stage: 'Unique Reach', value: totalReach, percentage: ((totalReach / totalImpressions) * 100).toFixed(1) },
    { stage: 'Clicks', value: estimatedClicks, percentage: ((estimatedClicks / totalImpressions) * 100).toFixed(2) },
    { stage: 'Landing Page Views', value: Math.round(estimatedClicks * 0.85), percentage: ((estimatedClicks * 0.85 / totalImpressions) * 100).toFixed(2) },
    { stage: 'Add to Cart', value: Math.round(estimatedClicks * 0.12), percentage: ((estimatedClicks * 0.12 / totalImpressions) * 100).toFixed(2) },
    { stage: 'Purchase', value: Math.round(estimatedClicks * 0.03), percentage: ((estimatedClicks * 0.03 / totalImpressions) * 100).toFixed(2) },
  ];

  const chartConfig = {
    impressions: { label: "Impressions", color: "hsl(var(--facebook-blue))" },
    reach: { label: "Reach", color: "hsl(var(--success))" },
    spent: { label: "Amount Spent", color: "hsl(var(--warning))" },
    clicks: { label: "Clicks", color: "hsl(var(--error))" },
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-7xl max-h-[95vh] overflow-y-auto"
        style={{
          fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
          backgroundColor: 'white',
          border: '1px solid hsl(var(--border-light))'
        }}
      >
        <DialogHeader className="border-b pb-4" style={{ borderColor: 'hsl(var(--border-light))' }}>
          <div className="flex items-center justify-between">
            <DialogTitle 
              className="text-xl font-semibold flex items-center gap-2"
              style={{ 
                color: 'hsl(var(--text-primary))',
                fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: '20px',
                fontWeight: '600'
              }}
            >
              <BarChart3 className="w-5 h-5" style={{ color: 'hsl(var(--facebook-blue))' }} />
              Ads Manager - Campaign Analytics
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Select defaultValue="last30">
                <SelectTrigger 
                  className="w-40"
                  style={{
                    fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: '13px',
                    border: '1px solid hsl(var(--border-light))'
                  }}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last7">Last 7 days</SelectItem>
                  <SelectItem value="last30">Last 30 days</SelectItem>
                  <SelectItem value="last90">Last 90 days</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>
              <button
                style={{
                  padding: '6px 12px',
                  border: '1px solid hsl(var(--border-light))',
                  borderRadius: '6px',
                  backgroundColor: 'white',
                  color: 'hsl(var(--text-primary))',
                  fontSize: '13px',
                  fontWeight: '500'
                }}
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                style={{
                  padding: '6px 12px',
                  border: '1px solid hsl(var(--border-light))',
                  borderRadius: '6px',
                  backgroundColor: 'white',
                  color: 'hsl(var(--text-primary))',
                  fontSize: '13px',
                  fontWeight: '500'
                }}
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p 
            className="text-sm mt-2 flex items-center gap-2"
            style={{ 
              color: 'hsl(var(--text-secondary))',
              fontSize: '13px'
            }}
          >
            <Calendar className="w-4 h-4" />
            Reporting period: 3 June 2025 - 2 August 2025 • Last updated: {new Date().toLocaleTimeString('en-GB')}
          </p>
        </DialogHeader>

        <div className="py-4">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList 
              className="grid w-full grid-cols-6"
              style={{
                backgroundColor: 'hsl(var(--table-header))',
                border: '1px solid hsl(var(--border-light))'
              }}
            >
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="audience">Audience</TabsTrigger>
              <TabsTrigger value="placements">Placements</TabsTrigger>
              <TabsTrigger value="demographics">Demographics</TabsTrigger>
              <TabsTrigger value="conversion">Conversion</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              {/* Key Metrics Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <div 
                  className="p-3 rounded-lg border"
                  style={{ 
                    backgroundColor: 'hsl(var(--table-header))',
                    border: '1px solid hsl(var(--border-light))'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p 
                        className="text-xs font-medium"
                        style={{ 
                          color: 'hsl(var(--text-secondary))',
                          fontSize: '11px',
                          fontWeight: '600'
                        }}
                      >
                        Amount Spent
                      </p>
                      <p 
                        className="text-lg font-bold mt-1"
                        style={{ 
                          color: 'hsl(var(--text-primary))',
                          fontSize: '18px',
                          fontWeight: '700'
                        }}
                      >
                        ₹{totalSpent.toLocaleString()}
                      </p>
                    </div>
                    <DollarSign 
                      className="w-6 h-6"
                      style={{ color: 'hsl(var(--success))' }}
                    />
                  </div>
                </div>

                <div 
                  className="p-3 rounded-lg border"
                  style={{ 
                    backgroundColor: 'hsl(var(--table-header))',
                    border: '1px solid hsl(var(--border-light))'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p 
                        className="text-xs font-medium"
                        style={{ 
                          color: 'hsl(var(--text-secondary))',
                          fontSize: '11px',
                          fontWeight: '600'
                        }}
                      >
                        Reach
                      </p>
                      <p 
                        className="text-lg font-bold mt-1"
                        style={{ 
                          color: 'hsl(var(--text-primary))',
                          fontSize: '18px',
                          fontWeight: '700'
                        }}
                      >
                        {totalReach.toLocaleString()}
                      </p>
                    </div>
                    <Users 
                      className="w-6 h-6"
                      style={{ color: 'hsl(var(--facebook-blue))' }}
                    />
                  </div>
                </div>

                <div 
                  className="p-3 rounded-lg border"
                  style={{ 
                    backgroundColor: 'hsl(var(--table-header))',
                    border: '1px solid hsl(var(--border-light))'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p 
                        className="text-xs font-medium"
                        style={{ 
                          color: 'hsl(var(--text-secondary))',
                          fontSize: '11px',
                          fontWeight: '600'
                        }}
                      >
                        Impressions
                      </p>
                      <p 
                        className="text-lg font-bold mt-1"
                        style={{ 
                          color: 'hsl(var(--text-primary))',
                          fontSize: '18px',
                          fontWeight: '700'
                        }}
                      >
                        {totalImpressions.toLocaleString()}
                      </p>
                    </div>
                    <Eye 
                      className="w-6 h-6"
                      style={{ color: 'hsl(var(--warning))' }}
                    />
                  </div>
                </div>

                <div 
                  className="p-3 rounded-lg border"
                  style={{ 
                    backgroundColor: 'hsl(var(--table-header))',
                    border: '1px solid hsl(var(--border-light))'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p 
                        className="text-xs font-medium"
                        style={{ 
                          color: 'hsl(var(--text-secondary))',
                          fontSize: '11px',
                          fontWeight: '600'
                        }}
                      >
                        CTR
                      </p>
                      <p 
                        className="text-lg font-bold mt-1"
                        style={{ 
                          color: 'hsl(var(--text-primary))',
                          fontSize: '18px',
                          fontWeight: '700'
                        }}
                      >
                        {averageCtr}%
                      </p>
                    </div>
                    <MousePointer 
                      className="w-6 h-6"
                      style={{ color: 'hsl(var(--error))' }}
                    />
                  </div>
                </div>

                <div 
                  className="p-3 rounded-lg border"
                  style={{ 
                    backgroundColor: 'hsl(var(--table-header))',
                    border: '1px solid hsl(var(--border-light))'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p 
                        className="text-xs font-medium"
                        style={{ 
                          color: 'hsl(var(--text-secondary))',
                          fontSize: '11px',
                          fontWeight: '600'
                        }}
                      >
                        Frequency
                      </p>
                      <p 
                        className="text-lg font-bold mt-1"
                        style={{ 
                          color: 'hsl(var(--text-primary))',
                          fontSize: '18px',
                          fontWeight: '700'
                        }}
                      >
                        {frequency}
                      </p>
                    </div>
                    <Clock 
                      className="w-6 h-6"
                      style={{ color: 'hsl(var(--facebook-blue))' }}
                    />
                  </div>
                </div>

                <div 
                  className="p-3 rounded-lg border"
                  style={{ 
                    backgroundColor: 'hsl(var(--table-header))',
                    border: '1px solid hsl(var(--border-light))'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p 
                        className="text-xs font-medium"
                        style={{ 
                          color: 'hsl(var(--text-secondary))',
                          fontSize: '11px',
                          fontWeight: '600'
                        }}
                      >
                        CPM
                      </p>
                      <p 
                        className="text-lg font-bold mt-1"
                        style={{ 
                          color: 'hsl(var(--text-primary))',
                          fontSize: '18px',
                          fontWeight: '700'
                        }}
                      >
                        ₹{costPer1000Impressions}
                      </p>
                    </div>
                    <Target 
                      className="w-6 h-6"
                      style={{ color: 'hsl(var(--success))' }}
                    />
                  </div>
                </div>
              </div>

              {/* Performance Chart */}
              <div 
                className="border rounded-lg p-4"
                style={{ border: '1px solid hsl(var(--border-light))' }}
              >
                <h3 
                  className="text-lg font-semibold mb-4"
                  style={{ 
                    color: 'hsl(var(--text-primary))',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                >
                  Performance Trend
                </h3>
                <ChartContainer config={chartConfig} className="h-80">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border-light))" />
                    <XAxis dataKey="date" stroke="hsl(var(--text-secondary))" fontSize={12} />
                    <YAxis stroke="hsl(var(--text-secondary))" fontSize={12} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Line type="monotone" dataKey="impressions" stroke="var(--color-impressions)" strokeWidth={2} />
                    <Line type="monotone" dataKey="reach" stroke="var(--color-reach)" strokeWidth={2} />
                    <Line type="monotone" dataKey="clicks" stroke="var(--color-clicks)" strokeWidth={2} />
                  </LineChart>
                </ChartContainer>
              </div>

              {/* Budget Utilization */}
              <div 
                className="border rounded-lg p-4"
                style={{ border: '1px solid hsl(var(--border-light))' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 
                    className="text-lg font-semibold"
                    style={{ 
                      color: 'hsl(var(--text-primary))',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}
                  >
                    Budget Utilization
                  </h3>
                  <span 
                    className="text-sm"
                    style={{ color: 'hsl(var(--text-secondary))' }}
                  >
                    {budgetUtilization}% of total budget used
                  </span>
                </div>
                <div 
                  className="w-full bg-gray-200 rounded-full h-3"
                  style={{ backgroundColor: 'hsl(var(--border-light))' }}
                >
                  <div 
                    className="h-3 rounded-full"
                    style={{ 
                      width: `${budgetUtilization}%`,
                      backgroundColor: parseFloat(budgetUtilization) > 80 ? 'hsl(var(--error))' : 'hsl(var(--success))'
                    }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span style={{ color: 'hsl(var(--text-secondary))' }}>₹{totalSpent.toLocaleString()} spent</span>
                  <span style={{ color: 'hsl(var(--text-secondary))' }}>₹{totalBudget.toLocaleString()} budget</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6 mt-6">
              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div 
                  className="p-4 rounded-lg border"
                  style={{ 
                    backgroundColor: 'hsl(var(--table-header))',
                    border: '1px solid hsl(var(--border-light))'
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4" style={{ color: 'hsl(var(--success))' }} />
                    <span 
                      className="text-xs font-semibold"
                      style={{ color: 'hsl(var(--text-secondary))' }}
                    >
                      COST PER 1,000 REACHED
                    </span>
                  </div>
                  <p 
                    className="text-2xl font-bold"
                    style={{ color: 'hsl(var(--text-primary))' }}
                  >
                    ₹{costPerThousandReach}
                  </p>
                  <p 
                    className="text-xs mt-1"
                    style={{ color: 'hsl(var(--success))' }}
                  >
                    -8% vs last period
                  </p>
                </div>

                <div 
                  className="p-4 rounded-lg border"
                  style={{ 
                    backgroundColor: 'hsl(var(--table-header))',
                    border: '1px solid hsl(var(--border-light))'
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <MousePointer className="w-4 h-4" style={{ color: 'hsl(var(--facebook-blue))' }} />
                    <span 
                      className="text-xs font-semibold"
                      style={{ color: 'hsl(var(--text-secondary))' }}
                    >
                      LINK CLICKS
                    </span>
                  </div>
                  <p 
                    className="text-2xl font-bold"
                    style={{ color: 'hsl(var(--text-primary))' }}
                  >
                    {estimatedClicks.toLocaleString()}
                  </p>
                  <p 
                    className="text-xs mt-1"
                    style={{ color: 'hsl(var(--success))' }}
                  >
                    +15% vs last period
                  </p>
                </div>

                <div 
                  className="p-4 rounded-lg border"
                  style={{ 
                    backgroundColor: 'hsl(var(--table-header))',
                    border: '1px solid hsl(var(--border-light))'
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4" style={{ color: 'hsl(var(--warning))' }} />
                    <span 
                      className="text-xs font-semibold"
                      style={{ color: 'hsl(var(--text-secondary))' }}
                    >
                      REACH RATE
                    </span>
                  </div>
                  <p 
                    className="text-2xl font-bold"
                    style={{ color: 'hsl(var(--text-primary))' }}
                  >
                    {reachRate}%
                  </p>
                  <p 
                    className="text-xs mt-1"
                    style={{ color: 'hsl(var(--error))' }}
                  >
                    -2% vs last period
                  </p>
                </div>

                <div 
                  className="p-4 rounded-lg border"
                  style={{ 
                    backgroundColor: 'hsl(var(--table-header))',
                    border: '1px solid hsl(var(--border-light))'
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4" style={{ color: 'hsl(var(--success))' }} />
                    <span 
                      className="text-xs font-semibold"
                      style={{ color: 'hsl(var(--text-secondary))' }}
                    >
                      COST PER CLICK
                    </span>
                  </div>
                  <p 
                    className="text-2xl font-bold"
                    style={{ color: 'hsl(var(--text-primary))' }}
                  >
                    ₹{costPerClick}
                  </p>
                  <p 
                    className="text-xs mt-1"
                    style={{ color: 'hsl(var(--success))' }}
                  >
                    -12% vs last period
                  </p>
                </div>
              </div>

              {/* Funnel Chart */}
              <div 
                className="border rounded-lg p-4"
                style={{ border: '1px solid hsl(var(--border-light))' }}
              >
                <h3 
                  className="text-lg font-semibold mb-4"
                  style={{ 
                    color: 'hsl(var(--text-primary))',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                >
                  Conversion Funnel
                </h3>
                <div className="space-y-3">
                  {funnelData.map((stage, index) => (
                    <div key={stage.stage} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: `hsl(var(--facebook-blue) / ${1 - index * 0.15})` }}
                        ></div>
                        <span 
                          className="text-sm font-medium"
                          style={{ color: 'hsl(var(--text-primary))' }}
                        >
                          {stage.stage}
                        </span>
                      </div>
                      <div className="text-right">
                        <p 
                          className="text-sm font-semibold"
                          style={{ color: 'hsl(var(--text-primary))' }}
                        >
                          {stage.value.toLocaleString()}
                        </p>
                        <p 
                          className="text-xs"
                          style={{ color: 'hsl(var(--text-secondary))' }}
                        >
                          {stage.percentage}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="audience" className="space-y-6 mt-6">
              {/* Device Breakdown */}
              <div 
                className="border rounded-lg p-4"
                style={{ border: '1px solid hsl(var(--border-light))' }}
              >
                <h3 
                  className="text-lg font-semibold mb-4"
                  style={{ 
                    color: 'hsl(var(--text-primary))',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                >
                  Device Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {deviceData.map((device) => (
                    <div 
                      key={device.device}
                      className="p-4 rounded-lg border"
                      style={{ 
                        backgroundColor: 'hsl(var(--table-header))',
                        border: '1px solid hsl(var(--border-light))'
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Smartphone className="w-4 h-4" style={{ color: 'hsl(var(--facebook-blue))' }} />
                        <span 
                          className="text-sm font-semibold"
                          style={{ color: 'hsl(var(--text-primary))' }}
                        >
                          {device.device}
                        </span>
                      </div>
                      <p 
                        className="text-2xl font-bold"
                        style={{ color: 'hsl(var(--text-primary))' }}
                      >
                        {device.percentage}%
                      </p>
                      <p 
                        className="text-xs"
                        style={{ color: 'hsl(var(--text-secondary))' }}
                      >
                        {device.reach.toLocaleString()} reach • ₹{device.spent.toLocaleString()} spent
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engagement Metrics */}
              <div 
                className="border rounded-lg p-4"
                style={{ border: '1px solid hsl(var(--border-light))' }}
              >
                <h3 
                  className="text-lg font-semibold mb-4"
                  style={{ 
                    color: 'hsl(var(--text-primary))',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                >
                  Engagement Breakdown
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {engagementData.map((engagement, index) => {
                    const icons = [Heart, MessageCircle, Share, Target];
                    const Icon = icons[index];
                    return (
                      <div 
                        key={engagement.metric}
                        className="p-4 rounded-lg border"
                        style={{ 
                          backgroundColor: 'hsl(var(--table-header))',
                          border: '1px solid hsl(var(--border-light))'
                        }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className="w-4 h-4" style={{ color: 'hsl(var(--facebook-blue))' }} />
                          <span 
                            className="text-xs font-semibold"
                            style={{ color: 'hsl(var(--text-secondary))' }}
                          >
                            {engagement.metric.toUpperCase()}
                          </span>
                        </div>
                        <p 
                          className="text-xl font-bold"
                          style={{ color: 'hsl(var(--text-primary))' }}
                        >
                          {engagement.count.toLocaleString()}
                        </p>
                        <p 
                          className="text-xs mt-1"
                          style={{ color: 'hsl(var(--success))' }}
                        >
                          {engagement.change} vs last period
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="placements" className="space-y-6 mt-6">
              {/* Geographic Performance */}
              <div 
                className="border rounded-lg overflow-hidden"
                style={{ border: '1px solid hsl(var(--border-light))' }}
              >
                <div 
                  className="px-4 py-3 border-b"
                  style={{ 
                    backgroundColor: 'hsl(var(--table-header))',
                    borderBottom: '1px solid hsl(var(--border-light))'
                  }}
                >
                  <h3 
                    className="text-lg font-semibold flex items-center gap-2"
                    style={{ 
                      color: 'hsl(var(--text-primary))',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}
                  >
                    <Globe className="w-5 h-5" />
                    Geographic Performance
                  </h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ backgroundColor: 'hsl(var(--table-header))' }}>
                        <th 
                          className="text-left p-3 text-xs font-semibold"
                          style={{ color: 'hsl(var(--text-secondary))' }}
                        >
                          Location
                        </th>
                        <th 
                          className="text-right p-3 text-xs font-semibold"
                          style={{ color: 'hsl(var(--text-secondary))' }}
                        >
                          Reach
                        </th>
                        <th 
                          className="text-right p-3 text-xs font-semibold"
                          style={{ color: 'hsl(var(--text-secondary))' }}
                        >
                          Amount Spent
                        </th>
                        <th 
                          className="text-right p-3 text-xs font-semibold"
                          style={{ color: 'hsl(var(--text-secondary))' }}
                        >
                          CTR
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {geoData.map((location, index) => (
                        <tr 
                          key={location.location}
                          style={{ 
                            borderBottom: '1px solid hsl(var(--border-light))',
                            backgroundColor: index % 2 === 0 ? 'white' : 'hsl(var(--table-header) / 0.3)'
                          }}
                        >
                          <td 
                            className="p-3"
                            style={{ 
                              color: 'hsl(var(--text-primary))',
                              fontSize: '14px',
                              fontWeight: '500'
                            }}
                          >
                            {location.location}
                          </td>
                          <td 
                            className="p-3 text-right"
                            style={{ color: 'hsl(var(--text-primary))' }}
                          >
                            {location.reach.toLocaleString()}
                          </td>
                          <td 
                            className="p-3 text-right"
                            style={{ color: 'hsl(var(--text-primary))' }}
                          >
                            ₹{location.spent.toLocaleString()}
                          </td>
                          <td 
                            className="p-3 text-right"
                            style={{ color: 'hsl(var(--text-primary))' }}
                          >
                            {location.ctr}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="demographics" className="space-y-6 mt-6">
              {/* Age and Gender Breakdown */}
              <div 
                className="border rounded-lg p-4"
                style={{ border: '1px solid hsl(var(--border-light))' }}
              >
                <h3 
                  className="text-lg font-semibold mb-4"
                  style={{ 
                    color: 'hsl(var(--text-primary))',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                >
                  Age and Gender Distribution
                </h3>
                <ChartContainer config={chartConfig} className="h-80">
                  <BarChart data={demographicData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border-light))" />
                    <XAxis dataKey="age" stroke="hsl(var(--text-secondary))" fontSize={12} />
                    <YAxis stroke="hsl(var(--text-secondary))" fontSize={12} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="male" fill="hsl(var(--facebook-blue))" name="Male" />
                    <Bar dataKey="female" fill="hsl(var(--success))" name="Female" />
                  </BarChart>
                </ChartContainer>
              </div>
            </TabsContent>

            <TabsContent value="conversion" className="space-y-6 mt-6">
              {/* Campaign Performance Table */}
              <div 
                className="border rounded-lg overflow-hidden"
                style={{ border: '1px solid hsl(var(--border-light))' }}
              >
                <div 
                  className="px-4 py-3 border-b"
                  style={{ 
                    backgroundColor: 'hsl(var(--table-header))',
                    borderBottom: '1px solid hsl(var(--border-light))'
                  }}
                >
                  <h3 
                    className="text-lg font-semibold"
                    style={{ 
                      color: 'hsl(var(--text-primary))',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}
                  >
                    Detailed Campaign Performance
                  </h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ backgroundColor: 'hsl(var(--table-header))' }}>
                        <th 
                          className="text-left p-3 text-xs font-semibold"
                          style={{ color: 'hsl(var(--text-secondary))' }}
                        >
                          Campaign
                        </th>
                        <th 
                          className="text-right p-3 text-xs font-semibold"
                          style={{ color: 'hsl(var(--text-secondary))' }}
                        >
                          Delivery
                        </th>
                        <th 
                          className="text-right p-3 text-xs font-semibold"
                          style={{ color: 'hsl(var(--text-secondary))' }}
                        >
                          Bid Strategy
                        </th>
                        <th 
                          className="text-right p-3 text-xs font-semibold"
                          style={{ color: 'hsl(var(--text-secondary))' }}
                        >
                          Budget
                        </th>
                        <th 
                          className="text-right p-3 text-xs font-semibold"
                          style={{ color: 'hsl(var(--text-secondary))' }}
                        >
                          Reach
                        </th>
                        <th 
                          className="text-right p-3 text-xs font-semibold"
                          style={{ color: 'hsl(var(--text-secondary))' }}
                        >
                          Impressions
                        </th>
                        <th 
                          className="text-right p-3 text-xs font-semibold"
                          style={{ color: 'hsl(var(--text-secondary))' }}
                        >
                          CPR
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaigns.map((campaign, index) => (
                        <tr 
                          key={campaign.id}
                          style={{ 
                            borderBottom: '1px solid hsl(var(--border-light))',
                            backgroundColor: index % 2 === 0 ? 'white' : 'hsl(var(--table-header) / 0.3)'
                          }}
                        >
                          <td 
                            className="p-3"
                            style={{ 
                              color: 'hsl(var(--text-primary))',
                              fontSize: '14px',
                              fontWeight: '500'
                            }}
                          >
                            {campaign.name}
                          </td>
                          <td 
                            className="p-3 text-right"
                            style={{ color: 'hsl(var(--text-primary))' }}
                          >
                            {campaign.delivery}
                          </td>
                          <td 
                            className="p-3 text-right"
                            style={{ color: 'hsl(var(--text-primary))' }}
                          >
                            {campaign.bid_strategy}
                          </td>
                          <td 
                            className="p-3 text-right"
                            style={{ color: 'hsl(var(--text-primary))' }}
                          >
                            {campaign.budget}
                          </td>
                          <td 
                            className="p-3 text-right"
                            style={{ color: 'hsl(var(--text-primary))' }}
                          >
                            {campaign.reach}
                          </td>
                          <td 
                            className="p-3 text-right"
                            style={{ color: 'hsl(var(--text-primary))' }}
                          >
                            {campaign.impressions}
                          </td>
                          <td 
                            className="p-3 text-right"
                            style={{ color: 'hsl(var(--text-primary))' }}
                          >
                            {campaign.cost_per_result}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportsModal;