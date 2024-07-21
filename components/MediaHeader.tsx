"use client";

import React from "react";
import { Card } from "@nextui-org/react";

import StarRating from "./StarRating";


interface MediaHeaderProps {
  title: string;
}

export default function MediaHeader({ title }: MediaHeaderProps) {
  return (
    <Card className="p-2 sm:p-6">
      <StarRating />
      <h1 className="md:text-6xl sm:text-5xl text-2xl font-bold">{title}</h1>
    </Card>
  );
}
