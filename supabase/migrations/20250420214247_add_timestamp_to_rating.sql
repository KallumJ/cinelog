ALTER TABLE public.rating
ADD COLUMN "createdAt" timestamptz DEFAULT now();