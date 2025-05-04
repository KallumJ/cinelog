<script>
    const { data } = $props()
    const { media } = data;
    console.log(media)
</script>

{#each media as { title }}
    <p>{title}</p>
{/each}
