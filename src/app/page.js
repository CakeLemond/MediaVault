

import Image from "next/image";
import Hero from "./components/Hero";
import Navbar from "./components/navbar";
import { useContext } from "react";
import { DataContext, usedata } from "./DataContext";


export default  async function Home() {
  const { PopularMovies , setPopularMovies} = usedata;

  const apikey = process.env.MOVIE_APIKEY

  const APILINKS = {
    TrendingLink: "https://api.themoviedb.org/3/trending/all/day?language=en-US",
    MOVIE_IMAGE: "https://api.themoviedb.org/3/movie/{movie_id}/images",
    TVSHOWS_IMAGE: "https://api.themoviedb.org/3/tv/{series_id}/images",
    MOVIE_VIDEO: "https://api.themoviedb.org/3/movie/{movie_id}/videos",
    TVSHOWS_VIDEO: "https://api.themoviedb.org/3/tv/{series_id}/videos",
  // CUSTOMIZEKEY: `https://api.themoviedb.org/3/${type}/${type_id}/${media}`
  }
  const option = {
    method: "GET",
    headers: {
      accept: 'application/json',
      Authorization:` Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZWE2YWFkMjMxN2E4NzIwYjliYmVkZjcxNTU2OGNhOCIsIm5iZiI6MTczNjA1NTIyNS4xOTcsInN1YiI6IjY3N2ExOWI5MTU1MjFmODNkOTY2ZTJiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._iFGRbEUMeRssLn-D_IJOFnaVNgIQnKbnKAC3lkk8ew `,
      }
    }
    const response = await fetch("https://api.themoviedb.org/3/trending/all/day?language=en-US", option)
    const data =  await response.json()
     
  console.log(data.results[1])
  console.log(PopularMovies)
  return (
    
<main className="w-[95vw] mx-auto">
      
       {/* <Image
    src={`https://image.tmdb.org/t/p/original/${data.backdrops[Math.floor(Math.random() * data.backdrops.length - 1)].file_path}`}
    alt="Movie Backdrop"
    layout="fill" // Fills the parent container
    objectFit="cover" // Optionally control how the image fits
    priority // Optional for critical images
  /> */}
      <Navbar/>
      <Hero TrendingData={data} />
      
   </main>
   
  );
 
}
