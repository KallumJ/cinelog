<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import Plus from '@lucide/svelte/icons/plus';
	import Search from '@lucide/svelte/icons/search';
	import { Input } from '$lib/components/ui/input/';
	import { Button } from '$lib/components/ui/button';
	import type { CreateListSuperForm } from '$lib/forms/createListForm';
	import * as Card from '$lib/components/ui/card';
	import type { List } from '$lib/supabase/types';
	import { superForm } from 'sveltekit-superforms';
	import * as Alert from '$lib/components/ui/alert';
	import CircleAlert from '@lucide/svelte/icons/circle-alert';
	import MediaPoster from '$lib/components/media/MediaPoster.svelte';
	import { getSrcForPath } from '$lib/tmdb/utils';
	import { PosterSize } from 'tmdb-ts';

	interface ListsPageProps {
		lists: List[];
		createForm: CreateListSuperForm;
	}

	const { data }: { data: ListsPageProps } = $props();

	const { lists } = data;

	const { errors } = superForm(data.createForm);

	let creatingList = $state(false);
</script>

<div class="lg:mx-32">
	<form method="POST" action="?/create" class="mb-6">
		{#if creatingList}
			<span class="flex items-center gap-2">
				<Input name="listName" placeholder="Name of list..." aria-placeholder="Name of list..." />
				<Button type="submit">Create</Button>
			</span>
		{:else}
			{#if $errors.listName}
				<Alert.Root class="mb-4 space-x-2">
					<CircleAlert />
					<Alert.Title>Error</Alert.Title>
					<Alert.Description>
						{$errors.listName}
					</Alert.Description>
				</Alert.Root>
			{/if}
			<span class="flex w-full max-w-md items-center space-x-2">
				<Button class="mr-4" onclick={() => (creatingList = true)}><Plus /> Add a new list</Button>
				<Input placeholder="Search..." />
				<Button size="icon" class="w-32"><Search /></Button>
			</span>
		{/if}
	</form>

	<ScrollArea>
		{#if lists.length > 0}
			{#each lists as { id, name, topEntries }}
				<Card.Root class="mb-8">
					<Card.Header>
						<Card.Title
							><a class="cursor-pointer hover:underline" href={`/lists/${id}`}>{name}</a
							></Card.Title
						>
					</Card.Header>
					<Card.Content>
						{#if topEntries.length === 0}
							<p class="text-muted-foreground">No content yet! 😢</p>
						{:else}
							<ScrollArea orientation="horizontal">
								<span class="flex gap-4">
									{#each topEntries as { title, posterPath, type, tmdbId }}
										<MediaPoster
											class="w-32"
											posterPath={getSrcForPath(posterPath, PosterSize.W500)}
											{type}
											{title}
											{tmdbId}
										></MediaPoster>
									{/each}
								</span>
							</ScrollArea>
						{/if}
					</Card.Content>
				</Card.Root>
			{/each}
		{:else}
			You have no lists!
		{/if}
	</ScrollArea>
</div>
