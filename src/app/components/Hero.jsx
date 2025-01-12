"use client";
import { motion } from "framer-motion";
import { Bebas_Neue } from "next/font/google";
import { useRef, useEffect, useState, useContext } from "react";
const BeabasFont = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});
const Hero = ({ TrendingData, MEDIADATA }) => {
  const constrainsRef = useRef(null);
  const [Sliderwidth, setSliderwidth] = useState();
  const [MediaID, setMediaID] = useState(0);
  const [index, setIndex] = useState(3);

  const findMovie = (ID) => {
    setMediaID(ID);
    MEDIADATA.tvShowsInfo.TvShowIMG.forEach((element, index) => {
      if (element.id === MediaID) {
        setIndex(index);
      }
    });
  };
  useEffect(() => {
    console.log(
      constrainsRef.current.scrollWidth - constrainsRef.current.offsetWidth
    );
    setSliderwidth(
      constrainsRef.current.scrollWidth - constrainsRef.current.offsetWidth
    );
  }, []);
  return (
    <section className="w-full flex flex-col h-screen bg-white mt-36 gap-6 text-white">
      <div className="w-full gap-6   sm:h-1/2 rounded-xl bg-red-500 text-center px-10 py-4 flex flex-col justify-between">
        <img
          src={`https://image.tmdb.org/t/p/original/${MEDIADATA.tvShowsInfo.TvShowIMG[index].backdrops[1].file_path}`}
          alt=""
        />
        <div>
          <h1 className={` text-5xl  sm:text-7xl  ${BeabasFont.className} `}>
            {/* {TrendingData.results[0].title} */}
          </h1>
          <p>TV SHOWS Rated R</p>
        </div>
        <div>
          <p className="max-w-[85%] sm:max-w-[65%] md:max-w-[50%] mx-auto">
            {/* {TrendingData.results[0].overview} */}
          </p>
        </div>
        <div>
          <button className="py-3 px-3 bg-black">VIEW MORE</button>
        </div>
      </div>

      <div className=" w-full bg-blue-600 flex flex-col lg:flex lg:flex-row gap-6 py-5 text-center">
        <div className="lg:w-[60%] w-[85%] mx-auto">
          <h1 className={`${BeabasFont.className} text-4xl`}>Trending Media</h1>

          <motion.div
            className="overflow-x-hidden w-full  "
            ref={constrainsRef}
          >
            <motion.div
              className="flex gap-6 w-full"
              dragConstraints={{ right: 0, left: -Sliderwidth }}
              drag="x"
            >
              {TrendingData.results.map((item, i) => (
                <div
                  key={i}
                  onClick={() => findMovie(TrendingData.results[i].id)}
                  className=" bg-red-500 min-w-[35vw] md:min-w-[30vw] lg:min-w-[18vw]  h-44 rounded-lg border border-white"
                ></div>
              ))}
            </motion.div>
          </motion.div>
        </div>
        <div className=" w-full lg:w-[40%]">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            eius, iusto dolore voluptas at dolor ratione neque esse veritatis
            corrupti?
          </p>
          <button className="py-5 px-5 bg-blue-500" onClick={() => findMovie()}>
            GET INFO
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
