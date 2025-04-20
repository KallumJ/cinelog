ALTER TABLE public.list
ADD CONSTRAINT unique_userid_name
UNIQUE ("userId", "name");