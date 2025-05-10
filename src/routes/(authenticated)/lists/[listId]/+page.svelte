<script lang="ts">
	import MediaPosterGrid from '$lib/components/media/MediaPosterGrid.svelte';
	import { Button } from '$lib/components/ui/button/index';
	import { Input } from '$lib/components/ui/input/index';
	import type { List } from '$lib/supabase/types';
	import type { Media } from '$lib/tmdb/types';
	import Search from '@lucide/svelte/icons/search';

	const { data }: { data: { media: Media[]; list: List } } = $props();
</script>

<span class="flex gap-4">
	<h1 class="mx-3 text-3xl font-bold">{data.list.name}</h1>
	<Input placeholder="Search..." />
	<Button size="icon" class="w-32"><Search /></Button>
</span>

{#if data.media.length > 0}
	<MediaPosterGrid media={data.media} />
{:else}
	<p class="text-center my-4 text-3xl text-muted-foreground font-semibold w-full">There is no content in this list... Add some 🙂</p>
{/if}
