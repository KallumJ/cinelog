"use client";

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
import { Image } from "@nextui-org/image";

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

  const anyProviders = Object.keys(providers?.results ?? {}).length > 0;

  let detailsLink: string = "";
  let filteredData: CarouselData[] = [];
  let countries: ProviderCountry[] = [];

  if (anyProviders) {
    countries = Object.keys(providers.results)
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

    detailsLink = link;
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

    filteredData = carouselData.filter((d) => d.type === selectedCategory);
  }

  return (
    <div>
      <span className="flex items-center">
        <h1 className="text-2xl font-bold">Providers</h1>
        <Image
          className="mx-4"
          src="https://www.themoviedb.org/assets/2/v4/logos/justwatch-c2e58adf5809b6871db650fb74b43db2b8f3637fe3709262572553fa056d8d0a.svg"
          width={100}
        />
      </span>
      <p className="my-2">
        Information about watch providers is provided by{" "}
        <Link href="https://www.justwatch.com">JustWatch</Link>.{" "}
        <Link href="https://www.justwatch.com">JustWatch</Link> helps you easily
        discover where to legally stream your favorite movies and TV shows
        online. For more details, visit{" "}
        <Link href="https://www.justwatch.com">JustWatch</Link>. For further
        attribution, see our <Link href="/attribution">attribution page</Link>.
      </p>
      {anyProviders ? (
        <>
          {" "}
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
            <Link href={detailsLink}>Click here for more details</Link>
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
        </>
      ) : (
        <h1 className="text-2xl my-8">No providers available in any region</h1>
      )}
    </div>
  );
}
