-- Create campaigns table for permanent storage
CREATE TABLE public.campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  active BOOLEAN NOT NULL DEFAULT true,
  name TEXT NOT NULL,
  delivery TEXT NOT NULL DEFAULT 'Active',
  actions TEXT NOT NULL DEFAULT '—',
  bid_strategy TEXT NOT NULL DEFAULT 'Highest volume',
  budget TEXT NOT NULL,
  amount_spent TEXT NOT NULL,
  reach TEXT NOT NULL,
  impressions TEXT NOT NULL,
  cost_per_result TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;

-- Create policy for public access (since this is a demo app)
CREATE POLICY "Allow all operations on campaigns" 
ON public.campaigns 
FOR ALL 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_campaigns_updated_at
BEFORE UPDATE ON public.campaigns
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();