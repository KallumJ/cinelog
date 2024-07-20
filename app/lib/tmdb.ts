import {TMDB} from "tmdb-ts"

type PosterSize = "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original"

const tmdb = new TMDB(process.env.TMDB_API_READ_TOKEN ?? "")

interface EnhancedTmdb extends TMDB  {
  image: {
    getPosterUrlFromPath: (backdrop: string, size: PosterSize) => string;
  }
}

const enhancedTmdb: EnhancedTmdb = Object.assign(tmdb, {
  image: {
    getPosterUrlFromPath(backdrop: string, size: PosterSize) {
      return `https://image.tmdb.org/t/p/${size}/${backdrop}`
    }
  }
})

export {enhancedTmdb as tmdb}