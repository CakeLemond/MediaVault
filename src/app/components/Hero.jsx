"use client";
import { motion } from "framer-motion";
import { Bebas_Neue, RocknRoll_One, Work_Sans } from "next/font/google";
import { useRef, useEffect, useState, useContext, useActionState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";

const BeabasFont = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});
const Hero = ({ TrendingData, MEDIADATA }) => {
  // UseHooks
  const constrainsRef = useRef(null);
  const [Sliderwidth, setSliderwidth] = useState();
  const References = useRef(null);
  const LeftBtn = useRef(null);
  const RightBtn = useRef(null);
  const currentValue = useRef(0);

  //
  const [MediaID, setMediaID] = useState(0);
  const [Path, setPath] = useState(TrendingData.results[0].backdrop_path);
  const [index, setIndex] = useState(0);
  const [MediaType, setType] = useState();
  const [lignwidth, setLignWidth] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [Disabeled, setDisabeled] = useState(false);
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
  const findMovie = (ID, type, item, i) => {
    setMediaID(ID);
    setPath(item);
    setIndex(i);
    setType(type);
  };

  // Shorten a given text
  function ShortenText(overview) {
    const words = overview.split(" "); // Split the text into words
    if (words.length > 25) {
      return words.slice(0, 25).join(" ") + "...";
    }
    return overview; // Return the original text if it has 30 or fewer words
  }
  // Go left or right
  const Scroll = () => {
    RightBtn.current.disabled = false;

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
  const AdjustWidth = (value, maxValue) => {
    setDisabeled(false);
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
      if (lignwidth <= 10) {
        let transformedValue = 1 - value;
        setTranslateX(Math.abs(value));
        console.log(`transformed value : ${Math.abs(value)} `);
        console.log(` value : ${value} `);
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
    console.log(lignwidth);
  }, [lignwidth]);

  return (
    <section className="w-full flex flex-col    mt-36 gap-6 text-white h-auto">
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

      <div className=" w-full bg-blue-600 flex flex-col lg:flex lg:flex-row gap-6 py-5 text-center">
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
                      i
                    );
                    console.log(TrendingData.results[i]);
                  }}
                  className="  min-w-[35vw] md:min-w-[30vw] lg:min-w-[18vw]  h-44 rounded-lg border border-white relative brightness-50 "
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
            <div className="w-[65%] h-[6px] rounded-sm relative border border-white">
              <span
                className={` bg-white h-[6px] absolute top-0 left-0 rounded-sm`}
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
        <div className=" w-full lg:w-[40%]">
          <button className="px-3 py-3 bg-cyan-300">Get Text Info</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
