<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';

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
</script>

<ModeWatcher />
<NavSheet />
<div class="mx-4 sm:mx-8">
	{@render children?.()}
</div>
