"use client";

import React from "react";
import { Card } from "@nextui-org/react";

import StarRating from "./StarRating";
import { getYearFromDateString } from "@/lib/utils";


interface MediaHeaderProps {
  title: string;
  releaseDate: string
}

export default function MediaHeader({ title, releaseDate }: MediaHeaderProps) {
  return (
    <Card className="p-2 sm:p-6">
      <StarRating />
      <h1 className="md:text-6xl sm:text-5xl text-2xl font-bold">{title} <span className="dark:text-gray-500 md:text-2xl sm:text-xl text-sm">{`(${getYearFromDateString(releaseDate)})`}</span></h1>
    </Card>
  );
}
