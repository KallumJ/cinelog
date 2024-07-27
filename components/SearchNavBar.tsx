import { Input } from "@nextui-org/input";
import React from "react";

import { SearchIcon } from "./icons";

import { search } from "@/actions/search_actions";

export default function SearchNavBar() {
  return (
    <form action={search}>
      <Input
        classNames={{
          base: "max-w-full sm:max-w-[10rem] h-10",
          mainWrapper: "h-full",
          input: "text-small",
          inputWrapper:
            "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
        }}
        name="query"
        placeholder="Type to search..."
        size="sm"
        startContent={<SearchIcon size={18} />}
        type="search"
      />
    </form>
  );
}
