import { IconArrowRight, IconShoppingBag } from "@tabler/icons-react";
import Btn from "./btn";
import Link from "next/link";
import BnrBadge from "./bnrBadge";

const Banner = () => {
  const data = [
    {
      span: "1000+",
      para: "Products",
    },
    {
      span: "500+",
      para: "Happy Customers",
    },
    {
      span: "4.8",
      para: "Rating",
    },
  ];
  return (
    <div
      className="bg-purple-700 py-16 lg:mt-14 mt-25 px-4 md:px-10"
      id="banner">
      <center>
        <BnrBadge
          icon="IconTarget"
          text="Limited Time - Special Offers Available!"
        />
      </center>
      <h1 className="text-white mt-5 font-bold text-3xl md:text-5xl text-center">
        Welcome to ShopVibe
      </h1>

      <p className="text-lg md:text-2xl text-white text-center mt-4 md:mt-6">
        Find amazing products at great prices
      </p>

      <p className="text-sm md:text-lg text-[#eeeeee] text-center mt-4 md:mt-6">
        Discover thousands of quality products from electronics to fashion. Fast
        delivery, <br className="hidden md:block" /> secure payment, and
        excellent customer service.
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-x-5 mt-6">
        <Link href="#product">
          <Btn
            icon1={<IconShoppingBag />}
            text="Start Shopping"
            icon2={<IconArrowRight />}
          />
        </Link>
        <Link href="#product">
          <Btn text="View Deals" />
        </Link>
      </div>

      <hr className="w-full md:w-2/3 text-[#979797] mx-auto mt-8" />

      <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-x-28 mt-10">
        {data.map((item, index) => (
          <div key={index}>
            <p className="text-[#d8d8d8] text-center">
              <span className="text-2xl md:text-3xl font-bold text-white">
                {item.span}
              </span>
              <br />
              {item.para}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
