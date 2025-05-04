<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { Media } from '$lib/tmdb/types';
	import { getMonthFromStringOrToday } from '$lib/utils';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';
	import MoveLeft from '@lucide/svelte/icons/move-left';
	import MoveRight from '@lucide/svelte/icons/move-right';
	import { format, getDaysInMonth, isSameDay, parse, previousDay, startOfMonth, getDate } from 'date-fns';

	const { data } = $props();

	let schedule = $state(getSchedule());

	async function getSchedule(): Promise<{ media: Media[]; date: Date }> {
		const month = data.month;
		const response = await fetch(`/api/schedule?month=${month}`);

		return await response.json();
	}

	const selectedMonth = getMonthFromStringOrToday(data.month);
	const daysInMonth = getDaysInMonth(selectedMonth);
	const monthText = format(selectedMonth, 'MMMM');
	const yearText = format(selectedMonth, 'yyyy');
</script>

{#await schedule}
	<span class="flex items-center gap-2">
		<LoaderCircle class="animate-spin" size={36} />
		<p class="text-4xl text-muted-foreground">Loading...</p>
	</span>
{:then schedule}
	<span class="mb-4 flex gap-4">
		<h1 class="text-3xl font-bold">{monthText} {yearText}</h1>
		<Button
			onclick={() => {
				let query = new URLSearchParams($page.url.searchParams.toString());

				const startOfSelectedMonth = startOfMonth(selectedMonth);
				const startOfPreviousMonth = startOfMonth(previousDay(startOfSelectedMonth, 1));

				query.set('month', format(startOfPreviousMonth, 'MM-yyyy'));

				goto(`?${query.toString()}`);
			}}><MoveLeft /></Button
		>
		<Button><MoveRight /></Button>
	</span>

	<div class="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7">
		{#each { length: daysInMonth }, i}
            {@const currentDate = parse(`${i + 1} ${monthText} ${yearText}`, 'dd MMMM yyyy', new Date())}
			<div class="h-48 w-full border border-white">
				<h1>{getDate(currentDate)}</h1>
                
				{#each schedule.media.filter( (m) => isSameDay(m.initalReleaseDate, currentDate)) as { title }}
					<p>{title}</p>
				{/each}
			</div>
		{/each}
	</div>
{/await}
