import { Raleway } from "next/font/google";
const RalewayFont = Raleway({
  subsets: ["latin"],
  weight: "400",
});
export const SectionButton = ({ id, children, IsLink }) => {
  return (
    <a
      className={`px-4 py-2 text-white border border-white rounded-lg cursor-pointer`}
      href={IsLink ? id : undefined}
    >
      {children}
    </a>
  );
};
