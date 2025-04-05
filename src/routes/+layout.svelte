<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';

	import NavSheet from '$lib/components/navigation/NavSheet.svelte';
	let { children } = $props();
</script>

<ModeWatcher />
<NavSheet />
<div class="mx-4 sm:mx-8">
	{@render children?.()}
</div>
