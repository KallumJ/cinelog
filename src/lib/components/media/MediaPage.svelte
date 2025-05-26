<script lang="ts">
	import { MediaType, type Credits, type Media, type WatchProviderRegion } from '$lib/tmdb/types';
	import { getSrcForPath } from '$lib/tmdb/utils';
	import { BackdropSize, ProfileSize, type Video } from 'tmdb-ts';
	import MediaPoster from './MediaPoster.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Carousel from '$lib/components/ui/carousel';
	import { cn, extractInitials } from '$lib/utils';
	import WatchProviders from './WatchProviders.svelte';
	import { superForm } from 'sveltekit-superforms';
	import type { WatchSuperForm } from '$lib/forms/watchForm';
	import Eye from '@lucide/svelte/icons/eye';
	import type { Session } from '@supabase/supabase-js';
	import StarRating from '../ui/rating/StarRating.svelte';
	import type { RatingSuperForm } from '$lib/forms/ratingForm';
	import * as Popover from '$lib/components/ui/popover';
	import Button from '../ui/button/button.svelte';
	import Plus from '@lucide/svelte/icons/plus';
	import Check from '@lucide/svelte/icons/check';
	import ScrollArea from '../ui/scroll-area/scroll-area.svelte';
	import type { List } from '$lib/supabase/types';
	import type { SubmitMediaToListSuperForm } from '$lib/forms/submitMediaToListForm';
	import { Badge } from '$lib/components/ui/badge/';
	import { Youtube } from 'svelte-youtube-lite';

	export interface MediaPageControls {
		mediaId?: number;
		isWatched: boolean;
		watchForm: WatchSuperForm;
		rateForm: RatingSuperForm;
		submitMediaToListForm: SubmitMediaToListSuperForm;
		lists: List[];
	}

	export interface MediaPageProps {
		media: Media;
		credits: Credits;
		watchProviders: WatchProviderRegion[];
		controls: MediaPageControls;
		session: Session | null;
		trailer: Video | undefined;
	}

	const data: MediaPageProps = $props();
	const { media, credits, watchProviders, controls, session, trailer } = data;

	const {
		posterPath,
		title,
		type,
		tmdbId,
		backdropPath,
		initalReleaseYear,
		recentReleaseYear,
		tagline,
		description,
		otherInformation,
		productionCompanies,
		aggregateRating,
		genres
	} = media;

	const { createdBy, cast, crew } = credits;

	const { form: watchForm, enhance: watchFormEnhance } = superForm(controls.watchForm);

	const { form: rateForm, enhance: rateFormEnhance } = superForm(controls.rateForm);

	const { form: addMediaToListForm, enhance: addMediaFormEnhance } = superForm(
		controls.submitMediaToListForm
	);

	let isWatched = $state(controls.isWatched);

	const onToggleWatched = () => {
		isWatched = !isWatched;
	};

	const { lists } = controls;
	let mediaInLists = $derived(
		lists.filter((l) => l.allMedia.includes($watchForm.mediaId)).map((l) => l.id)
	);
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
					<div class="mb-2 mr-2 flex items-center gap-3 md:gap-6">
						<div
							class={cn('w-fit rounded-lg bg-yellow-600 p-2 sm:p-4 sm:px-5', {
								'bg-green-500': aggregateRating >= 70,
								'bg-red-500': aggregateRating <= 40,
								"bg-gray-600": aggregateRating === 0
							})}
						>
							<p class="text-lg font-bold sm:text-2xl">{aggregateRating === 0 ? "??" : aggregateRating}</p>
						</div>
						{#if session}
							<form method="POST" action="/?/watch" use:watchFormEnhance onsubmit={onToggleWatched}>
								<input type="hidden" name="mediaId" bind:value={$watchForm.mediaId} />
								<button>
									<Eye class={cn('sm:h-10 sm:w-10', { invert: isWatched })} fill="black" />
								</button>
							</form>
							<form method="POST" action="/?/rate" use:rateFormEnhance>
								<input type="hidden" name="mediaId" bind:value={$rateForm.mediaId} />
								<StarRating initialRating={$rateForm.rating} />
							</form>
							<Popover.Root>
								<Popover.Trigger>
									<Button size="icon"><Plus /></Button>
								</Popover.Trigger>
								<Popover.Content>
									{#if lists.length > 0}
										<h1 class="mb-2 font-bold text-muted-foreground">Add or remove from list:</h1>
										<ScrollArea>
											<form
												method="POST"
												action="/lists/?/submit"
												use:addMediaFormEnhance
												class="flex flex-col"
											>
												<ul>
													{#each lists as { name, id }}
														<li class="flex items-center gap-2">
															<span>
																<input
																	type="radio"
																	id={id.toString()}
																	value={id}
																	name="listId"
																	class="hidden appearance-none"
																	onchange={(event) => {
																		// event.target is the radio input
																		// event.target.form is the form element it belongs to
																		if (
																			event.target instanceof HTMLInputElement &&
																			event.target.form
																		) {
																			event.target.form.requestSubmit();
																		}
																	}}
																	onclick={() => {
																		if (mediaInLists.includes(id)) {
																			mediaInLists = mediaInLists.filter((l) => l != id);
																		} else {
																			mediaInLists = [...mediaInLists, id];
																		}
																	}}
																/>
																<label
																	class={cn('cursor-pointer hover:underline', {
																		'font-bold': mediaInLists.includes(id)
																	})}
																	for={id.toString()}>{name}</label
																>
															</span>
															{#if mediaInLists.includes(id)}<Check size={16} class="mt-1" />{/if}
														</li>
													{/each}
												</ul>
												<input type="hidden" value={$watchForm.mediaId} name="mediaId" />
											</form>
										</ScrollArea>
									{:else}
										<h1 class="mb-2 font-bold text-muted-foreground">You have no lists!</h1>
									{/if}
									<Button variant="link" href="/lists" class="p-0">Go to all lists...</Button>
								</Popover.Content>
							</Popover.Root>
						{/if}
					</div>
					<span class="flex items-center gap-2 sm:items-end sm:gap-4">
						<h1 class="text-lg font-bold sm:text-5xl md:text-6xl">{title}</h1>
						<p class="text-sm font-bold dark:text-gray-500 sm:text-xl md:text-2xl">
							{#if type === MediaType.Movie}
								{initalReleaseYear}
							{:else}
								{initalReleaseYear} - {recentReleaseYear}
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
				<span>
					<p class="text-xl italic">{tagline}</p>
					{#each genres as { name }}
						<Badge class="mr-1 mt-3" variant="secondary">{name}</Badge>
					{/each}
				</span>

				<p class="my-3 text-lg">{description}</p>
				{#if trailer}
					<div class="my-8">
						<Youtube id={trailer.key} thumbnail="maxresdefault"/>
					</div>
				{/if}
			</div>
			<div class="mb-8 ml-auto">
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
		<div class="relative w-full max-w-4xl px-1 py-4 sm:max-w-max md:px-8">
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
				<Carousel.Previous
					class="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 md:-left-10 md:inline-flex"
				/>
				<Carousel.Next
					class="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 md:-right-10 md:inline-flex"
				/>
			</Carousel.Root>
		</div>
		<WatchProviders {watchProviders} />
	</Card.Root>
</div>
