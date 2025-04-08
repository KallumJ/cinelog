<script lang="ts">
	import { getSrcForPath } from '$lib/tmdb/utils';
	import { cn, preload } from '$lib/utils';
	import { fly } from 'svelte/transition';
	import { PosterSize } from 'tmdb-ts';


	const { posterPath, title, type, tmdbId, clickable = true, class: className = "" } = $props();

	const src = getSrcForPath(posterPath, PosterSize.W780);
</script>

<div class={cn("overflow-hidden rounded-lg bg-gradient-to-b from-slate-800 to-slate-600 shadow-lg transition-all", className, { "hover:scale-105": clickable,  }, )}>
	<a href={clickable ? `${type}/${tmdbId}` : undefined} draggable="false" class="select-none">
		{#if src === null}
			<div class="w-full h-full flex justify-center items-center text-shadow-sm">
				<p class="text-center text-xl sm:text-4xl font-bold w-5/6">{title}</p>
			</div>
		{:else}
			{#await preload(src) then _}
				<img in:fly {src} alt="{title} Poster" loading="lazy" draggable="false" class="h-full w-full" />
			{/await}
		{/if}
	</a>
</div>
