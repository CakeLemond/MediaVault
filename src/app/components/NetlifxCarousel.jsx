"use client"; // Mark this component as a Client Component

import { useState, useEffect, useRef } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
const NetflixCarousel = ({ items }) => {
  const [visibleItems, setVisibleItems] = useState(6); // Default for desktop
  const carouselRef = useRef(null);

  // Update visible items based on screen size
  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(2); // Very small screens (e.g., mobile)
      } else if (window.innerWidth < 768) {
        setVisibleItems(3); // Small screens (e.g., tablets)
      } else if (window.innerWidth < 1024) {
        setVisibleItems(4); // Medium screens (e.g., small laptops)
      } else {
        setVisibleItems(6); // Large screens (e.g., desktops)
      }
    };

    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);

    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);

  // Scroll to the next/previous section
  const scroll = (direction) => {
    const carousel = carouselRef.current;
    const itemWidth = carousel.children[0].offsetWidth;
    const scrollAmount = itemWidth * visibleItems;

    if (direction === "next") {
      carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
    } else {
      carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      {/* Left Arrow */}
      <button
        onClick={() => scroll("prev")}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full z-10 hover:bg-black/70 transition-colors"
      >
        <ArrowLeftIcon className="w-6 h-6 text-white" />
      </button>

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="flex overflow-x-scroll scrollbar-hide space-x-4 p-4"
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 bg-gray-700 rounded-lg relative hover:scale-105 transition-all duration-300"
            style={{
              width: `calc((100% - (${
                visibleItems - 1
              } * 1rem)) / ${visibleItems})`,
              minWidth: "150px",
              aspectRatio: "2/3",
            }}
          >
            <Image
              src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
              fill
              sizes="100vw"
              priority
              style={{
                objectFit: "cover",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              alt="Picture of the movie"
            />
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll("next")}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full z-10 hover:bg-black/70 transition-colors"
      >
        <ArrowRightIcon className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

export default NetflixCarousel;
