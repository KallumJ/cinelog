import { fail, redirect, type Actions } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { createListSchema } from '$lib/forms/createListForm';
import { zod } from 'sveltekit-superforms/adapters';
import type { List } from '$lib/supabase/types';
import { getMediaInfoForId } from '$lib/supabase/index';

export async function load({ locals: { supabase, session } }) {
	if (!session) redirect(307, '/');

	const { data: getListsData, error: getListsError } = await supabase
		.from('list')
		.select('*')
		.match({ userId: session.user.id });

	if (getListsError) {
        return fail(500)
	}

    const lists: List[] = []
    for (const { id, name } of getListsData) {
        const { data: entriesData, error: entriesError } = await supabase.from("listentry").select("*").match({ listId: id }).limit(10)

        if (entriesError) {
            return fail(500);
        }

        const topEntries = []
        for (const entry of entriesData ?? []) {
            const { title, posterPath } = await getMediaInfoForId(entry.mediaId, supabase);
            topEntries.push({ title, poster: posterPath})
        } 

        lists.push({ name, topEntries })
    }

    const createForm = await superValidate(zod(createListSchema))

	return {
		lists,
        createForm
	};
}

export const actions = {
	create: async ({ request, locals: { supabase, session }}) => {

		const form = await superValidate(request, zod(createListSchema))

        if (!session) {
            return fail(401, { form })
        }

        if (!form.valid) {
            return fail(500, { form })
        }

        const { listName } = form.data;

        const { error } = await supabase.from("list").insert({ name: listName })

        if (error) {
            return fail(500, { form })
        }

        return message(form, "Created list successfully")
	}
} satisfies Actions;