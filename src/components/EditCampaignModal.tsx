import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Trash2 } from "lucide-react";
import { Campaign } from '@/hooks/useCampaigns';

interface EditCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaigns: Campaign[];
  onUpdateCampaign: (campaignId: string, updatedData: Partial<Campaign>) => void;
  onDeleteCampaign: (campaignId: string) => void;
}

const EditCampaignModal: React.FC<EditCampaignModalProps> = ({
  isOpen,
  onClose,
  campaigns,
  onUpdateCampaign,
  onDeleteCampaign
}) => {
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    active: true,
    delivery: "Active",
    bidStrategy: "Highest volume",
    budget: "",
    amountSpent: "",
    reach: "",
    impressions: "",
    costPerResult: ""
  });

  const handleCampaignSelect = (campaignId: string) => {
    setSelectedCampaignId(campaignId);
    const campaign = campaigns.find(c => c.id === campaignId);
    if (campaign) {
      setFormData({
        name: campaign.name,
        active: campaign.active,
        delivery: campaign.delivery,
        bidStrategy: campaign.bid_strategy,
        budget: campaign.budget.replace('₹', ''),
        amountSpent: campaign.amount_spent.replace('₹', ''),
        reach: campaign.reach.replace(/,/g, ''),
        impressions: campaign.impressions.replace(/,/g, ''),
        costPerResult: campaign.cost_per_result.replace('₹', '')
      });
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'active' && { delivery: value ? "Active" : "Paused" })
    }));
  };

  const handleSave = () => {
    if (selectedCampaignId && formData.name.trim()) {
      const updatedData = {
        name: formData.name,
        active: formData.active,
        delivery: formData.delivery,
        bid_strategy: formData.bidStrategy,
        budget: formData.budget.startsWith('₹') ? formData.budget : `₹${formData.budget}`,
        amount_spent: formData.amountSpent.startsWith('₹') ? formData.amountSpent : `₹${formData.amountSpent}`,
        reach: formData.reach,
        impressions: formData.impressions,
        cost_per_result: formData.costPerResult.startsWith('₹') ? formData.costPerResult : `₹${formData.costPerResult}`
      };
      
      onUpdateCampaign(selectedCampaignId, updatedData);
      handleClose();
    }
  };

  const handleDelete = () => {
    if (selectedCampaignId && window.confirm('Are you sure you want to delete this campaign?')) {
      onDeleteCampaign(selectedCampaignId);
      handleClose();
    }
  };

  const handleClose = () => {
    onClose();
    setSelectedCampaignId("");
    setFormData({
      name: "",
      active: true,
      delivery: "Active",
      bidStrategy: "Highest volume",
      budget: "",
      amountSpent: "",
      reach: "",
      impressions: "",
      costPerResult: ""
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Campaign</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="campaign-select">Select Campaign</Label>
            <Select value={selectedCampaignId} onValueChange={handleCampaignSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a campaign to edit" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                {campaigns.map((campaign) => (
                  <SelectItem key={campaign.id} value={campaign.id}>
                    {campaign.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedCampaignId && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="campaign-name">Campaign Name</Label>
                  <Input
                    id="campaign-name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter campaign name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Active Status</Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={formData.active}
                      onCheckedChange={(checked) => handleInputChange('active', checked)}
                    />
                    <span className="text-sm">{formData.active ? 'Active' : 'Paused'}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Bid Strategy</Label>
                  <Select value={formData.bidStrategy} onValueChange={(value) => handleInputChange('bidStrategy', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Highest volume">Highest volume</SelectItem>
                      <SelectItem value="Lowest cost">Lowest cost</SelectItem>
                      <SelectItem value="Using ad set bid...">Using ad set bid...</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Budget</Label>
                  <Input
                    id="budget"
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    placeholder="10,000.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount-spent">Amount Spent</Label>
                  <Input
                    id="amount-spent"
                    value={formData.amountSpent}
                    onChange={(e) => handleInputChange('amountSpent', e.target.value)}
                    placeholder="9,500.00"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reach">Reach</Label>
                  <Input
                    id="reach"
                    value={formData.reach}
                    onChange={(e) => handleInputChange('reach', e.target.value)}
                    placeholder="2,500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="impressions">Impressions</Label>
                  <Input
                    id="impressions"
                    value={formData.impressions}
                    onChange={(e) => handleInputChange('impressions', e.target.value)}
                    placeholder="10,500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cost-per-result">Cost Per Result</Label>
                  <Input
                    id="cost-per-result"
                    value={formData.costPerResult}
                    onChange={(e) => handleInputChange('costPerResult', e.target.value)}
                    placeholder="4.00"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-between mt-6">
          <div>
            {selectedCampaignId && (
              <Button 
                variant="destructive" 
                onClick={handleDelete}
                className="flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete Campaign
              </Button>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!selectedCampaignId || !formData.name.trim()}
              className="bg-success text-white hover:bg-success/90"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditCampaignModal;