<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<script lang="ts">
    import * as Tabs from "$lib/components/ui/tabs";
    // You'll likely import components for your grid/cards here
    // import MovieCard from './MovieCard.svelte';
  </script>
  
  <Tabs.Root class="w-full">
    <Tabs.List class="grid w-full grid-cols-4">
      <Tabs.Trigger value="movies">Movies & TV</Tabs.Trigger>
      <Tabs.Trigger value="anime">Anime & Manga</Tabs.Trigger>
      <Tabs.Trigger value="games">Games</Tabs.Trigger>
      <Tabs.Trigger value="music">Music</Tabs.Trigger>
    </Tabs.List>
  
    <Tabs.Content value="movies" class="mt-4">
      <p>Content for Movies & TV goes here.</p>
      </Tabs.Content>
  
    <Tabs.Content value="anime" class="mt-4">
      <p>Content for Anime & Manga goes here.</p>
    </Tabs.Content>
  
    <Tabs.Content value="games" class="mt-4">
      <p>Content for Games goes here.</p>
    </Tabs.Content>
  
    <Tabs.Content value="music" class="mt-4">
      <p>Content for Music goes here.</p>
    </Tabs.Content>
  </Tabs.Root>