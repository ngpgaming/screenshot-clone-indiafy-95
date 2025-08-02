
import React from 'react';
import { ToggleLeft, ToggleRight } from "lucide-react";
import { Campaign } from '@/hooks/useCampaigns';

interface CampaignRowProps {
  campaign: Campaign;
  onToggle: (campaignId: string) => void;
  onCampaignClick: (campaign: Campaign) => void;
}

const CampaignRow: React.FC<CampaignRowProps> = ({
  campaign,
  onToggle,
  onCampaignClick
}) => {
  return (
    <div 
      className="flex items-center fb-table-row" 
      style={{ 
        padding: '12px 24px',
        fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
        fontSize: '14px',
        borderBottom: '1px solid hsl(var(--table-border))'
      }}
    >
      {/* Checkbox placeholder to match header */}
      <div className="mr-4 w-4"></div>
      
      {/* Toggle Switch */}
      <div className="w-16 px-2 flex justify-center">
        <button onClick={() => onToggle(campaign.id)}>
          {campaign.active ? (
            <ToggleRight className="w-8 h-5 text-facebook-blue cursor-pointer hover:text-facebook-hover" />
          ) : (
            <ToggleLeft className="w-8 h-5 text-text-muted cursor-pointer hover:text-text-secondary" />
          )}
        </button>
      </div>
      
      {/* Campaign Name */}
      <div className="w-80 px-2">
        <div className="flex items-center space-x-2">
          <div 
            className={`w-3 h-3 rounded-full ${campaign.active ? 'bg-success' : 'bg-text-muted'}`}
            style={{ 
              backgroundColor: campaign.active ? 'hsl(var(--success))' : 'hsl(var(--text-muted))'
            }}
          ></div>
          <span 
            className="fb-text-base text-facebook-blue hover:underline cursor-pointer font-medium"
            onClick={() => onCampaignClick(campaign)}
            style={{ fontWeight: '500' }}
          >
            {campaign.name}
          </span>
        </div>
      </div>
      
      {/* Delivery */}
      <div className="w-32 px-2">
        <span 
          className="fb-text-base"
          style={{ 
            color: campaign.active ? 'hsl(var(--success))' : 'hsl(var(--text-muted))',
            fontWeight: campaign.active ? '500' : '400'
          }}
        >
          {campaign.delivery}
        </span>
      </div>
      
      {/* Actions */}
      <div className="w-24 px-2">
        <span className="fb-text-base text-text-primary">{campaign.actions}</span>
      </div>
      
      {/* Bid Strategy */}
      <div className="w-40 px-2">
        <span className="fb-text-base text-text-primary">{campaign.bid_strategy}</span>
      </div>
      
      {/* Budget */}
      <div className="w-32 px-2">
        <span className="fb-text-base text-text-primary">{campaign.budget}</span>
      </div>
      
      {/* Amount Spent */}
      <div className="w-32 px-2">
        <span className="fb-text-base text-text-primary" style={{ fontWeight: '500' }}>{campaign.amount_spent}</span>
      </div>
      
      {/* Reach */}
      <div className="w-24 px-2">
        <span 
          className="fb-text-base"
          style={{ 
            fontWeight: '500',
            color: campaign.active ? 'hsl(var(--facebook-blue))' : 'hsl(var(--text-primary))'
          }}
        >
          {campaign.reach}
        </span>
      </div>
      
      {/* Impressions */}
      <div className="w-28 px-2">
        <span className="fb-text-base text-text-primary">{campaign.impressions}</span>
      </div>

      {/* Cost per result */}
      <div className="w-32 px-2">
        <span className="fb-text-base text-text-primary" style={{ fontWeight: '500' }}>{campaign.cost_per_result}</span>
      </div>
    </div>
  );
};

export default CampaignRow;
