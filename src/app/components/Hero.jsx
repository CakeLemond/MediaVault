"use client";
import { motion } from "framer-motion";
import { Bebas_Neue, RocknRoll_One, Work_Sans } from "next/font/google";
import { useRef, useEffect, useState, useContext, useActionState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FetchData } from "../actions/FetchMovies";
const BeabasFont = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});
const Hero = ({ TrendingData }) => {
  // UseHooks
  const constrainsRef = useRef(null);
  const [Sliderwidth, setSliderwidth] = useState();
  const References = useRef(null);
  const LeftBtn = useRef(null);
  const RightBtn = useRef(null);
  const currentValue = useRef(0);

  //
  const [Path, setPath] = useState(TrendingData.results[0].backdrop_path);
  const [index, setIndex] = useState(0);
  const [MediaType, setType] = useState();
  const [lignwidth, setLignWidth] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  //
  let Button = null;
  //  Style
  const bgStyle = {
    backgroundImage: `url("https://image.tmdb.org/t/p/original/${Path}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "12px",
  };
  //

  //functions

  // Find Movies
  const findMovie = (id, type, item, i, array) => {
    setPath(item);
    setIndex(i);
    setType(type);

    mutate({ id, type });
  };
  // Fetch APis
  const {
    mutate,
    isLoading,
    isError,
    error: mutationError,
  } = useMutation({
    mutationFn: ({ id, type }) => FetchData(id, type), // Expecting an object with 'id' and 'MediaType'
    onSuccess: (data) => {
      setData(data); // Set the data on success
      setError(null); // Clear any previous errors
    },
    onError: (error) => {
      setError(error.message); // Set the error message on failure
      setData(null); // Clear previous data
    },
  });

  // Shorten a given text
  function ShortenText(overview) {
    const words = overview.split(" "); // Split the text into words
    if (words.length > 25) {
      return words.slice(0, 25).join(" ") + "...";
    }
    return overview; // Return the original text if it has 30 or fewer words
  }

  useEffect(() => {
    console.log(error);
  }, [error]);
  //
  // Go left or right
  //
  const Scroll = () => {
    if (References.current) {
      const style = window.getComputedStyle(References.current); // Get updated style
      const transformValue = style.transform;

      if (transformValue !== "none") {
        const info = transformValue.match(/matrix.*\((.+)\)/)[1].split(", ");
        const infovalues = parseInt(info[4]);
        AdjustWidth(infovalues, Sliderwidth);
      }
    }
  };
  // Adjust Height
  const AdjustWidth = (value, maxValue) => {
    if (Button === "right") {
      if (lignwidth >= 90) {
        let transformedValue = maxValue * ((100 - lignwidth) / 100);
        setTranslateX(value - transformedValue);
        console.log(`transformed value : ${parseInt(lignwidth)} `);
      } else {
        setTranslateX(value - maxValue * 0.1);
        console.log(`btnRight: ${RightBtn.current} `);
      }
    }
    if (Button === "Left") {
      if (lignwidth <= 5) {
        setTranslateX(Math.abs(value) + value);
        console.log(`transformed value : ${Math.abs(value)} `);
        console.log(` value : ${Math.abs(value) - value} `);
      } else {
        setTranslateX(value + maxValue * 0.1);
        console.log(`btnRight: ${LeftBtn.current} `);
      }
    }
  };

  // Updates Progress Bar width
  const updateLignWidth = () => {
    let animationId;
    const StartAnimation = () => {
      if (References.current) {
        const style = window.getComputedStyle(References.current); // Get updated style
        const transformValue = style.transform; // Extract the transform property

        if (transformValue !== "none") {
          const values = transformValue
            .match(/matrix.*\((.+)\)/)[1]
            .split(", ");
          let currentValueRef = parseFloat(values[4]);

          currentValue.current = currentValueRef;
          const percentage = Math.abs((currentValueRef / Sliderwidth) * 100); // Calculate percentage

          setLignWidth(percentage); // Update lignWidth state
        }
      }

      // Call `updateLignWidth` again for continuous updates
      animationId = requestAnimationFrame(StartAnimation);
    };

    animationId = requestAnimationFrame(StartAnimation);
  };

  //UseEffects
  useEffect(() => {
    if (constrainsRef.current) {
      const max =
        constrainsRef.current.scrollWidth - constrainsRef.current.offsetWidth;
      setSliderwidth(max);
    }
  }, []);
  useEffect(() => {
    if (lignwidth >= 99) {
      RightBtn.current.disabled = true;
    } else {
      RightBtn.current.disabled = false;
    }
    if (lignwidth <= 1) {
      LeftBtn.current.disabled = true;
    } else {
      LeftBtn.current.disabled = false;
    }
  }, [lignwidth]);

  return (
    <section className="w-full flex flex-col mt-10 gap-6 text-white h-auto">
      <div
        className={` w-full gap-6 relative  sm:h-1/2 rounded-xl text-center px-10 py-4 flex `}
      >
        <div
          className="absolute w-full  brightness-50 h-full top-0 left-0"
          style={bgStyle}
        ></div>
        {/* Image / Title Section */}
        <div className=" h-full w-full z-10 flex flex-col gap-3 lg:justify-between lg:text-left">
          {/* TItle */}
          <div>
            <h1 className={` text-5xl  sm:text-7xl  ${BeabasFont.className} `}>
              {TrendingData.results[index].title ||
                TrendingData.results[index].name}
            </h1>
            <p className="text-xl">
              {MediaType === "tv" ? "TV Shows" : "MOVIE"}
            </p>
          </div>
          {/* OverView */}
          <div>
            <p className="max-w-[85%] sm:max-w-[65%] md:max-w-[50%] mx-auto lg:mx-0 lg:max-w-[22rem] lg:text-xl">
              {ShortenText(TrendingData.results[index].overview)}
            </p>
          </div>
          {/* View More...*/}
          <div>
            <button className="py-3 px-3 bg-black">VIEW MORE</button>
          </div>
        </div>
      </div>
      {/* Carousel Section */}

      <div className=" w-full flex flex-col lg:flex lg:flex-row gap-6 py-5 text-center">
        <div className="lg:w-[60%] w-[85%] mx-auto">
          <h1 className={`${BeabasFont.className} text-4xl`}>Trending Media</h1>

          <motion.div
            className="overflow-x-hidden w-full  "
            ref={constrainsRef}
          >
            <motion.div
              className="flex gap-6 w-full"
              animate={{ x: translateX }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              dragConstraints={{ right: 0, left: -Sliderwidth }}
              onDragStart={() => updateLignWidth()}
              drag="x"
              ref={References}
            >
              {TrendingData.results.map((item, i) => (
                <div
                  key={i}
                  onClick={() => {
                    findMovie(
                      TrendingData.results[i].id,
                      TrendingData.results[i].media_type,
                      item.backdrop_path || item,
                      i,
                      TrendingData.results
                    );
                  }}
                  className="  min-w-[35vw] md:min-w-[30vw] lg:min-w-[18vw]  h-48 rounded-lg border border-white relative brightness-50 "
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                    sizes="(max-width: 768px) 35vw, (max-width: 1024px) 30vw, 18vw"
                    priority
                    fill
                    style={{
                      objectFit: "cover",
                      borderRadius: "8px",
                      pointerEvents: "none",
                    }}
                    alt="Picture of the movie"
                  />
                </div>
              ))}
            </motion.div>
          </motion.div>
          <div className="w-full mt-4 flex justify-between items-center">
            <div className="w-[65%] h-[6px] rounded-sm relative  bg-gray-400">
              <span
                className={` bg-red-500  h-[6px] absolute top-0 left-0 rounded-sm`}
                style={{
                  width: `${lignwidth}%`,
                }}
              />
            </div>
            <div className="w-[35%] text-2xl flex gap-10 items-center justify-center">
              <button
                ref={LeftBtn}
                className=" cursor-pointer"
                onClick={() => {
                  (Button = "Left"), Scroll();
                }}
              >
                <IoIosArrowBack />
              </button>

              <button
                ref={RightBtn}
                onClick={() => {
                  (Button = "right"), Scroll();
                }}
                className=" cursor-pointer"
              >
                <IoIosArrowForward />
              </button>
            </div>
          </div>
        </div>
        {/* Trailer Section */}
        <div className=" w-full lg:w-[40%] rounded-xl  ">
          <div className="">
            <h2 className={`text-4xl ${BeabasFont.className}`}>View Trailer</h2>
          </div>
          {data && (
            <iframe
              src={`https://www.youtube.com/embed/${
                data.results.find((video) => video.type === "Trailer").key
              }`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-[14.5rem]  rounded-xl"
            ></iframe>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
