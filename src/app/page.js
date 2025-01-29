

import Hero from "./components/Hero";
import Navbar from "./components/navbar";
import TvAndMovie from "./components/TvAndMovie";

export default  async function Home() {
  const apikey = process.env.MOVIE_APIKEY
 
  const option = {
    method: "GET",
    headers: {
      accept: 'application/json',
      Authorization:` Bearer ${apikey}`,
      }
    }
    const PopularMediaRes = await fetch(`https://api.themoviedb.org/3/trending/all/day?language=en-US`, option)
    const PopularMediaData =  await PopularMediaRes.json()
  

  return (
    
<main className="w-[95vw] mx-auto">
      
     
      <Navbar/>
       <Hero TrendingData={PopularMediaData}   /> 
      <TvAndMovie/>
   </main>
   
  );
 
}
