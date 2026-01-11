-- Relax RLS Policies to allow public viewing and contributor access

-- 1. Allow public read access (SELECT) for all core tables
DROP POLICY IF EXISTS "Components are viewable by authenticated users" ON components;
CREATE POLICY "Components are viewable by everyone" ON components FOR SELECT USING (true);

DROP POLICY IF EXISTS "Flows are viewable by authenticated users" ON flows;
CREATE POLICY "Flows are viewable by everyone" ON flows FOR SELECT USING (true);

DROP POLICY IF EXISTS "Flow Steps are viewable by authenticated users" ON flow_steps;
CREATE POLICY "Flow Steps are viewable by everyone" ON flow_steps FOR SELECT USING (true);

-- 2. Allow any authenticated user to insert (remove admin check)
-- This fixes the "new row violates row-level security policy" error for non-admin users
DROP POLICY IF EXISTS "Components are insertable by admins only" ON components;
CREATE POLICY "Components are insertable by authenticated users" ON components FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Flows are insertable by admins only" ON flows;
CREATE POLICY "Flows are insertable by authenticated users" ON flows FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Flow Steps are insertable by admins only" ON flow_steps;
CREATE POLICY "Flow Steps are insertable by authenticated users" ON flow_steps FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 3. Allow any authenticated user to update their own content (or all content for now)
DROP POLICY IF EXISTS "Components are updatable by admins only" ON components;
CREATE POLICY "Components are updatable by authenticated users" ON components FOR UPDATE USING (auth.role() = 'authenticated');
