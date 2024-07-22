"use client";

import { Card } from "@nextui-org/react";
import React from "react";
import { Credits, ProductionCompany } from "tmdb-ts";
import {Link} from "@nextui-org/link";

import MovieCastList from "./MovieCastList";
import { RedditIcon } from "./icons";

interface MediaBodyProps {
  description: string;
  tagline: string;
  runtime: number;
  budget: number;
  productionCompanies: ProductionCompany[]
  credits: Credits;
  title: string;
}

export default function MediaBody({ description, tagline, runtime, budget, productionCompanies, credits, title }: MediaBodyProps) {
  return (
    <Card className="p-4">
      <div className="sm:flex">
        <div>
          <p className="italic text-xl">{tagline}</p>
          <p className="my-4 text-lg">{description}</p>
        </div>
        <div className="ml-2 mb-8">
            <p><span className="font-semibold">Runtime: </span>{`${runtime} minutes`}</p>
            <p><span className="font-semibold">Budget: </span> {`$${budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</p>
            <p className="font-semibold">Production companies:</p>
            <ul className="list-disc list-inside sm:w-96">
              {productionCompanies.map(c => <li key={c.id}>{c.name}</li>)}
            </ul>
        </div>
      </div>
      <MovieCastList credits={credits}/>
      <Link color={"foreground"} href={`https://www.reddit.com/r/movies/search/?q=${title.replace(" ", "+")}+discussion&type=link&nsfw=0`}><RedditIcon className="mx-2" /> See discussions here</Link>
    </Card>
  );
}
