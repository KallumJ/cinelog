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
    <div className="inline-block text-center">
      <Avatar className={clsx("mx-2", className)} name={name} src={src} />
      <p className="my-1 font-semibold">{name}</p>
      <p>{job}</p>
    </div>
  );
}
