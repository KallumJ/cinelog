<script lang="ts">
	import type { Media } from '$lib/tmdb/types';
	import MediaPoster from './MediaPoster.svelte';

	const { media }: { media: Media[] } = $props();
</script>

<div class="m-4 grid grid-cols-2 gap-4 sm:grid-cols-5 sm:gap-4">
	{#each media as { title, posterPath }}
		<MediaPoster {title} {posterPath} />
	{/each}
</div>
