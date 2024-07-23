"use client";

import { Input } from "@nextui-org/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

interface SearchBarProps {
    className?: string;
}

export default function SearchBar( {className}:SearchBarProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    params.set("page", Number(1).toString())

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <Input
      className={className}
      defaultValue={searchParams.get("query")?.toString()}
      label="Search"
      placeholder="Enter your search..."
      size="lg"
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}
