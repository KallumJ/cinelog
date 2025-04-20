<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import Plus from '@lucide/svelte/icons/plus';
	import Search from '@lucide/svelte/icons/search';
	import { Input } from '$lib/components/ui/input/';
	import { Button } from '$lib/components/ui/button';
	import type { CreateListSuperForm } from '$lib/forms/createListForm';
	import * as Card from '$lib/components/ui/card';
	import type { List } from '$lib/supabase/types';

	interface ListsPageProps {
		lists: List[];
		createForm: CreateListSuperForm;
	}

	const { data }: { data: ListsPageProps } = $props();

	const { lists } = data;

	let creatingList = $state(false);
</script>

<div class="lg:mx-32">
	<form method="POST" action="?/create">
		{#if creatingList}
			<span class="flex items-center gap-2">
				<Input name="listName" placeholder="Name of list..." aria-placeholder="Name of list..." />
				<Button type="submit">Create</Button>
			</span>
		{:else}
			<span class="flex w-full max-w-md items-center space-x-2">
				<Button class="mr-4" onclick={() => (creatingList = true)}><Plus /> Add a new list</Button>
				<Input placeholder="Search..." />
				<Button size="icon" class="w-32"><Search /></Button>
			</span>
		{/if}
	</form>

	<ScrollArea>
		{#if lists.length > 0}
			{#each lists as { name, topEntries }}
				<Card.Root>
					<Card.Header>
						<Card.Title>{name}</Card.Title>
					</Card.Header>
					<Card.Content>

						{#if topEntries.length === 0}
							<p class="text-muted-foreground">No content yet!</p>
						{:else}
							{#each topEntries as { title, poster }}
								<p>{title}</p>
							{/each}
						{/if}
					</Card.Content>
				</Card.Root>
			{/each}
		{:else}
			You have no lists!
		{/if}
	</ScrollArea>
</div>
