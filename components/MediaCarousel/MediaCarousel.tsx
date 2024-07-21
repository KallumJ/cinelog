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
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
      slidesToSlide: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1
    },
  };

  return (
    <Carousel draggable={true} responsive={responsive} swipeable={true}>
      {mediaTiles}
    </Carousel>
  );
}
