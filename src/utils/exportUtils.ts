
import { Campaign } from '@/hooks/useCampaigns';

export interface ExportData {
  campaigns: Campaign[];
  summary: {
    totalCampaigns: number;
    totalReach: number;
    activeCampaigns: number;
    inactiveCampaigns: number;
    totalActiveReach: number;
    totalSpent: string;
  };
  exportedAt: string;
}

export const exportToCSV = (data: ExportData): void => {
  const headers = [
    'Campaign Name',
    'Status',
    'Delivery',
    'Bid Strategy',
    'Budget',
    'Amount Spent',
    'Reach',
    'Impressions',
    'Cost Per Result'
  ];

  const rows = data.campaigns.map(campaign => [
    campaign.name,
    campaign.active ? 'Active' : 'Inactive',
    campaign.delivery,
    campaign.bid_strategy,
    campaign.budget,
    campaign.amount_spent,
    campaign.reach,
    campaign.impressions,
    campaign.cost_per_result
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  downloadFile(csvContent, 'campaigns-export.csv', 'text/csv');
};

export const exportToJSON = (data: ExportData): void => {
  const jsonContent = JSON.stringify(data, null, 2);
  downloadFile(jsonContent, 'campaigns-export.json', 'application/json');
};

export const exportToExcel = (data: ExportData): void => {
  // Simple TSV format that opens in Excel
  const headers = [
    'Campaign Name',
    'Status',
    'Delivery',
    'Bid Strategy',
    'Budget',
    'Amount Spent',
    'Reach',
    'Impressions',
    'Cost Per Result'
  ];

  const rows = data.campaigns.map(campaign => [
    campaign.name,
    campaign.active ? 'Active' : 'Inactive',
    campaign.delivery,
    campaign.bid_strategy,
    campaign.budget,
    campaign.amount_spent,
    campaign.reach,
    campaign.impressions,
    campaign.cost_per_result
  ]);

  const tsvContent = [
    headers.join('\t'),
    ...rows.map(row => row.join('\t'))
  ].join('\n');

  downloadFile(tsvContent, 'campaigns-export.xlsx', 'application/vnd.ms-excel');
};

const downloadFile = (content: string, filename: string, mimeType: string): void => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
