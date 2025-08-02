import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Campaign } from '@/hooks/useCampaigns';

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateCampaign: (campaignData: Omit<Campaign, 'id'>) => void;
}

const CreateCampaignModal: React.FC<CreateCampaignModalProps> = ({
  isOpen,
  onClose,
  onCreateCampaign
}) => {
  const [formData, setFormData] = useState({
    active: true,
    name: "",
    delivery: "Active",
    actions: "—",
    bidStrategy: "Highest volume",
    budget: "",
    amountSpent: "",
    reach: "",
    impressions: "",
    costPerResult: ""
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'active' && { delivery: value ? "Active" : "Paused" })
    }));
  };

  const handleSave = () => {
    if (formData.name.trim() && formData.budget && formData.amountSpent && formData.reach && formData.impressions && formData.costPerResult) {
      const campaignData = {
        active: formData.active,
        name: formData.name,
        delivery: formData.delivery,
        actions: formData.actions,
        bid_strategy: formData.bidStrategy,
        budget: formData.budget.startsWith('₹') ? formData.budget : `₹${formData.budget}`,
        amount_spent: formData.amountSpent.startsWith('₹') ? formData.amountSpent : `₹${formData.amountSpent}`,
        reach: formData.reach,
        impressions: formData.impressions,
        cost_per_result: formData.costPerResult.startsWith('₹') ? formData.costPerResult : `₹${formData.costPerResult}`
      };
      
      onCreateCampaign(campaignData);
      handleClose();
    }
  };

  const handleClose = () => {
    onClose();
    setFormData({
      active: true,
      name: "",
      delivery: "Active",
      actions: "—",
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
          <DialogTitle>Create New Campaign</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
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
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!formData.name.trim() || !formData.budget || !formData.amountSpent || !formData.reach || !formData.impressions || !formData.costPerResult}
            className="bg-success text-white hover:bg-success/90"
          >
            Create Campaign
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCampaignModal;