
import React from 'react';

interface ResultsSummaryProps {
  totalCampaigns: number;
  totalReach: number;
  activeCampaigns: number;
  inactiveCampaigns: number;
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({
  totalCampaigns,
  totalReach,
  activeCampaigns,
  inactiveCampaigns
}) => {
  return (
    <div className="border-t border-table-border bg-table-header px-6 py-3">
      <div className="flex items-center justify-between text-sm text-text-secondary">
        <span>Results from {totalCampaigns} campaigns</span>
        <div className="text-xs">
          Total Reach: {totalReach.toLocaleString()} | 
          Active: {activeCampaigns} | 
          Inactive: {inactiveCampaigns}
        </div>
      </div>
    </div>
  );
};

export default ResultsSummary;
