import {TMDB} from "tmdb-ts"

const tmdb = new TMDB(process.env.TMDB_API_READ_TOKEN ?? "")

interface EnhancedTmdb extends TMDB  {
  image: {
    getSrcForPath: (backdrop: string, size: string) => string;
  }
}

const enhancedTmdb: EnhancedTmdb = Object.assign(tmdb, {
  image: {
    getSrcForPath(backdrop: string, size: string) {
      return `https://image.tmdb.org/t/p/${size}${backdrop}`
    }
  }
})

export {enhancedTmdb as tmdb}