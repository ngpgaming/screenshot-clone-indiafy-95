
import { Plus, Copy, Edit, FlaskConical, MoreHorizontal, BarChart3, FileText, Download, Receipt, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import ExportModal from "./ExportModal";
import EditCampaignModal from "./EditCampaignModal";
import CreateCampaignModal from "./CreateCampaignModal";
import { MetaInvoiceModal } from "./MetaInvoiceModal";
import { useCampaigns } from "@/hooks/useCampaigns";

interface TableControlsProps {
  campaignsData: ReturnType<typeof useCampaigns>;
}

const TableControls = ({ campaignsData }: TableControlsProps) => {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const { campaigns, updateCampaignName, createCampaign, deleteCampaign, totalActiveReach, totalReach } = campaignsData;

  const activeCampaignsCount = campaigns.filter(c => c.active).length;
  const inactiveCampaignsCount = campaigns.filter(c => !c.active).length;
  
  const totalSpent = campaigns.reduce((sum, campaign) => {
    const spent = parseFloat(campaign.amount_spent.replace(/[₹,]/g, ''));
    return sum + spent;
  }, 0);

  // Calculate total budget instead of spent amount
  const totalBudget = campaigns.reduce((sum, campaign) => {
    const budget = parseFloat(campaign.budget.replace(/[₹,]/g, ''));
    return sum + budget;
  }, 0);

  const exportData = {
    campaigns,
    summary: {
      totalCampaigns: campaigns.length,
      totalReach,
      activeCampaigns: activeCampaignsCount,
      inactiveCampaigns: inactiveCampaignsCount,
      totalActiveReach,
      totalSpent: `₹${totalSpent.toLocaleString()}`
    },
    exportedAt: new Date().toISOString()
  };

  // Invoice data with budget amounts and ads names
  const invoiceData = {
    invoiceNumber: "META-2025-001",
    date: "July 15, 2025",
    dueDate: "August 15, 2025",
    customerName: "TEAM UNITY",
    customerAddress: [
      "Business Street",
      "Mumbai, Maharashtra 400001",
      "India"
    ],
    items: campaigns.filter(c => c.active).map(campaign => ({
      description: campaign.name,
      amount: parseFloat(campaign.budget.replace(/[₹,]/g, ''))
    })),
    subtotal: totalBudget,
    tax: 0,
    total: totalBudget
  };

  return (
    <>
      <div className="bg-white px-6 py-4 border-b border-table-border">
        <div className="flex items-center justify-between">
          {/* Left Section - Action Buttons */}
          <div className="flex items-center space-x-2">
            <button 
              className="fb-button fb-button-primary"
              onClick={() => setIsCreateModalOpen(true)}
              style={{
                backgroundColor: 'hsl(var(--success))',
                borderColor: 'hsl(var(--success))',
                color: 'white',
                fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: '14px',
                fontWeight: '600',
                padding: '6px 16px',
                borderRadius: '6px',
                border: '1px solid',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Plus className="w-4 h-4" />
              Create
            </button>
            <button 
              className="fb-button fb-button-secondary"
              style={{
                fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: '14px',
                fontWeight: '600',
                padding: '6px 16px',
                borderRadius: '6px',
                border: '1px solid hsl(var(--border-light))',
                backgroundColor: 'white',
                color: 'hsl(var(--text-primary))',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Copy className="w-4 h-4" />
              Duplicate
            </button>
            <button 
              className="fb-button fb-button-secondary"
              onClick={() => setIsEditModalOpen(true)}
              style={{
                fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: '14px',
                fontWeight: '600',
                padding: '6px 16px',
                borderRadius: '6px',
                border: '1px solid hsl(var(--border-light))',
                backgroundColor: 'white',
                color: 'hsl(var(--text-primary))',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button 
              className="fb-button fb-button-secondary"
              style={{
                fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: '14px',
                fontWeight: '600',
                padding: '6px 16px',
                borderRadius: '6px',
                border: '1px solid hsl(var(--border-light))',
                backgroundColor: 'white',
                color: 'hsl(var(--text-primary))',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <FlaskConical className="w-4 h-4" />
              A/B test
            </button>
            <div className="flex items-center space-x-1">
              <button 
                className="fb-button fb-button-secondary"
                style={{
                  fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: '14px',
                  fontWeight: '600',
                  padding: '6px 16px',
                  borderRadius: '6px',
                  border: '1px solid hsl(var(--border-light))',
                  backgroundColor: 'white',
                  color: 'hsl(var(--text-primary))'
                }}
              >
                More
              </button>
              <button 
                className="fb-button fb-button-secondary"
                style={{
                  fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: '14px',
                  fontWeight: '600',
                  padding: '6px 8px',
                  borderRadius: '6px',
                  border: '1px solid hsl(var(--border-light))',
                  backgroundColor: 'white',
                  color: 'hsl(var(--text-primary))'
                }}
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Section - View Controls */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" style={{ color: 'hsl(var(--text-secondary))' }} />
              <span 
                className="text-sm"
                style={{ 
                  color: 'hsl(var(--text-secondary))',
                  fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: '13px'
                }}
              >
                Last 30 days: 3 Jun 2025 - 2 Jul 2025
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" style={{ color: 'hsl(var(--text-secondary))' }} />
              <Select defaultValue="performance">
                <SelectTrigger 
                  className="w-40"
                  style={{
                    fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: '13px',
                    border: '1px solid hsl(var(--border-light))',
                    borderRadius: '6px',
                    padding: '6px 12px'
                  }}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="performance">Columns: Performance</SelectItem>
                  <SelectItem value="delivery">Columns: Delivery</SelectItem>
                  <SelectItem value="engagement">Columns: Engagement</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Select defaultValue="breakdown">
              <SelectTrigger 
                className="w-32"
                style={{
                  fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: '13px',
                  border: '1px solid hsl(var(--border-light))',
                  borderRadius: '6px',
                  padding: '6px 12px'
                }}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breakdown">Breakdown</SelectItem>
                <SelectItem value="age">By Age</SelectItem>
                <SelectItem value="gender">By Gender</SelectItem>
              </SelectContent>
            </Select>

            <button 
              className="fb-button fb-button-secondary"
              style={{
                fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: '14px',
                fontWeight: '600',
                padding: '6px 16px',
                borderRadius: '6px',
                border: '1px solid hsl(var(--border-light))',
                backgroundColor: 'white',
                color: 'hsl(var(--text-primary))',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <FileText className="w-4 h-4" />
              Reports
            </button>

            <button 
              className="fb-button fb-button-secondary"
              onClick={() => setIsExportModalOpen(true)}
              style={{
                fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: '14px',
                fontWeight: '600',
                padding: '6px 16px',
                borderRadius: '6px',
                border: '1px solid hsl(var(--border-light))',
                backgroundColor: 'white',
                color: 'hsl(var(--text-primary))',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Download className="w-4 h-4" />
              Export
            </button>

            <button 
              className="fb-button fb-button-secondary"
              onClick={() => setIsInvoiceModalOpen(true)}
              style={{
                fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: '14px',
                fontWeight: '600',
                padding: '6px 16px',
                borderRadius: '6px',
                border: '1px solid hsl(var(--border-light))',
                backgroundColor: 'white',
                color: 'hsl(var(--text-primary))',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Receipt className="w-4 h-4" />
              Invoice
            </button>
          </div>
        </div>
      </div>

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        exportData={exportData}
      />
      
      <CreateCampaignModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateCampaign={createCampaign}
      />
      
      <EditCampaignModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        campaigns={campaigns}
        onUpdateCampaign={updateCampaignName}
        onDeleteCampaign={deleteCampaign}
      />
      
      <MetaInvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        invoiceData={invoiceData}
      />
    </>
  );
};

export default TableControls;
