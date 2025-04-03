<script>
	import { getSrcForPath } from '$lib/tmdb/utils';
	import { PosterSize } from 'tmdb-ts';

    const { poster_path, title } = $props();
</script>

<div class="overflow-hidden rounded-lg shadow-lg">
	<img src={getSrcForPath(poster_path, PosterSize.W780)} alt="{title} Poster" loading="lazy" />
</div>
