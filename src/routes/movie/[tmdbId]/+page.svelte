<script lang="ts">
	import type { MoviePageProps } from "./+page.server";

    const { data }: { data: MoviePageProps } = $props();
</script>

<p>Displaying {data.media.title}</p>