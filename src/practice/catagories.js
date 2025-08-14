import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

const categories = () => {
  const categoriesdata = [
    { content: "electronics" },
    { content: "jewelery" },
    { content: "men's clothing" },
    { content: "women's clothing" },
  ];
  const [selectedcategory, setselectedcategory] = useState(null);
  const fetchData = async () => {
    const res = await fetch(
      `https://fakestoreapi.com/products/category/${selectedcategory}`
    );
    return res.json();
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories", selectedcategory],
    queryFn: fetchData,
    enabled: !!selectedcategory,
  });

  return (
    <>
      <Link href="/" className="text-center text-2xl block mt-5 underline">
        back
      </Link>
      <div className="mt-5">
        <p className="text-3xl text-center font-bold text-black">
          Explore Our Categories
        </p>
        <p className="text-lg text-center text-gray-500 mt-2">
          Discover products tailored to your needs in every category.
        </p>
        <div className="flex justify-center mx-auto gap-8 mt-5">
          {categoriesdata.map((item, index) => (
            <button
              key={index}
              onClick={() => setselectedcategory(item.content)}
              className={`px-5 py-2 border-2 border-black rounded-xl cursor-pointer ${
                selectedcategory === item.content
                  ? "bg-black text-white transition duration-[0.5s]"
                  : "bg-white text-black transition duration-[0.5s]"
              }`}>
              {item.content}
            </button>
          ))}
        </div>
        <div>
          {isLoading && <p className="text-center mt-10">Loading...</p>}
          {error && <p> ERROR!!!</p>}
          <div className="grid md:grid-cols-3 gap-8 mt-10 justify-items-center">
            {data?.map((product) => (
              <div className="border-2 border-black px-8 py-5 w-[300px]">
                <img
                  className="h-40 mx-auto"
                  src={product.image}
                  alt={product.reload}
                />
                <h1 className="text-[18px] font-bold mt-2">{product.title}</h1>
                <p className="text-lg mt-1">Category: {product.category}</p>
                <p className="text-md mt-1">Price: {product.price}</p>
                <button className="mt-3 px-5 py-2 bg-black rounded-xl cursor-pointer text-white">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default categories;
