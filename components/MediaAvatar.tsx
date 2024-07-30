import { Avatar } from "@nextui-org/react";
import clsx from "clsx";
import React from "react";

interface MediaAvatarProps {
  src: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export default function MediaAvatar({ src, className, title, subtitle}: MediaAvatarProps) {
  return (
    <div className="text-center">
      <Avatar showFallback className={clsx("mx-2 inline-block", className)} imgProps={{ draggable: false}} name={title} src={src}/>
      <p className="my-1 font-semibold">{title}</p>
      {subtitle ? <p>{subtitle}</p> : <></>}
    </div>
  );
}
