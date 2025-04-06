import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "$env/static/private"
import type { Database, } from "./database.types";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY)
