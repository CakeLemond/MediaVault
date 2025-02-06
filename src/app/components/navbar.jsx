"use client";
import { Raleway } from "next/font/google";
import { SectionButton } from "./Button";
import { CiSearch } from "react-icons/ci";
import { Squash as Hamburger } from "hamburger-react";
const RalewayFont = Raleway({
  subsets: ["latin"],
  weight: "500",
});
const navbar = () => {
  return (
    <nav
      className={` mt-8 flex  justify-between w-full items-center ${RalewayFont.className} `}
    >
      <div className=" flex gap-6">
        <SectionButton IsLink={true} id={"#TvShows"}>
          Movie
        </SectionButton>
        <SectionButton IsLink={true} id={"Movie"}>
          TV Shows
        </SectionButton>
      </div>
      <div className="hidden lg:flex gap-6">
        <SectionButton IsLink={true} id={"Home"}>
          Home
        </SectionButton>
        <SectionButton IsLink={true} id={"Contact"}>
          Contact
        </SectionButton>
        <SectionButton IsLink={true} id={"View More"}>
          View More
        </SectionButton>
      </div>

      <div className="flex gap-6 items-center lg:hidden">
        <CiSearch className=" hidden sm:block text-5xl text-white" />
        <Hamburger color="white" label="Show Menu" />
      </div>

      <div className="relative hidden lg:block">
        <input
          type="text"
          placeholder="Search for a movie or a TV show..."
          className="hidden lg:block border border-white rounded-lg bg-transparent placeholder:text-white  w-80 pl-5 py-3 text-white text-center focus:outline-none "
        />
        <CiSearch className=" absolute left-[12px] top-[11px]  text-3xl text-white  " />
      </div>
    </nav>
  );
};

export default navbar;
