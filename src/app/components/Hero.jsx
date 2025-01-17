"use client";
import { motion } from "framer-motion";
import { Bebas_Neue } from "next/font/google";
import { useRef, useEffect, useState, useContext } from "react";
const BeabasFont = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});
const Hero = ({ TrendingData, MEDIADATA }) => {
  // UseHooks
  const constrainsRef = useRef(null);
  const [Sliderwidth, setSliderwidth] = useState();
  //
  const [MediaID, setMediaID] = useState(0);
  const [Path, setPath] = useState(1);
  const [index, setIndex] = useState(0);
  //

  // Bg Style
  const bgStyle = {
    backgroundImage: `url("https://image.tmdb.org/t/p/original/${Path}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  //functions
  const findMovie = (ID, type, item, i) => {
    setMediaID(ID);
    setPath(item);
    setIndex(i);
  };

  //UseEffects
  useEffect(() => {
    setSliderwidth(
      constrainsRef.current.scrollWidth - constrainsRef.current.offsetWidth
    );
  }, []);

  return (
    <section className="w-full flex flex-col  h-screen  mt-36 gap-6 text-white">
      <div
        style={bgStyle}
        className={` w-full gap-6  sm:h-1/2 brightness-50  rounded-xl text-center px-10 py-4 flex flex-col justify-between`}
      >
        <div>
          <h1 className={` text-5xl  sm:text-7xl  ${BeabasFont.className} `}>
            {TrendingData.results[index].title ||
              TrendingData.results[index].name}
          </h1>
          <p>TV SHOWS Rated R</p>
        </div>
        <div>
          <p className="max-w-[85%] sm:max-w-[65%] md:max-w-[50%] mx-auto">
            {TrendingData.results[index].overview}
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
                  onClick={() => {
                    findMovie(
                      TrendingData.results[i].id,
                      TrendingData.results[i].media_type,
                      item.backdrop_path || item,
                      i
                    );
                    console.log(TrendingData.results[i]);
                  }}
                  className=" bg-red-500 min-w-[35vw] md:min-w-[30vw] lg:min-w-[18vw]  h-44 rounded-lg border border-white"
                ></div>
              ))}
            </motion.div>
          </motion.div>
        </div>
        <div className=" w-full lg:w-[40%]"></div>
      </div>
    </section>
  );
};

export default Hero;
