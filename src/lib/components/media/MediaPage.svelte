<script lang="ts">
	import { MediaType, type Credits, type Media } from '$lib/tmdb/types';
	import { getSrcForPath } from '$lib/tmdb/utils';
	import { BackdropSize, ProfileSize } from 'tmdb-ts';
	import MediaPoster from './MediaPoster.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Carousel from '$lib/components/ui/carousel';
	import { cn, extractInitials } from '$lib/utils';
	import CastAvatar from './CastAvatar.svelte';

	export interface MediaPageProps {
		media: Media;
		credits: Credits;
	}

	const { media, credits }: MediaPageProps = $props();

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

	const { createdBy, cast, crew } = credits;
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
		<div class="w-full max-w-4xl sm:max-w-max mx-auto px-1 md:px-8 py-4 relative">
			<Carousel.Root class="w-full">
				<Carousel.Content class="-ml-4">
					{#each [...createdBy, ...cast, ...crew] as { profilePath, name, role }}
						<Carousel.Item class="basis-auto pl-4">
							<div class="flex flex-col items-center p-1 text-center">
								<Avatar.Root class="mb-2 h-20 w-20">
									<Avatar.Image src={getSrcForPath(profilePath, ProfileSize.W185)} alt={name} />
									<Avatar.Fallback>{extractInitials(name)}</Avatar.Fallback>
								</Avatar.Root>
								<span class="text-md block font-semibold">{name}</span>
								<span class="block text-sm text-muted-foreground">{role}</span>
							</div>
						</Carousel.Item>
					{/each}
				</Carousel.Content>
				<Carousel.Previous class="absolute left-2 md:-left-10 top-1/2 -translate-y-1/2 z-10 hidden md:inline-flex" />
				<Carousel.Next class="absolute right-2 md:-right-10 top-1/2 -translate-y-1/2 z-10 hidden md:inline-flex" />
			</Carousel.Root>
		</div>
	</Card.Root>
</div>
