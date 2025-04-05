<script lang="ts">
	import MediaPage from "$lib/components/media/MediaPage.svelte";
    import type { MoviePageProps } from "./+page.server";

    const { data }: { data: MoviePageProps } = $props();
</script>

<MediaPage media={data.media} />