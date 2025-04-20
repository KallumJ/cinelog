import { fail, redirect, type Actions } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { createListSchema } from '$lib/forms/createListForm';
import { zod } from 'sveltekit-superforms/adapters';
import { getListsForUser } from '$lib/supabase/index';
import { addMediaToListSchema } from '../../../lib/forms/addMediaToListForm.js';

export async function load({ locals: { supabase, session } }) {
	if (!session) redirect(307, '/');

	const lists = await getListsForUser(supabase, session)

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
	},
    addMedia: async ({ request, locals: { supabase, session }}) => {
        const form = await superValidate(request, zod(addMediaToListSchema));
        
        if (!session) {
            return fail(401, { form })
        }

        if (!form.valid) {
            return fail(500, { form })
        }

        const { listId, mediaId } = form.data 

        const { error } = await supabase.from("listentry").insert({ mediaId, listId })

        if (error) {
            console.error(error)
            return fail(500, { form })
        }

        return message(form, "Successfully added media to list")
    }
} satisfies Actions;