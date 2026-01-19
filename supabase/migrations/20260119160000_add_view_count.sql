-- Add view_count column to components table
ALTER TABLE components 
ADD COLUMN IF NOT EXISTS view_count bigint DEFAULT 0;

-- Create function to increment view count atomically
CREATE OR REPLACE FUNCTION increment_view_count(component_id_param bigint)
RETURNS void AS $$
BEGIN
  UPDATE components 
  SET view_count = view_count + 1 
  WHERE id = component_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
