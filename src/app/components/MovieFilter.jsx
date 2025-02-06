"use client"; // Mark this component as a Client Component

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"; // Adjust the import path
import { SectionButton } from "./Button"; // Adjust the import path
import { FetchMediaByID } from "../actions/FetchMediaByID";
import { useMutation, useQuery } from "@tanstack/react-query";
import NetflixCarousel from "./NetlifxCarousel";

const GenreCarousel = ({ genres, type, FilmArray, TvArray }) => {
  const [chunkSize, setChunkSize] = useState(3); // Default chunk size for desktop
  const [links, setLinks] = useState([]);

  // Function to split the genres array into chunks
  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  useEffect(() => {
    if (type === "movie") {
      setLinks(FilmArray.results);
    } else {
      setLinks(TvArray.results);
    }
  }, [type]);

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: ({ id }) => FetchMediaByID(id, type),
    onSuccess: (data) => {
      setLinks(data.results);
      console.log(data.results);
    },

    onError: (error) => {
      console.log(error);
    },
  });

  // Update chunk size based on screen width

  const FetchMovie = (id) => {
    console.log(id);
    mutate({ id });
  };

  useEffect(() => {
    const updateChunkSize = () => {
      if (window.innerWidth < 640) {
        setChunkSize(2); // Mobile: 2 items per slide
      } else if (window.innerWidth < 1024) {
        setChunkSize(3); // Tablet: 3 items per slide
      } else {
        setChunkSize(4); // Desktop: 4 items per slide
      }
    };

    updateChunkSize(); // Set initial chunk size
    window.addEventListener("resize", updateChunkSize); // Update on resize

    return () => window.removeEventListener("resize", updateChunkSize); // Cleanup
  }, []);

  // Split genres into chunks based on the current chunk size
  const genreChunks = chunkArray(genres, chunkSize);

  return (
    <>
      <Carousel className="lg:w-1/2">
        <CarouselContent>
          {genreChunks.map((chunk, index) => (
            <CarouselItem
              key={index}
              className="flex p-4 gap-6 justify-center sm:justify-start"
            >
              {chunk.map((genre) => (
                <button
                  className="px-4 py-2 text-white border border-white rounded-lg cursor-pointer"
                  onClick={() => FetchMovie(genre.id)}
                  key={genre.id}
                >
                  {genre.name}
                </button>
              ))}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {links && <NetflixCarousel items={links} />}
    </>
  );
};

export default GenreCarousel;
