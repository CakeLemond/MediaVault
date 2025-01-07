"use client";
import { motion } from "framer-motion";
import { Bebas_Neue } from "next/font/google";
import { useRef, useEffect, useState } from "react";
const BeabasFont = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});
const Hero = () => {
  const ArraysCaoursel = [1, 3, 4, 5, 6, 8, 9];
  const constrainsRef = useRef(null);
  const [Sliderwidth, setSliderwidth] = useState();
  useEffect(() => {
    console.log(constrainsRef.current);
    setSliderwidth(
      constrainsRef.current.scrollWidth - constrainsRef.current.offsetWidth
    );
  }, []);
  return (
    <section className="w-full flex flex-col h-screen bg-white mt-36 gap-6 text-white">
      <div className="w-full gap-6   sm:h-1/2 rounded-xl bg-red-500 text-center px-10 py-4 flex flex-col justify-between">
        <div>
          <h1 className={` text-5xl  sm:text-7xl  ${BeabasFont.className} `}>
            SQUID GAME
          </h1>
          <p>TV SHOWS Rated R</p>
        </div>
        <div>
          <p className="max-w-[85%] sm:max-w-[65%] md:max-w-[50%] mx-auto">
            Lorem ipsum dolor sit amet consectetur. Viverra sed maecenas
            convallis gravida aenean. Vitae at aliquet accumsan amet sapien
            ipsum libero.
          </p>
        </div>
        <div>
          <button className="py-3 px-3 bg-black">HELLO GUys</button>
        </div>
      </div>

      <div className=" w-full bg-blue-600 flex flex-col gap-6 py-5 text-center">
        <div>
          <h1 className={`${BeabasFont.className} text-4xl`}>Trending Media</h1>
          <motion.div className="overflow-x-hidden " ref={constrainsRef}>
            <motion.div
              className="flex gap-6 w-full"
              drag="x"
              dragConstraints={{ right: 0, left: Sliderwidth }}
            >
              {ArraysCaoursel.map((item, i) => (
                <div
                  className="bg-red-500 min-w-[200px] h-36 rounded-lg pointer-events-none"
                  key={i}
                >
                  {item}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
