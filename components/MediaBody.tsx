"use client";

import { Card } from "@nextui-org/react";
import React from "react";
import { CreatedBy, Credits, ProductionCompany, WatchProviders as WatchProvidersType } from "tmdb-ts";

import MediaCastList from "./MovieCastList";
import DiscussionLinks from "./DiscussionLinks";
import WatchProviders from "./WatchProviders";

interface MediaBodyProps {
  description: string;
  tagline: string;
  productionCompanies: ProductionCompany[];
  credits: Credits;
  title: string;
  imdbId?: string;
  details: { key: string; value: string }[];
  createdBy?: CreatedBy[];
  mediaType: "television" | "movies"
  providers: WatchProvidersType
}

export default function MediaBody({
  description,
  tagline,
  productionCompanies,
  credits,
  title,
  imdbId,
  details,
  createdBy,
  mediaType,
  providers
}: MediaBodyProps) {
  return (
    <Card className="p-4">
      <div className="sm:flex">
        <div>
          <p className="italic text-xl">{tagline}</p>
          <p className="my-4 text-lg">{description}</p>
        </div>
        <div className="ml-2 mb-8">
          {details.map((d) => (
            <p key={d.key}>
              <span className="font-semibold">{d.key}: </span> {d.value}
            </p>
          ))}
          <p className="font-semibold">Production companies:</p>
          <ul className="list-disc list-inside sm:w-96">
            {productionCompanies.map((c) => (
              <li key={c.id}>{c.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <MediaCastList createdBy={createdBy} credits={credits} />
      <DiscussionLinks imdbId={imdbId} mediaType={mediaType} title={title} />
      <WatchProviders providers={providers}/>
    </Card>
  );
}
