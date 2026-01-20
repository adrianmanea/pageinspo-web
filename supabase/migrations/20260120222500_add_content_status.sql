-- Create custom type for content status
-- We use a check constraint instead of an enum for flexibility and easier updates
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'content_status') THEN
        CREATE TYPE content_status AS ENUM ('draft', 'published', 'archived', 'deleted');
    END IF;
END $$;

-- Add status column to components
ALTER TABLE components 
ADD COLUMN IF NOT EXISTS status content_status NOT NULL DEFAULT 'draft';

-- Add status column to flows
ALTER TABLE flows 
ADD COLUMN IF NOT EXISTS status content_status NOT NULL DEFAULT 'draft';

-- Add status column to sources
ALTER TABLE sources 
ADD COLUMN IF NOT EXISTS status content_status NOT NULL DEFAULT 'draft';

-- Backfill existing content to 'published'
UPDATE components SET status = 'published';
UPDATE flows SET status = 'published';
UPDATE sources SET status = 'published';

-- Update RLS Policies

-- Components
DROP POLICY IF EXISTS "Components are viewable by everyone" ON components;
CREATE POLICY "Components are viewable by everyone" ON components
    FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Components are insertable by authenticated users" ON components;
CREATE POLICY "Components are insertable by authenticated users" ON components
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Components are updatable by authenticated users" ON components;
CREATE POLICY "Components are updatable by authenticated users" ON components
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Flows
DROP POLICY IF EXISTS "Flows are viewable by everyone" ON flows;
CREATE POLICY "Flows are viewable by everyone" ON flows
    FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Flows are insertable by authenticated users" ON flows;
CREATE POLICY "Flows are insertable by authenticated users" ON flows
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Sources (Policies were "viewable by everyone" in 20260115...)
DROP POLICY IF EXISTS "Sources are viewable by everyone" ON sources;
CREATE POLICY "Sources are viewable by everyone" ON sources
    FOR SELECT USING (status = 'published');

-- Allow admins to see everything?
-- The current "authenticated users" policies for INSERT/UPDATE allow all authenticated users to manage content.
-- We probably want to allow Authenticated users (who are presumably admins/creators in this app's context) to SEE everything too.
-- Otherwise, if I create a Draft component, I won't be able to see it to edit it because the SELECT policy only allows 'published'.

-- Fix: Add policy for authenticated users to view all statuses OR modify the public policy.
-- Since we want public to see ONLY published, but admins/creators to see ALL.

-- Components: Public View
-- "Components are viewable by everyone" is effectively for anon users + auth users.
-- We need to split it or make it smart.
-- "Public read access" -> status = 'published'
-- "Admin/Auth read access" -> true

DROP POLICY IF EXISTS "Components are viewable by everyone" ON components;
CREATE POLICY "Components are viewable by public" ON components
    FOR SELECT USING (status = 'published');

CREATE POLICY "Components are viewable by authenticated users" ON components
    FOR SELECT USING (auth.role() = 'authenticated');


DROP POLICY IF EXISTS "Flows are viewable by everyone" ON flows;
CREATE POLICY "Flows are viewable by public" ON flows
    FOR SELECT USING (status = 'published');

CREATE POLICY "Flows are viewable by authenticated users" ON flows
    FOR SELECT USING (auth.role() = 'authenticated');


DROP POLICY IF EXISTS "Sources are viewable by everyone" ON sources;
CREATE POLICY "Sources are viewable by public" ON sources
    FOR SELECT USING (status = 'published');

CREATE POLICY "Sources are viewable by authenticated users" ON sources
    FOR SELECT USING (auth.role() = 'authenticated');
