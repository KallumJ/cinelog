"use client";

import React from "react";
import { Card, Image } from "@nextui-org/react";

interface MediaTileProps {
  posterSrc: string;
  title: string;
}

export default function MediaTile({
  posterSrc: posterSrc,
  title,
}: MediaTileProps) {
  return (
    <Card isPressable className="w-[185px]" radius="lg">
      <Image
        alt={title}
        className="select-none"
        draggable={false}
        src={posterSrc}
        width={185}
      />
    </Card>
  );
}
