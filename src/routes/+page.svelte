<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import type { HomePageProps } from './+page.server';
	import MediaPosterGrid from '$lib/components/media/MediaPosterGrid.svelte';
	import { parseMediaArray } from '$lib/tmdb/utils';

	let { data }: { data: HomePageProps } = $props();
</script>

<Tabs.Root class="w-full">
	<Tabs.List class="mx-auto grid w-11/12 grid-cols-2 sm:w-3/4">
		<Tabs.Trigger value="movies"><span class="mx-3">Movies</span>🎬</Tabs.Trigger>
		<Tabs.Trigger value="tv"><span class="mx-3">TV</span>📺</Tabs.Trigger>
	</Tabs.List>

	<Tabs.Content value="movies" class="mt-4">
		<MediaPosterGrid media={parseMediaArray(data.movies.results)} />
	</Tabs.Content>

	<Tabs.Content value="tv" class="mt-4">
		<MediaPosterGrid media={parseMediaArray(data.tvShows.results)} />
	</Tabs.Content>
</Tabs.Root>
