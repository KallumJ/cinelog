-- First, create the ENUM type (if supported by your database)
CREATE TYPE MEDIATYPE AS ENUM ('movie', 'tv');

create table public.profiles (  
    id uuid not null references auth.users on delete cascade,  
    primary key (id)
);
alter table public.profiles enable row level security;

-- inserts a row into public.profiles
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin  
    insert into public.profiles (id)  values (new.id);  
    return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created  
    after insert on auth.users  
    for each row execute procedure public.handle_new_user();


-- Create the 'media' table
CREATE TABLE public.media (
  "id" SERIAL PRIMARY KEY,
  "tmdbId" BIGINT,
  "type" MEDIATYPE,
  UNIQUE ("tmdbId", "type")
);

-- Create the 'list' table
CREATE TABLE public.list (
  "id" SERIAL PRIMARY KEY,
  "userId" uuid,
  "name" TEXT,
  FOREIGN KEY ("userId") REFERENCES public.profiles ("id") ON DELETE CASCADE
);
ALTER TABLE public.list ENABLE ROW LEVEL SECURITY;

-- Create the 'watch' table (references 'media' and 'user')
CREATE TABLE public.watch (
  "id" SERIAL PRIMARY KEY,
  "mediaId" BIGINT,
  "userId" uuid,
  "createdAt" timestamptz default now(),
  FOREIGN KEY ("mediaId") REFERENCES "media" ("id") ON DELETE CASCADE,
    FOREIGN KEY ("userId") REFERENCES public.profiles ("id") ON DELETE CASCADE
);
ALTER TABLE public.watch ENABLE ROW LEVEL SECURITY;

-- Create the 'rating' table (references 'media' and 'user')
CREATE TABLE public.rating (
  "id" SERIAL PRIMARY KEY,
  "mediaId" BIGINT,
  "userId" uuid,
  "rating" INTEGER,
  FOREIGN KEY ("mediaId") REFERENCES "media" ("id") ON DELETE CASCADE,
  FOREIGN KEY ("userId") REFERENCES public.profiles ("id") ON DELETE CASCADE,
  UNIQUE ("mediaId", "userId")
);
ALTER TABLE public.rating ENABLE ROW LEVEL SECURITY;

-- Create the 'listEntry' table (references 'media' and 'list')
CREATE TABLE public.listEntry (
  "id" SERIAL PRIMARY KEY,
  "mediaId" BIGINT,
  "listId" BIGINT,
  FOREIGN KEY ("mediaId") REFERENCES "media" ("id") ON DELETE CASCADE, 
  FOREIGN KEY ("listId") REFERENCES "list" ("id") ON DELETE CASCADE,  
  UNIQUE ("mediaId", "listId")
);
ALTER TABLE public.listEntry ENABLE ROW LEVEL SECURITY;



