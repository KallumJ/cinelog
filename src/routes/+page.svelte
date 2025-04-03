<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import type { HomePageProps } from './+page.server';
	import MediaPoster from '$lib/components/media/MediaPoster.svelte';

	let { data }: { data: HomePageProps } = $props();
</script>

<Tabs.Root class="w-full">
	<Tabs.List class="mx-auto grid w-11/12 grid-cols-2 sm:w-3/4">
		<Tabs.Trigger value="movies"><span class="mx-3">Movies</span>🎬</Tabs.Trigger>
		<Tabs.Trigger value="tv"><span class="mx-3">TV</span>📺</Tabs.Trigger>
	</Tabs.List>

	<Tabs.Content value="movies" class="mt-4">
		<div class="m-4 grid grid-cols-2 gap-4 sm:grid-cols-5 sm:gap-4">
			{#each data.movies.results as { title, poster_path }}
				<MediaPoster {title} {poster_path} />
			{/each}
		</div>
	</Tabs.Content>

	<Tabs.Content value="tv" class="mt-4">
		<div class="m-4 grid grid-cols-2 gap-4 sm:grid-cols-5 sm:gap-4">
			{#each data.tvShows.results as { name, poster_path }}
				<MediaPoster title={name} {poster_path} />
			{/each}
		</div>
	</Tabs.Content>
</Tabs.Root>
