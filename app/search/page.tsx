import React, { Suspense } from "react";

import SearchBar from "@/components/SearchBar";
import SearchResultsSkeleton from "@/components/SearchResultsSkeleton";
import SearchResults from "@/components/SearchResults";
import { tmdb } from "@/lib/tmdb";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const results = await tmdb.search.multi({ query, page: currentPage });

  return (
    <div>
      <SearchBar className="my-12" />
      <Suspense key={query + currentPage} fallback={<SearchResultsSkeleton />}>
        <SearchResults results={results} />
      </Suspense>
    </div>
  );
}
