CREATE POLICY "Allow all actions on user's own list entries"
ON public.listentry
FOR ALL
USING (
  EXISTS (
    SELECT 1
    FROM public.list
    WHERE list.id = "listId"
      AND list."userId" = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.list
    WHERE list.id = "listId"
      AND list."userId" = auth.uid()
  )
);