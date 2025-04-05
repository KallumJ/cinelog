<script lang="ts">
	import { MediaType, type Media } from '$lib/tmdb/types';
	import { getSrcForPath } from '$lib/tmdb/utils';
	import { BackdropSize } from 'tmdb-ts';
	import MediaPoster from './MediaPoster.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Carousel from '$lib/components/ui/carousel';
	import { Root } from '../ui/button/index';

	const { media }: { media: Media } = $props();

	const {
		posterPath,
		title,
		type,
		tmdbId,
		backdropPath,
		initalReleaseYear,
		tagline,
		description,
		otherInformation,
		productionCompanies
	} = media;
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
					<span class="flex items-center gap-2 sm:items-end sm:gap-4">
						<h1 class="text-lg font-bold sm:text-5xl md:text-6xl">{title}</h1>
						<p class="text-sm font-bold dark:text-gray-500 sm:text-xl md:text-2xl">
							{#if type === MediaType.Movie}
								{initalReleaseYear}
							{/if}
						</p>
					</span>
				</Card.Content>
			</Card.Root>
		</div>
	</div>
	<Card.Root class="my-4 p-4">
		<div class="sm:flex">
			<div>
				<p class="text-xl italic">{tagline}</p>
				<p class="my-4 text-lg">{description}</p>
			</div>
			<div class="mb-8">
				<div>
					{#each otherInformation as info}
						<p><span class="font-semibold">{info.displayText}:</span> {info.value}</p>
					{/each}
				</div>
				<p class="font-semibold">Production companies</p>
				<ul class="list-inside list-disc sm:w-96">
					{#each productionCompanies as { name }}
						<li>{name}</li>
					{/each}
				</ul>
			</div>
		</div>
		<div>
			<Carousel.Root>
				<Carousel.Content>
					<Carousel.Item class="basis-1/12">Test</Carousel.Item>
					<Carousel.Item class="basis-1/12">Test</Carousel.Item>
					<Carousel.Item class="basis-1/12">Test</Carousel.Item>
				</Carousel.Content>
				<Carousel.Previous />
				<Carousel.Next />
			</Carousel.Root>
		</div>
	</Card.Root>
</div>
