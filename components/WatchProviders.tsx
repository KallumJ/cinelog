"use client"

import { Link, Radio, RadioGroup } from "@nextui-org/react";
import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import {
  Buy,
  Flatrate,
  PosterSize,
  Rent,
  WatchLocale,
  WatchProviders as WatchProvidersType,
} from "tmdb-ts";

import MediaAvatar from "./MediaAvatar";

import { tmdb } from "@/lib/tmdb";
import { getFlagEmojiForCountryCode, sortAlphabetically } from "@/lib/utils";

enum ProviderCategory {
  STREAM = "stream",
  BUY = "buy",
  RENT = "rent",
}

interface CarouselData {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
  type: ProviderCategory;
}

interface WatchProvidersProps {
  providers: WatchProvidersType;
}

interface ProviderCountry {
  countryCode: string;
  countryName: string;
  flag: string;
}

interface Provider {
  link?: string;
  rent?: Rent[];
  flatrate?: Flatrate[];
  buy?: Buy[];
}

export default function WatchProviders({ providers }: WatchProvidersProps) {
    const DEFAULT_REGION = "GB";
    const DEFAULT_CATEGORY = ProviderCategory.STREAM;

    const [selectedCountry, setSelectedCountry] = useState(DEFAULT_REGION);
    const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);

    const anyProviders = Object.keys(providers?.results ?? {}).length > 0;

    if (!anyProviders)
        return <><h1 className="text-2xl font-bold mb-4">Providers</h1><h1 className="text-2xl mb-8">No providers available in any region</h1></>

  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
      slidesToSlide: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 8,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1200, min: 800 },
      items: 4,
      slidesToSlide: 2,
    },
    foldable: {
      breakpoint: { max: 800, min: 550 },
      items: 3,
      itemsToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 550, min: 0 },
      items: 2,
      slidesToSlide: 1,
    },
  };

  const countries: ProviderCountry[] = Object.keys(providers.results)
    .map((p) => {
      return {
        countryCode: p,
        countryName: regionNames.of(p) ?? "Unknown",
        flag: getFlagEmojiForCountryCode(p),
      };
    })
    .sort((a, b) => sortAlphabetically(a.countryName, b.countryName));

  const { link, rent, flatrate, buy }: Provider =
    providers.results[selectedCountry as keyof WatchLocale] ?? {};

  const carouselData: CarouselData[] = [
    ...(rent ?? []).map(
      (r) => ({ ...r, type: ProviderCategory.RENT }) as CarouselData
    ),
    ...(flatrate ?? []).map(
      (f) => ({ ...f, type: ProviderCategory.STREAM }) as CarouselData
    ),
    ...(buy ?? []).map(
      (b) => ({ ...b, type: ProviderCategory.BUY }) as CarouselData
    ),
  ];

  const filteredData = carouselData.filter((d) => d.type === selectedCategory);

  return (
    <div>
          <h1 className="text-2xl font-bold mb-4">Providers</h1>
          <div className="flex gap-8 flex-row items-center">
            <select
              className="select select-bordered w-full max-w-xs p-2"
              defaultValue={DEFAULT_REGION}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              {countries.map((c) => (
                <option key={c.countryCode} value={c.countryCode}>
                  {c.flag} {c.countryName}
                </option>
              ))}
            </select>

            <RadioGroup
              defaultValue={DEFAULT_CATEGORY}
              orientation="horizontal"
              onValueChange={(v) => setSelectedCategory(v as ProviderCategory)}
            >
              <Radio value={ProviderCategory.STREAM}>Stream</Radio>
              <Radio value={ProviderCategory.RENT}>Rent</Radio>
              <Radio value={ProviderCategory.BUY}>Buy</Radio>
            </RadioGroup>
            <Link href={link}>Click here for more details</Link>
          </div>
          {filteredData.length == 0 ? (
            <p className="text-xl my-6">
              Not available to {selectedCategory} in the selected region
            </p>
          ) : (
            <></>
          )}
          <Carousel
            className="my-6"
            draggable={true}
            responsive={responsive}
            swipeable={true}
          >
            {filteredData.map((o) => (
              <MediaAvatar
                key={o.provider_id + o.provider_name}
                src={tmdb.image.getSrcForPath(o.logo_path, PosterSize.ORIGINAL)}
                title={o.provider_name}
              />
            ))}
          </Carousel>
        </div>
  );
}
