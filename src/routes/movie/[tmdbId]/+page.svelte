<script lang="ts">
	import MediaPage, { type MediaPageProps } from "$lib/components/media/MediaPage.svelte";

    const { data }: { data: MediaPageProps } = $props();
</script>

<MediaPage media={data.media} credits={data.credits} />