
import { useState } from "react";
import { useCampaigns } from "@/hooks/useCampaigns";
import AdDetailsModal from "./AdDetailsModal";
import CampaignSummaryBar from "./CampaignSummaryBar";
import AdsTableHeader from "./AdsTableHeader";
import CampaignRow from "./CampaignRow";
import ResultsSummary from "./ResultsSummary";
import { MetaInvoiceModal } from "./MetaInvoiceModal";
import { InvoiceConfirmationModal } from "./InvoiceConfirmationModal";

interface AdsTableProps {
  campaignsData: ReturnType<typeof useCampaigns>;
}

const AdsTable = ({ campaignsData }: AdsTableProps) => {
  const { campaigns, toggleCampaign, totalActiveReach, totalReach } = campaignsData;
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedInvoiceCampaign, setSelectedInvoiceCampaign] = useState<any>(null);

  const handleCampaignClick = (campaign: any) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  const handleInvoiceClick = (campaign: any) => {
    setSelectedInvoiceCampaign(campaign);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmInvoice = () => {
    setIsConfirmModalOpen(false);
    setIsInvoiceModalOpen(true);
  };

  const activeCampaignsCount = campaigns.filter(c => c.active).length;
  const inactiveCampaignsCount = campaigns.filter(c => !c.active).length;

  // Create invoice data for selected campaign
  const createInvoiceData = (campaign: any) => {
    const campaignBudget = parseFloat(campaign.budget.replace(/[₹,]/g, ''));
    return {
      invoiceNumber: `META-2025-${campaign.id.slice(-3).toUpperCase()}`,
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }),
      customerName: "TEAM UNITY",
      customerAddress: [
        "Business Street",
        "Mumbai, Maharashtra 400001",
        "India"
      ],
      items: [{
        description: campaign.name,
        amount: campaignBudget
      }],
      subtotal: campaignBudget,
      tax: 0,
      total: campaignBudget
    };
  };

  return (
    <div className="bg-white flex-1" style={{ fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      {/* Summary Bar */}
      <CampaignSummaryBar 
        activeCampaignsCount={activeCampaignsCount}
        totalActiveReach={totalActiveReach}
      />

      {/* Table Header */}
      <AdsTableHeader />

      {/* Campaign Rows */}
      <div className="divide-y" style={{ borderColor: 'hsl(var(--table-border))' }}>
        {campaigns.map((campaign) => (
          <CampaignRow
            key={campaign.id}
            campaign={campaign}
            onToggle={toggleCampaign}
            onCampaignClick={handleCampaignClick}
            onInvoiceClick={handleInvoiceClick}
          />
        ))}
      </div>

      {/* Results Summary */}
      <ResultsSummary
        totalCampaigns={campaigns.length}
        totalReach={totalReach}
        activeCampaigns={activeCampaignsCount}
        inactiveCampaigns={inactiveCampaignsCount}
      />

      {/* Ad Details Modal */}
      {selectedCampaign && (
        <AdDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          campaign={selectedCampaign}
        />
      )}

      {/* Invoice Confirmation Modal */}
      {selectedInvoiceCampaign && (
        <InvoiceConfirmationModal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={handleConfirmInvoice}
          campaignCount={1}
          totalAmount={parseFloat(selectedInvoiceCampaign.budget.replace(/[₹,]/g, ''))}
        />
      )}

      {/* Invoice Modal */}
      {selectedInvoiceCampaign && (
        <MetaInvoiceModal
          isOpen={isInvoiceModalOpen}
          onClose={() => setIsInvoiceModalOpen(false)}
          invoiceData={createInvoiceData(selectedInvoiceCampaign)}
        />
      )}
    </div>
  );
};

export default AdsTable;
