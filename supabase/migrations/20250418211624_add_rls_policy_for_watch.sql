-- Policy for SELECT
CREATE POLICY "Allow access to own watch records"
ON public.watch
FOR ALL
-- For SELECT: Users can only see rows where their UID matches the userId column
-- For DELETE/UPDATE: Users can only affect rows where their UID matches the userId column
USING ( auth.uid() = "userId" )
-- For INSERT: New rows must have the userId column set to the inserter's UID
-- For UPDATE: Changes must ensure the userId column still matches the updater's UID
WITH CHECK ( auth.uid() = "userId" );
