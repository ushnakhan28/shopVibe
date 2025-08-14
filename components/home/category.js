import { useEffect, useState } from "react";
import Title from "./title";
import {
  IconArrowLeft,
  IconArrowRight,
  IconCategory,
  IconLoader2,
} from "@tabler/icons-react";
import Btn from "./btn";
import AppBadge from "./badge";
import Link from "next/link";
const Category = () => {
  const [categories, setcategories] = useState([]);
  const [showAll, setshowAll] = useState(false);
  const [loading, setloading] = useState(false);

  const show = () => {
    setloading(true);
    setTimeout(() => {
      setshowAll(true);
      setloading(false);
    }, 2000);
  };
  const less = () => {
    setloading(true);
    setTimeout(() => {
      setshowAll(false);
      setloading(false);
    }, 2000);
  };

  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then((data) => setcategories(data));
  }, []);

  const visibleCategories = showAll ? categories : categories.slice(0, 6);

  return (
    <div id="category" className="bg-[#f1f1f1] pb-20 pt-1">
      <AppBadge text="Product Categories" icon={<IconCategory size={18} />} />
      <Title
        head="Shop by Category"
        para="Discover amazing products across our carefully curated categories"
      />
      <div className="justify grid md:grid-cols-3 grid-cols-1 gap-10 md:mt-20 mt-10 md:mx-20 mx-10">
        {visibleCategories?.map((item) => (
          <div
            key={item.id}
            className="bg-[#f8f8f8] rounded-xl group duration-[0.3s] overflow-hidden hover:shadow-xl">
            <div className="relative overflow-hidden">
              <img
                className="group-hover:scale-105 rounded-t-xl duration-[0.3s] w-full h-[150px] md:h-[250px]"
                src={item.img}
                alt={item.name}
              />
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-30 duration-[0.3s]"></div>
              <div></div>
            </div>
            <div className="flex flex-col gap-y-2 px-5 py-8">
              <p className="font-bold text-xl">{item.name}</p>
              <p className="text-sm text-[#adadad]">{item.desc}</p>
              <p className="text">{item.totalProducts} Products</p>
              <Link href={`/categories/${encodeURIComponent(item.name)}`}>
                <button className="group-hover:bg-[#9333EA] duration-[0.3s] group-hover:text-white w-full flex mt-2 gap-x-2 justify-center cursor-pointer border-1 border-[#cacaca] rounded-xl px-5 py-3">
                  {item.buttonText}
                  <IconArrowRight className="group-hover:translate-x-2 duration-[0.3s]" />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-20">
        {loading ? (
          <div className="flex gap-x-3 bg-white rounded-xl text-[#9333EA] border-2 border-[#9333EA] shadow-sm cursor-not-allowed px-3 py-2">
            <IconLoader2 className="animate-spin" />
            <span>Loading Catagories...</span>
          </div>
        ) : !showAll ? (
          <Btn
            click={show}
            text="View All Categories"
            icon2={<IconArrowRight />}
          />
        ) : (
          <div className="flex justify-center">
            <Btn
              click={less}
              text="View Less Categories"
              icon2={<IconArrowLeft />}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default Category;
