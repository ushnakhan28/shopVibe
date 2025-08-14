import BnrBadge from "../home/bnrBadge";
import { IconArrowLeft } from "@tabler/icons-react";

const CategoryBnr = (banner) => {
  return (
    <div className="bg-[#9333EA] py-16 px-4 md:px-10 -mt-5">
      <a
        href="/"
        className="mt-15 absolute top-4 left-4 md:top-6 md:left-6 text-white bg-[#c688ff] text-md px-3 py-1 rounded-xl shadow-lg hover:bg-[#b26fff] hover:scale-105 transition transform">
        <div className="flex items-center gap-x-2">
          <IconArrowLeft size={20} /> Back to Home
        </div>
      </a>
      <div className="">
        <BnrBadge icon={banner.icon} text={banner.text} />
      </div>
      <h1 className="text-white font-bold md:text-5xl text-3xl mt-5 text-center">
        {banner.head}
      </h1>
      <p className="text-lg md:text-xl text-white text-center mt-4 md:mt-6">
        {banner.para}
      </p>
      {/* <div>
        {data.map(() => (
          <div>
            <i></i>
            <h1></h1>
            <p></p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default CategoryBnr;
