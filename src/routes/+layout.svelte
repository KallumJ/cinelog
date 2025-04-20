<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import { page } from '$app/state';
	import NavSheet from '$lib/components/navigation/NavSheet.svelte';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	let { data, children } = $props();
	let { session, supabase } = $derived(data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});
		return () => data.subscription.unsubscribe();
	});

	const metadata = {
		title: "Cinelog",
		description: "Track and the media you watch. Your personal media diary.",
		currentUrl: page.url,
		image: "https://cinelog.andromeda.kallumj.xyz/favicon.png",
		imageAlt: "Cinelog logo"
	}
</script>

<svelte:head>
	<title>{metadata.title}</title>

	<meta name="description" content={metadata.description} />
  
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={metadata.title} />
	<meta property="og:url" content={metadata.currentUrl.toString()} />
	<meta property="og:title" content={metadata.title} />
	<meta property="og:description" content={metadata.description} />
	<meta property="og:image" content={metadata.image} />
	<meta property="og:image:alt" content={metadata.imageAlt} />
	<meta property="og:locale" content="en_GB" />
  
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={metadata.title} />
	<meta name="twitter:description" content={metadata.description} />
	<meta name="twitter:image" content={metadata.image} />
	<meta name="twitter:image:alt" content={metadata.imageAlt} />
  
	<link rel="canonical" href={metadata.currentUrl.toString()} />
</svelte:head>

<ModeWatcher />
<NavSheet session={session}/>
<div class="mx-4 sm:mx-8">
	{@render children?.()}
</div>
