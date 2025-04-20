ALTER TABLE public.list ALTER COLUMN "userId" SET DEFAULT auth.uid();
ALTER TABLE public.watch ALTER COLUMN "userId" SET DEFAULT auth.uid();
ALTER TABLE public.rating ALTER COLUMN "userId" SET DEFAULT auth.uid();