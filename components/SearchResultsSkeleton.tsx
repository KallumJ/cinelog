"use client"

import { Skeleton } from "@nextui-org/react";
import React from "react";

export default function SearchResultsSkeleton() {
  return (
    <Skeleton className="rounded-lg">
      <div className="h-24 rounded-lg bg-default-300" />
    </Skeleton>
  );
}
