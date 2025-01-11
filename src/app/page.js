

import Image from "next/image";
import Hero from "./components/Hero";
import Navbar from "./components/navbar";
import { resolveMotionValue } from "framer-motion";

export default  async function Home() {
  let MEDIA_DATA = null
  const apikey = process.env.MOVIE_APIKEY
  // const APILINKS = {
  //   TrendingLink: "https://api.themoviedb.org/3/trending/all/day?language=en-US",
  //   MOVIE_IMAGE: "https://api.themoviedb.org/3/movie/{movie_id}/images",
  //   TVSHOWS_IMAGE: "https://api.themoviedb.org/3/tv/{series_id}/images",
  //   MOVIE_VIDEO: "https://api.themoviedb.org/3/movie/{movie_id}/videos",
  //   TVSHOWS_VIDEO: "https://api.themoviedb.org/3/tv/{series_id}/videos",
  // // CUSTOMIZEKEY: `https://api.themoviedb.org/3/${type}/${type_id}/${media}`
  // }
  const option = {
    method: "GET",
    headers: {
      accept: 'application/json',
      Authorization:` Bearer ${apikey}`,
      }
    }
    const PopularMediaRes = await fetch(`https://api.themoviedb.org/3/trending/all/day?language=en-US`, option)
    const PopularMediaData =  await PopularMediaRes.json()
    
 // console.log("Popular Mediass" , PopularMediaData)


  async function GetMediaInfo() {
    let MEDIA = {}
    let MOVIEVIDEO = []
    let MOVIEIMAGE = []
    let TVSHOWIMAGE = []
    let TVSHOWVIDEO = []
    for (let element of PopularMediaData.results) {
      
      // Define URLs for TV Shows and Movies
      const TVIMAGEURL = `https://api.themoviedb.org/3/tv/${element.id}/images`;
      const TVIMAGEVIDEO = `https://api.themoviedb.org/3/tv/${element.id}/videos`;
      const MOVIEIMAGEURL = `https://api.themoviedb.org/3/movie/${element.id}/images`;
      const MOVIEVIDEOURL = `https://api.themoviedb.org/3/movie/${element.id}/videos`;
      
      if (element.media_type === "tv") {
       
        try {
          // Fetch TV data with Promise.allSettled to handle both requests
          const TVshowData = await Promise.allSettled([
            fetch(TVIMAGEURL, option).then((res) => res.json()),
            fetch(TVIMAGEVIDEO, option).then((res) => res.json())
          ]);
  
          // Process the responses from the Promise.allSettled
          TVshowData.forEach((data, i ) => {
            if (data.status === 'fulfilled') {
              if (data.value.posters || data.value.backdrops) {
                TVSHOWIMAGE.push(data.value)
              }
              else {
                TVSHOWVIDEO.push(data.value)
              }

            } else {
              console.error(data.reason);
            }
          });
        } catch (error) {
          console.error("Error fetching TV data:", error);
        }
      }
      // Check if the media type is 'movie'
      else if (element.media_type === "movie") {
        try {
          // Fetch Movie data (you can add logic for movie-related operations here)
          const movieData = await Promise.allSettled([
            fetch(MOVIEIMAGEURL, option).then((res) => res.json()),
            fetch(MOVIEVIDEOURL, option).then((res) => res.json())
          ]);
  
          // Process movie data here if needed
          movieData.forEach((data, i) => {
            if (data.status === 'fulfilled') {
              if (data.value.posters || data.value.backdrops) {
                MOVIEIMAGE.push(data.value)
              }
              else {
                MOVIEVIDEO.push(data.value)
              }

            } else {
              console.error(data.reason);
            }
          });
        } catch (error) {
          console.error("Error fetching movie data:", error);
        }
      }
    }

    MEDIA = {
      tvShowsInfo: { 
        TvShowIMG: TVSHOWIMAGE, 
        TvShowVid: TVSHOWVIDEO 
      },
      movieData: { 
        movieImg: MOVIEIMAGE, 
        movieVid: MOVIEVIDEO 
      }
    }

    return new Promise ((resolve , reject) => {
      if (Object.keys(MEDIA).length > 0)
        resolve(MEDIA)
        else {
          reject(new Error("Something is off"))
        }
    })
    
  }
  MEDIA_DATA = await GetMediaInfo()
  console.log("IS IT GOOD FINALLY" , MEDIA_DATA)
  
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
       <Hero TrendingData={PopularMediaData} MEDIADATA={MEDIA_DATA}  /> 
      
   </main>
   
  );
 
}
