"use client";

import React, { ReactNode } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface MediaCarouselProps {
  mediaTiles: ReactNode[];
}

export default function MediaCarousel({ mediaTiles }: MediaCarouselProps) {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
      slidesToSlide: 3
    },
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 6,
      slidesToSlide: 3
    },
    tablet: {
      breakpoint: { max: 1200, min: 800 },
      items: 4,
      slidesToSlide: 2
    },
    foldable: {
      breakpoint: { max: 800, min: 550},
      items: 3,
      itemsToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 550, min: 0 },
      items: 2,
      slidesToSlide: 1
    },
  };

  return (
    <Carousel className="-z-0" draggable={true} responsive={responsive} swipeable={true}>
      {mediaTiles}
    </Carousel>
  );
}
