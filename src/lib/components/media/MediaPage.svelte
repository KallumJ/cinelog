<script lang="ts">
	import { MediaType, type Media } from '$lib/tmdb/types';
	import { getSrcForPath } from '$lib/tmdb/utils';
	import { BackdropSize } from 'tmdb-ts';
	import MediaPoster from './MediaPoster.svelte';
	import * as Card from '$lib/components/ui/card';

	const { media }: { media: Media } = $props();

	const { posterPath, title, type, tmdbId, backdropPath, initalReleaseYear } = media;
</script>

<div>
	<div class="flex gap-4">
		<MediaPoster {posterPath} {title} {type} {tmdbId} clickable={false} class="w-96" />
		<div
			class="relative flex w-full items-end rounded-lg bg-cover bg-center p-2"
			style={`background-image: url(${getSrcForPath(backdropPath, BackdropSize.ORIGINAL)})`}
		>
			<div class="absolute inset-0 bg-black opacity-50"></div>
			<Card.Root class="z-10">
				<Card.Content class="p-2 sm:p-6">
					<span class="flex items-center sm:items-end gap-2 sm:gap-4">
						<h1 class="md:text-6xl sm:text-5xl text-lg font-bold">{title}</h1>
						<p class="dark:text-gray-500 md:text-2xl sm:text-xl text-sm font-bold">
							{#if type === MediaType.Movie}
								{initalReleaseYear}
							{/if}
						</p>
					</span>
				</Card.Content>
			</Card.Root>
		</div>
	</div>
</div>
