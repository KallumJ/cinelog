<script lang="ts">
	import { badgeVariants } from '$lib/components/ui/badge/badge.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { MediaType } from '$lib/tmdb/types';
	import { cn, getMonthFromStringOrToday } from '$lib/utils';
	import MoveLeft from '@lucide/svelte/icons/move-left';
	import MoveRight from '@lucide/svelte/icons/move-right';
	import { format, getDaysInMonth, isSameDay, parse, previousDay, startOfMonth, getDate, lastDayOfMonth, nextDay, subMonths, addMonths } from 'date-fns';

	const { data } = $props();

	const schedule = data.schedule;
	const selectedMonth = getMonthFromStringOrToday(data.month);
	const daysInMonth = getDaysInMonth(selectedMonth);
	const monthText = format(selectedMonth, 'MMMM');
	const yearText = format(selectedMonth, 'yyyy');

	const startOfSelectedMonth = startOfMonth(selectedMonth);
	const startOfPreviousMonth = subMonths(startOfSelectedMonth, 1);
	const startOfNextMonth = addMonths(startOfSelectedMonth, 1)
</script>

<span class="mb-4 flex gap-4">
	<Button href="/schedule" data-sveltekit-reload>Today</Button>
	<h1 class="text-3xl font-bold">{monthText} {yearText}</h1>
	<Button href={`/schedule?month=${format(startOfPreviousMonth, 'MM-yyyy')}`} data-sveltekit-reload><MoveLeft /></Button>
	<Button href={`/schedule?month=${format(startOfNextMonth, "MM-yyyy")}`} data-sveltekit-reload><MoveRight /></Button>
</span>

<div class="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7">
	{#each { length: daysInMonth }, i}
		{@const currentDate = parse(`${i + 1} ${monthText} ${yearText}`, 'dd MMMM yyyy', new Date())}
		<div class="min-h-48 w-full border border-muted-foreground flex flex-col">
			<h1 class="bg-foreground text-background p-1 font-bold mb-2">{getDate(currentDate)}</h1>
			
			{#each schedule.media.filter( (m) => isSameDay(m.initalReleaseDate, currentDate)) as { title, type, tmdbId }}
				{@const emoji = type === MediaType.Movie ? "🎬" : "📺"}
				<a href={`/${type}/${tmdbId}`} class={cn(badgeVariants({ variant: "secondary" }), "m-1 text-sm rounded-sm overflow-hidden")}>{emoji}{" "}{title}</a>
			{/each}
		</div>
	{/each}
</div>
