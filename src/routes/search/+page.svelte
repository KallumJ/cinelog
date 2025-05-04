<script lang="ts">
	import { Button } from '$lib/components/ui/button/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import Search from '@lucide/svelte/icons/search';
	import * as Pagination from '$lib/components/ui/pagination/';
	import { debounce } from '$lib/utils';
	import type { SearchResultsResponse } from '$lib/tmdb/types';
	import MediaPosterGrid from '$lib/components/media/MediaPosterGrid.svelte';

	let selectedType = $state('movie');
	let query = $state('');
	let page = $state(1);
	let results = $state<SearchResultsResponse | null>(null);

	async function handleSearch() {
		if (!query) {
			results = null;
			return;
		}

		const url = `/api/search/${selectedType}?q=${query}&page=${page}`;
		const response = await fetch(url);
		results = (await response.json()) as SearchResultsResponse;
	}
</script>

<div class="sm:flex gap-4">
	<RadioGroup.Root
		class="flex gap-4"
		bind:value={selectedType}
		onValueChange={() => {
			page = 1;
			handleSearch();
		}}
	>
		<div class="flex items-center space-x-2">
			<RadioGroup.Item value="movie" id="movie" />
			<Label for="movie">🎬 Movies</Label>
		</div>
		<div class="flex items-center space-x-2">
			<RadioGroup.Item value="tv" id="tv" />
			<Label for="tv">📺 TV Shows</Label>
		</div>
	</RadioGroup.Root>
	<span class="flex gap-2 mt-4 sm:mt-0">
		<Input placeholder="Search..." bind:value={query} onkeyup={debounce(handleSearch)} />
		<Button size="icon" class="w-12"><Search /></Button>
	</span>
</div>

{#if results}
	{#if results.media.length > 0}
		{#key results.media}
			<MediaPosterGrid media={results.media} />
		{/key}
		<Pagination.Root
			count={results.totalPages}
			perPage={20}
			bind:page
			onPageChange={() => {
				handleSearch();
			}}
		>
			{#snippet children({ pages, currentPage })}
				<Pagination.Content>
					<Pagination.Item>
						<Pagination.PrevButton />
					</Pagination.Item>
					{#each pages as page (page.key)}
						{#if page.type === 'ellipsis'}
							<Pagination.Item>
								<Pagination.Ellipsis />
							</Pagination.Item>
						{:else}
							<Pagination.Item>
								<Pagination.Link {page} isActive={currentPage === page.value}>
									{page.value}
								</Pagination.Link>
							</Pagination.Item>
						{/if}
					{/each}
					<Pagination.Item>
						<Pagination.NextButton />
					</Pagination.Item>
				</Pagination.Content>
			{/snippet}
		</Pagination.Root>
	{:else}
		<p class="my-4 w-full text-center text-3xl font-semibold text-muted-foreground">
			No results 🥲
		</p>
	{/if}
{:else}
	<p class="my-4 w-full text-center text-3xl font-semibold text-muted-foreground">
		Make a search! 🔍
	</p>
{/if}
