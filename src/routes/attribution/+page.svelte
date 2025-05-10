<script>
	import Separator from "$lib/components/ui/separator/separator.svelte";

</script>
<div class="p-8">
    <h1 class="text-2xl font-bold">Attribution</h1>
      <h2 class="text-lg font-semibold my-4">Film and TV Data</h2>
      <div class="sm:flex">
        <img
          alt="TMDB"
          class="p-2"
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
          width={300}
        />
        <p class="mx-4">
          This app uses data from The Movie Database (TMDb), a movie and TV show
          database. Please note that while we rely on TMDb&apos;s content, this
          app is not endorsed or certified by TMDb. For more information, visit
          their official site at <a href="www.themoviedb.org">www.themoviedb.org.</a>
        </p>
      </div>
      <Separator class="my-8"/>
      <h2 class="text-lg font-semibold my-4">Watch Providers</h2>
      <div class="sm:flex">
        <img
          alt="JustWatch"
          class="p-2"
          src="https://upload.wikimedia.org/wikipedia/commons/e/e1/JustWatch.png"
          width={300}
        />
        <p class="mx-4">
          This app uses data from JustWatch (provided through the TMDB API), for all information relating to media&apos;s availability in various regions. Please note that while we rely on JustWatch&apos;s data, this
          app is not endorsed or certified by JustWatch. For more information, visit
          their official site at <a href="https://www.justwatch.com" >https://www.justwatch.com.</a>
        </p>
      </div>
</div>