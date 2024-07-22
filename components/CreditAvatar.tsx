import { Avatar } from "@nextui-org/react";
import clsx from "clsx";
import React from "react";

interface CreditAvatarProps {
  src: string;
  name: string;
  job: string;
  className?: string;
}

export default function CreditAvatar({ src, className, name, job }: CreditAvatarProps) {
  return (
    <div className="text-center">
      <Avatar showFallback className={clsx("mx-2 inline-block", className)} imgProps={{ draggable: false}} name={name} src={src}/>
      <p className="my-1 font-semibold">{name}</p>
      <p>{job}</p>
    </div>
  );
}
