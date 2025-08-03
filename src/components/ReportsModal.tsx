import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BarChart3, TrendingUp, Users, DollarSign, Eye, MousePointer } from "lucide-react";
import { useCampaigns } from "@/hooks/useCampaigns";

interface ReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignsData: ReturnType<typeof useCampaigns>;
}

const ReportsModal = ({ isOpen, onClose, campaignsData }: ReportsModalProps) => {
  const { campaigns } = campaignsData;
  
  // Calculate analytics data from real campaign data
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-4xl max-h-[90vh] overflow-y-auto"
        style={{
          fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
          backgroundColor: 'white',
          border: '1px solid hsl(var(--border-light))'
        }}
      >
        <DialogHeader className="border-b pb-4" style={{ borderColor: 'hsl(var(--border-light))' }}>
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
            Campaign Performance Report
          </DialogTitle>
          <p 
            className="text-sm mt-1"
            style={{ 
              color: 'hsl(var(--text-secondary))',
              fontSize: '13px'
            }}
          >
            Performance metrics for all campaigns • Generated on {new Date().toLocaleDateString('en-GB', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}
          </p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Key Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div 
              className="p-4 rounded-lg border"
              style={{ 
                backgroundColor: 'hsl(var(--table-header))',
                border: '1px solid hsl(var(--border-light))'
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p 
                    className="text-sm font-medium"
                    style={{ 
                      color: 'hsl(var(--text-secondary))',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}
                  >
                    Total Spent
                  </p>
                  <p 
                    className="text-2xl font-bold mt-1"
                    style={{ 
                      color: 'hsl(var(--text-primary))',
                      fontSize: '24px',
                      fontWeight: '700'
                    }}
                  >
                    ₹{totalSpent.toLocaleString()}
                  </p>
                </div>
                <DollarSign 
                  className="w-8 h-8"
                  style={{ color: 'hsl(var(--success))' }}
                />
              </div>
            </div>

            <div 
              className="p-4 rounded-lg border"
              style={{ 
                backgroundColor: 'hsl(var(--table-header))',
                border: '1px solid hsl(var(--border-light))'
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p 
                    className="text-sm font-medium"
                    style={{ 
                      color: 'hsl(var(--text-secondary))',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}
                  >
                    Total Reach
                  </p>
                  <p 
                    className="text-2xl font-bold mt-1"
                    style={{ 
                      color: 'hsl(var(--text-primary))',
                      fontSize: '24px',
                      fontWeight: '700'
                    }}
                  >
                    {totalReach.toLocaleString()}
                  </p>
                </div>
                <Users 
                  className="w-8 h-8"
                  style={{ color: 'hsl(var(--facebook-blue))' }}
                />
              </div>
            </div>

            <div 
              className="p-4 rounded-lg border"
              style={{ 
                backgroundColor: 'hsl(var(--table-header))',
                border: '1px solid hsl(var(--border-light))'
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p 
                    className="text-sm font-medium"
                    style={{ 
                      color: 'hsl(var(--text-secondary))',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}
                  >
                    Impressions
                  </p>
                  <p 
                    className="text-2xl font-bold mt-1"
                    style={{ 
                      color: 'hsl(var(--text-primary))',
                      fontSize: '24px',
                      fontWeight: '700'
                    }}
                  >
                    {totalImpressions.toLocaleString()}
                  </p>
                </div>
                <Eye 
                  className="w-8 h-8"
                  style={{ color: 'hsl(var(--warning))' }}
                />
              </div>
            </div>

            <div 
              className="p-4 rounded-lg border"
              style={{ 
                backgroundColor: 'hsl(var(--table-header))',
                border: '1px solid hsl(var(--border-light))'
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p 
                    className="text-sm font-medium"
                    style={{ 
                      color: 'hsl(var(--text-secondary))',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}
                  >
                    Avg. CTR
                  </p>
                  <p 
                    className="text-2xl font-bold mt-1"
                    style={{ 
                      color: 'hsl(var(--text-primary))',
                      fontSize: '24px',
                      fontWeight: '700'
                    }}
                  >
                    {averageCtr}%
                  </p>
                </div>
                <MousePointer 
                  className="w-8 h-8"
                  style={{ color: 'hsl(var(--error))' }}
                />
              </div>
            </div>
          </div>

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
                className="text-sm font-semibold"
                style={{ 
                  color: 'hsl(var(--text-primary))',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                Individual Campaign Performance
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: 'hsl(var(--table-header))' }}>
                    <th 
                      className="text-left p-3 text-xs font-semibold"
                      style={{ 
                        color: 'hsl(var(--text-secondary))',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}
                    >
                      Campaign Name
                    </th>
                    <th 
                      className="text-left p-3 text-xs font-semibold"
                      style={{ 
                        color: 'hsl(var(--text-secondary))',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}
                    >
                      Status
                    </th>
                    <th 
                      className="text-right p-3 text-xs font-semibold"
                      style={{ 
                        color: 'hsl(var(--text-secondary))',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}
                    >
                      Budget
                    </th>
                    <th 
                      className="text-right p-3 text-xs font-semibold"
                      style={{ 
                        color: 'hsl(var(--text-secondary))',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}
                    >
                      Spent
                    </th>
                    <th 
                      className="text-right p-3 text-xs font-semibold"
                      style={{ 
                        color: 'hsl(var(--text-secondary))',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}
                    >
                      Reach
                    </th>
                    <th 
                      className="text-right p-3 text-xs font-semibold"
                      style={{ 
                        color: 'hsl(var(--text-secondary))',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}
                    >
                      Impressions
                    </th>
                    <th 
                      className="text-right p-3 text-xs font-semibold"
                      style={{ 
                        color: 'hsl(var(--text-secondary))',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}
                    >
                      CPR
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((campaign, index) => (
                    <tr 
                      key={campaign.id}
                      className="hover:bg-gray-50"
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
                      <td className="p-3">
                        <span 
                          className="px-2 py-1 rounded text-xs font-medium"
                          style={{
                            backgroundColor: campaign.active 
                              ? 'hsl(var(--success) / 0.1)' 
                              : 'hsl(var(--error) / 0.1)',
                            color: campaign.active 
                              ? 'hsl(var(--success))' 
                              : 'hsl(var(--error))',
                            fontSize: '12px',
                            fontWeight: '500'
                          }}
                        >
                          {campaign.active ? 'Active' : 'Paused'}
                        </span>
                      </td>
                      <td 
                        className="p-3 text-right"
                        style={{ 
                          color: 'hsl(var(--text-primary))',
                          fontSize: '14px'
                        }}
                      >
                        {campaign.budget}
                      </td>
                      <td 
                        className="p-3 text-right"
                        style={{ 
                          color: 'hsl(var(--text-primary))',
                          fontSize: '14px'
                        }}
                      >
                        {campaign.amount_spent}
                      </td>
                      <td 
                        className="p-3 text-right"
                        style={{ 
                          color: 'hsl(var(--text-primary))',
                          fontSize: '14px'
                        }}
                      >
                        {campaign.reach}
                      </td>
                      <td 
                        className="p-3 text-right"
                        style={{ 
                          color: 'hsl(var(--text-primary))',
                          fontSize: '14px'
                        }}
                      >
                        {campaign.impressions}
                      </td>
                      <td 
                        className="p-3 text-right"
                        style={{ 
                          color: 'hsl(var(--text-primary))',
                          fontSize: '14px'
                        }}
                      >
                        {campaign.cost_per_result}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Stats */}
          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg border"
            style={{ 
              backgroundColor: 'hsl(var(--table-header))',
              border: '1px solid hsl(var(--border-light))'
            }}
          >
            <div className="text-center">
              <p 
                className="text-sm font-medium"
                style={{ 
                  color: 'hsl(var(--text-secondary))',
                  fontSize: '12px',
                  fontWeight: '600'
                }}
              >
                Total Campaigns
              </p>
              <p 
                className="text-3xl font-bold mt-1"
                style={{ 
                  color: 'hsl(var(--text-primary))',
                  fontSize: '28px',
                  fontWeight: '700'
                }}
              >
                {campaigns.length}
              </p>
            </div>
            <div className="text-center">
              <p 
                className="text-sm font-medium"
                style={{ 
                  color: 'hsl(var(--text-secondary))',
                  fontSize: '12px',
                  fontWeight: '600'
                }}
              >
                Active Campaigns
              </p>
              <p 
                className="text-3xl font-bold mt-1"
                style={{ 
                  color: 'hsl(var(--success))',
                  fontSize: '28px',
                  fontWeight: '700'
                }}
              >
                {activeCampaigns.length}
              </p>
            </div>
            <div className="text-center">
              <p 
                className="text-sm font-medium"
                style={{ 
                  color: 'hsl(var(--text-secondary))',
                  fontSize: '12px',
                  fontWeight: '600'
                }}
              >
                Cost Per Click
              </p>
              <p 
                className="text-3xl font-bold mt-1"
                style={{ 
                  color: 'hsl(var(--facebook-blue))',
                  fontSize: '28px',
                  fontWeight: '700'
                }}
              >
                ₹{costPerClick}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportsModal;