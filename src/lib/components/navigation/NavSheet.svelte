<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet/index';
	import { buttonVariants } from '$lib/components/ui/button/index';
	import Clapperboard from '@lucide/svelte/icons/clapperboard';
	import Menu from '@lucide/svelte/icons/menu';
	import DarkModeToggle from '$lib/components/DarkModeToggle.svelte';
</script>

<span class="m-4 flex items-center gap-4">
	<span class="flex items-center gap-2">
		<Clapperboard />
		<h1 class="text-xl font-bold">Cinelog</h1>
	</span>
	<div class="ml-auto">
		<Sheet.Root>
			<Sheet.Trigger class={buttonVariants({ variant: 'outline' })}>
				<Menu />
			</Sheet.Trigger>
			<Sheet.Content side="right">
				<DarkModeToggle />
			</Sheet.Content>
		</Sheet.Root>
	</div>
</span>
