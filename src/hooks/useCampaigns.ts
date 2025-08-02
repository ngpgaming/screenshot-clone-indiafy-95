import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface Campaign {
  id: string;
  active: boolean;
  name: string;
  delivery: string;
  actions: string;
  bid_strategy: string;
  budget: string;
  amount_spent: string;
  reach: string;
  impressions: string;
  cost_per_result: string;
}

export const useCampaigns = () => {
  const { toast } = useToast();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const fetchCampaigns = async () => {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch campaigns",
      });
      return;
    }

    if (data) {
      setCampaigns(data);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const toggleCampaign = async (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (!campaign) return;

    const newActive = !campaign.active;
    const updatedData = {
      active: newActive,
      delivery: newActive ? "Active" : "Paused"
    };

    const { error } = await supabase
      .from('campaigns')
      .update(updatedData)
      .eq('id', campaignId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update campaign",
      });
      return;
    }

    setCampaigns(prevCampaigns => 
      prevCampaigns.map(c => 
        c.id === campaignId ? { ...c, ...updatedData } : c
      )
    );

    toast({
      title: newActive ? "Campaign Activated" : "Campaign Deactivated",
      description: `${campaign.name} is now ${newActive ? "running" : "paused"}. Reach data: ${campaign.reach}`,
    });
  };

  const updateCampaignName = async (campaignId: string, updatedData: Partial<Campaign>) => {
    const { error } = await supabase
      .from('campaigns')
      .update(updatedData)
      .eq('id', campaignId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update campaign",
      });
      return;
    }

    setCampaigns(prevCampaigns => 
      prevCampaigns.map(campaign => 
        campaign.id === campaignId 
          ? { ...campaign, ...updatedData }
          : campaign
      )
    );

    toast({
      title: "Campaign Updated",
      description: `Campaign has been updated successfully`,
    });
  };

  const createCampaign = async (campaignData: Omit<Campaign, 'id'>) => {
    const { data, error } = await supabase
      .from('campaigns')
      .insert([campaignData])
      .select()
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create campaign",
      });
      return;
    }

    setCampaigns(prevCampaigns => [data, ...prevCampaigns]);

    toast({
      title: "Campaign Created",
      description: `"${campaignData.name}" has been created successfully`,
    });
  };

  const deleteCampaign = async (campaignId: string) => {
    const campaignToDelete = campaigns.find(c => c.id === campaignId);
    
    const { error } = await supabase
      .from('campaigns')
      .delete()
      .eq('id', campaignId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete campaign",
      });
      return;
    }

    setCampaigns(prevCampaigns => 
      prevCampaigns.filter(campaign => campaign.id !== campaignId)
    );

    toast({
      title: "Campaign Deleted",
      description: `"${campaignToDelete?.name}" has been deleted`,
    });
  };

  const totalActiveReach = campaigns.filter(c => c.active).reduce((sum, campaign) => {
    return sum + parseInt(campaign.reach.replace(/,/g, ''));
  }, 0);

  const totalReach = campaigns.reduce((sum, c) => sum + parseInt(c.reach.replace(/,/g, '')), 0);

  return {
    campaigns,
    toggleCampaign,
    updateCampaignName,
    createCampaign,
    deleteCampaign,
    totalActiveReach,
    totalReach
  };
};
