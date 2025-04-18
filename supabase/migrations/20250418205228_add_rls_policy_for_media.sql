-- Policy for SELECT
CREATE POLICY "Allow authenticated read access"
ON public.media
FOR SELECT
TO authenticated
USING (true);

-- Policy for INSERT
CREATE POLICY "Allow authenticated insert access"
ON public.media
FOR INSERT
TO authenticated
WITH CHECK (true);