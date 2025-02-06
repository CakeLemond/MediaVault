

import Hero from "./components/Hero";
import Navbar from "./components/navbar";
import TvAndMovie from "./components/TvAndMovie";
import SingleMediaSection from "./components/SingleMediaSection";

export default  async function Home() {
  const apikey = process.env.MOVIE_APIKEY
 
  const option = {
    method: "GET",
    headers: {
      accept: 'application/json',
      Authorization:` Bearer ${apikey}`,
      }
    }
    const genreIdFilm = 28
    const genreIdTv = 10759
    const PopularMediaRes = await fetch(`https://api.themoviedb.org/3/trending/all/day?language=en-US`, option)
    const PopularMediaData =  await PopularMediaRes.json()
  
    const genreMovieList = await fetch (`https://api.themoviedb.org/3/genre/movie/list` , option)
    const genreMovieListData = await genreMovieList.json()
    const genreTvList = await fetch (`https://api.themoviedb.org/3/genre/tv/list` , option)
    const genreTvListData = await genreTvList.json()

    const FilmArray = await fetch (`https://api.themoviedb.org/3/discover/movie?with_genres=${genreIdFilm}&language=en-US`, option)
    const FilmArrayData = await FilmArray.json()
    const TvArray = await fetch (`https://api.themoviedb.org/3/discover/tv?with_genres=${genreIdTv}&language=en-US`, option)
    const TvArrayData = await TvArray.json()
  return (
    
<main className="w-[95vw] mx-auto">
      
     
      <Navbar/>
       <Hero TrendingData={PopularMediaData}   /> 
      <TvAndMovie genreMovieList={genreMovieListData} genreTvList={genreTvListData} FilmArray={FilmArrayData} TvArray={TvArrayData}/>
      <SingleMediaSection/> 
   </main>
   
  );
 
}
