<script lang="ts">
	import MediaPage, { type MediaPageProps } from "$lib/components/media/MediaPage.svelte";

    const { data }: { data: MediaPageProps } = $props();

    const {
        media,
        credits,
        watchProviders
    } = data
    
</script>

<MediaPage {media} {credits} {watchProviders} />