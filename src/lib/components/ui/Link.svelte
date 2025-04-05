<script lang="ts">
	import { cn } from "$lib/utils";
	import type { Snippet } from "svelte";
	import type { HTMLAnchorAttributes } from "svelte/elements";

    const props: HTMLAnchorAttributes & { children: Snippet<[]> } = $props()
</script>

<a class={cn(props.class, "text-blue-500 underline")} {...props}>
    {@render props.children?.()}
</a>