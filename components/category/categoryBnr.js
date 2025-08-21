import Link from "next/link";
import BnrBadge from "../home/bnrBadge";
import { IconArrowLeft } from "@tabler/icons-react";
import * as TablerIcons from "@tabler/icons-react";
import BackBtn from "../home/backBtn";

const CategoryBnr = ({ icon, text, head, para, stats }) => {
  return (
    <div className="relative bg-[#9333EA] py-16 px-4 md:px-10 -mt-5">
      <Link
        href="/"
        className="inline-flex items-center gap-x-2 text-white bg-[#b464ff] text-md px-3 py-1 rounded-xl shadow-lg hover:bg-[#b26fff] hover:scale-105 transition transform absolute lg:top-6 top-18 left-8">
        <IconArrowLeft size={20} />
        <span className="hidden sm:block">Back to Home</span>
      </Link>

      <div className="mt-20">
        <BnrBadge icon={icon} text={text} />
      </div>
      <h1 className="text-white font-bold md:text-5xl text-3xl mt-5 text-center">
        {head}
      </h1>
      <p className="text-lg md:text-xl text-white text-center mt-4 md:mt-6">
        {para}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 lg:mx-20 md:mx-12 sm:mx-10 xs:mx-5">
        {stats?.map((item, index) => {
          const IconComponent = TablerIcons[item.icon];
          return (
            <div
              key={index}
              className="bg-[#1E1E2F] rounded-2xl p-6 text-center shadow-md hover:shadow-2xl group transition duration-300">
              <div className="flex justify-center mb-4">
                <div className="group-hover:scale-105 transition duration-300 p-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg">
                  {IconComponent && <IconComponent size={30} color="white" />}
                </div>
              </div>
              <h1 className="text-white font-bold text-xl">{item.title}</h1>
              <p className="text-gray-300">{item.subtitle}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryBnr;
