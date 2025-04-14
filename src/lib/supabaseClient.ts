import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "$env/static/private"
import type { Database, } from "./database.types";
import type { WatchFormSchema } from "./forms/watchForm.js";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY)

export async function getOrCreateWatch(watch: WatchFormSchema) {
    const { data: getData, error: getError } = await supabase.from("watch")
        .select("id")
        .eq("tmdbId", watch.tmdbId)
        .eq("type", watch.type)
        .maybeSingle()

    if (getError) {
        throw getError;
    }

    if (getData) {
        return getData;
    }

    const { data, error } = await supabase.from("watch")
        .insert([{ ...watch }])
        .select("id")
        .single();

    if (error) {
        throw error;
    }

    return data;
}
