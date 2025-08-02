
import React from 'react';

interface CampaignSummaryBarProps {
  activeCampaignsCount: number;
  totalActiveReach: number;
}

const CampaignSummaryBar: React.FC<CampaignSummaryBarProps> = ({
  activeCampaignsCount,
  totalActiveReach
}) => {
  return (
    <div className="bg-blue-50 border-b border-blue-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="text-sm text-blue-800">
          <span className="font-medium">Active Campaigns: {activeCampaignsCount}</span>
          <span className="ml-4">Total Active Reach: {totalActiveReach.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default CampaignSummaryBar;
