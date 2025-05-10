<script lang="ts">
	import JustWatchLink from '$lib/components/navigation/JustWatchLink.svelte';
	import * as Select from '$lib/components/ui/select';
	import { ProviderCategory, type WatchProviderRegion } from '$lib/tmdb/types';
	import { Label } from '$lib/components/ui/label';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { getSrcForPath } from '$lib/tmdb/utils';
	import { LogoSize } from 'tmdb-ts';
	import Link from '$lib/components/ui/Link.svelte';

	const { watchProviders }: { watchProviders: WatchProviderRegion[] } = $props();

	const firstProvider = watchProviders[0] ?? undefined;

	let selectedCountryCode = $state(firstProvider?.locale);
	let selectedRegion = $derived(watchProviders.find((p) => p.locale === selectedCountryCode));

	let selectedCategory = $state(ProviderCategory.Stream);

	let selectedProvider = $derived(
		selectedRegion?.[
			selectedCategory.toLowerCase() as keyof Pick<WatchProviderRegion, 'stream' | 'buy' | 'rent'>
		] ?? []
	);
</script>

<div>
	<span class="flex items-center">
		<h1 class="text-2xl font-bold">Providers</h1>
		<img
			class="pointer-events-none mx-4 w-24 select-none sm:w-32"
			src="https://www.themoviedb.org/assets/2/v4/logos/justwatch-c2e58adf5809b6871db650fb74b43db2b8f3637fe3709262572553fa056d8d0a.svg"
			alt="JustWatch Logo"
		/>
	</span>
	<p class="mb-4 mt-2 sm:w-1/2">
		Information is provided by <JustWatchLink />.
		<JustWatchLink /> helps you easily disocver where to legally stream your favorite movies and TV shows
		online. For more details, visit
		<JustWatchLink />. For further attribution, see our
		<Link href="/attribution">attribution page</Link>.
	</p>
	{#if watchProviders.length > 0}
		<span class="flex gap-4">
			<Select.Root type="single" bind:value={selectedCountryCode}>
				<Select.Trigger class="w-96 py-6"
					>{selectedRegion?.countryFlag}
					{selectedRegion?.countryName}</Select.Trigger
				>
				<Select.Content>
					{#each watchProviders as { countryFlag, countryName, locale }}
						<Select.Item value={locale}>{countryFlag} {countryName}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
			<RadioGroup.Root class="flex" bind:value={selectedCategory}>
				{#each Object.keys(ProviderCategory) as category}
					<div class="flex items-center space-x-2">
						<RadioGroup.Item value={category} id={category} />
						<Label for={category}>{category}</Label>
					</div>
				{/each}
			</RadioGroup.Root>
		</span>
		<div>
			{#if selectedProvider.length > 0}
				<div
					class="my-4 grid grid-cols-2 gap-y-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7"
				>
					{#each selectedProvider as { logoPath, name }}
						<div class="flex items-center gap-4">
							<img
								class="w-12 rounded-full"
								src={getSrcForPath(logoPath, LogoSize.W500)}
								alt={name}
							/>
							<p class="font-semibold">{name}</p>
						</div>
					{/each}
				</div>
			{:else}
				<h1 class="my-4 text-xl font-semibold">
					This content is not available to {selectedCategory.toLowerCase()} in {selectedRegion?.countryName}
				</h1>
			{/if}
			<a class="text-underline text-blue-500" href={selectedRegion?.link}
				>Click here for more details</a
			>
		</div>
	{:else}
		<h1 class="my-8 text-2xl">No providers available in any region</h1>
	{/if}
</div>
