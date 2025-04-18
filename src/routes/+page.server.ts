import { tmdb } from '$lib/tmdb/tmdb';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { MoviesPlayingNow, OnTheAir } from 'tmdb-ts';
import { watchFormSchema } from '$lib/forms/watchForm';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Provider, SupabaseClient } from '@supabase/supabase-js';
import { getOrCreateMedia, getWatchForMediaIfToday } from '$lib/supabase';

export interface HomePageProps {
	movies: MoviesPlayingNow;
	tvShows: OnTheAir;
}

export async function load({ setHeaders }): Promise<HomePageProps> {
	const movies = await tmdb.movies.nowPlaying();
	const tvShows = await tmdb.tvShows.onTheAir();

	setHeaders({
		'cache-control': 'private, max-age=3600'
	});

	return {
		movies,
		tvShows
	};
}

export const actions: Actions = {
	watch: async ({ request, locals: { supabase, session } }) => {
		const form = await superValidate(request, zod(watchFormSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		if (!session) {
			return fail(401, { form });
		}

		const { tmdbId, type } = form.data;

		const media = await getOrCreateMedia(tmdbId, type, supabase);

		const { data: alreadyWatchedToday, error: alreadyWatchedError } = await getWatchForMediaIfToday(
			media.id,
			session.user.id,
			supabase
		);

		if (alreadyWatchedError) {
			return fail(500, { form });
		}

		if (alreadyWatchedToday) {
			await supabase.from('watch').delete().eq('id', alreadyWatchedToday.id);
		} else {
			await supabase.from('watch').insert({ mediaId: media.id, userId: session.user.id });
		}

		return message(form, 'Form posted successfully');
	},
	loginWithDiscord: async ({ url, locals: { supabase } }) => {
		return authenticate(supabase, url, 'discord');
	},
	loginWithGitHub: async ({ url, locals: { supabase } }) => {
		return authenticate(supabase, url, 'github');
	},
	signout: async ({ locals: { supabase } }) => {
		await supabase.auth.signOut();
		redirect(303, '/');
	}
};

async function authenticate(supabase: SupabaseClient, url: URL, provider: Provider) {
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider,
		options: {
			redirectTo: `${url.origin}/auth/callback`
		}
	});

	if (error) {
		return fail(error.status ?? 400, { error: error.message });
	}

	if (data.url) {
		redirect(303, data.url);
	}
}
