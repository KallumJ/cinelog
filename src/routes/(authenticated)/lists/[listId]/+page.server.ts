import { error, redirect } from "@sveltejs/kit";
import { getListsForUser, getMediaInfoForId } from "$lib/supabase/index";
import type { Media } from "$lib/tmdb/types";

export async function load({ locals: { supabase, session }, params }) {
	if (!session) redirect(307, '/');
    try {
        const lists = await getListsForUser(supabase, session)

        const list = lists.find(l => l.id.toString() === params.listId)

        if (!list) {
            return error(500)
        }

        const media: Media[] = await Promise.all(list.allMedia.map(m => getMediaInfoForId(m, supabase)));

        return {
            list,
            media
        }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        return redirect(307, "/lists")
    }
}