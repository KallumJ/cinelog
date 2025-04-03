<script lang="ts">
    import * as Tabs from "$lib/components/ui/tabs";
	import { PosterSize } from "tmdb-ts";
	import type { HomePageProps } from "./+page.server";
	import { getSrcForPath } from "$lib/tmdb/utils";

    let { data }: { data: HomePageProps } = $props();
</script>
  
  <Tabs.Root class="w-full">
    <Tabs.List class="grid w-full grid-cols-2">
      <Tabs.Trigger value="movies"><span class="mx-3">Movies</span>🎬</Tabs.Trigger>
      <Tabs.Trigger value="tv"><span class="mx-3">TV</span>📺</Tabs.Trigger>
    </Tabs.List>
  
    <Tabs.Content value="movies" class="mt-4">
      <div class="grid grid-cols-2 gap-2 m-4">
        {#each data.movies.results as { title, poster_path }}
        <div class="rounded-lg overflow-hidden shadow-lg">
          <img
            src={getSrcForPath(poster_path, PosterSize.W780)}
            alt="{title} Poster"
            loading="lazy" 
            />
        </div>
    
        {/each}
      </div>
      
      </Tabs.Content>
  
    <Tabs.Content value="tv" class="mt-4">
      <p>Content for TV</p>
    </Tabs.Content>
  </Tabs.Root>  