<script>
	import { getSrcForPath } from '$lib/tmdb/utils';
	import { PosterSize } from 'tmdb-ts';

    const { posterPath, title } = $props();
</script>

<div class="overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-all">
	<a href="#" draggable="false" class="select-none"><img src={getSrcForPath(posterPath, PosterSize.W780)} alt="{title} Poster" loading="lazy" draggable="false"/></a>
</div>
