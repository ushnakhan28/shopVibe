import {
  IconEye,
  IconHeart,
  IconHeartFilled,
  IconLoader2,
  IconReload,
  IconShieldCheck,
  IconShoppingCart,
  IconStarFilled,
  IconTruck,
  IconX,
} from "@tabler/icons-react";
import Header from "../../components/home/header";
import { useEffect, useState } from "react";
import { Badge } from "@mantine/core";
import BackBtn from "../../components/home/backBtn";
import Link from "next/link";

const Wishlist = () => {
  const [showpopup, setshowpopup] = useState(false);
  const [selectedproduct, setselectedproduct] = useState(null);
  const [wishlist, setwishlist] = useState([]);
  const [loading, setloading] = useState(false);
  const [removingId, setRemovingId] = useState(null);
  const [quantity, setquantity] = useState(1);

  const handlebtn = (id) => {
    const updatedWishlist = wishlist.filter((item) => item?.id !== id);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setwishlist(updatedWishlist);
  };

  useEffect(() => {
    setloading(true);
    setTimeout(() => {
      const data = JSON.parse(localStorage.getItem("wishlist")) || [];
      const filteredData = data.filter((item) => item && item.id);
      setwishlist(filteredData);
      setloading(false);
    }, 2000);
  }, []);

  const handlepopup = (product) => {
    setloading(true);
    setshowpopup(true);
    setselectedproduct(product);
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      setloading(false);
    }, 1500);
  };

  const closepopup = () => {
    setshowpopup(false);
    document.body.style.overflow = "auto";
  };

  const decrease = () => {
    if (quantity > 1) {
      setquantity(quantity - 1);
    }
  };

  const increase = () => {
    if (quantity < selectedproduct.stock) {
      setquantity(quantity + 1);
    }
  };

  return (
    <div id="wishlist">
      {/* <Header /> */}

      <section className="mt-40 lg:mt-30 lg:mx-9 md:mx-4 sm:mx-5 mx-4">
        <div className="flex flex-col gap-y-6">
          <BackBtn />
          <h1 className="flex gap-x-3 text-2xl font-bold items-center">
            <IconHeart color="red" /> My Favourites
          </h1>
        </div>
        <div>
          {wishlist.length === 0 ? (
            <p className="mt-3 text-[#adadad]">No items in Favourites.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-5 mt-5 gap-x-5">
              {wishlist?.map((card, index) => (
                <div key={card?.id || index} className="h-[380px]">
                  <div className="h-full flex flex-col justify-between border border-[#d3d3d3] p-3 rounded-xl group hover:shadow-xl duration-300">
                    <div className="relative overflow-hidden rounded-xl">
                      <img
                        src={card?.img}
                        className="w-full h-[200px] object-cover rounded-xl group-hover:scale-105 duration-300"
                        alt={card?.title}
                      />
                      {card.discount !== 0 && (
                        <div className="absolute top-2 left-2 z-10">
                          <Badge
                            color="red"
                            variant="filled"
                            radius="xl"
                            size="lg"
                            className="bg-red-600 text-white">
                            {card.discount}%
                          </Badge>
                        </div>
                      )}

                      <div className="absolute top-2 right-2 flex flex-col gap-y-2 items-end opacity-100 md:opacity-0 group-hover:md:opacity-100 duration-300 z-10">
                        <div className="bg-white p-1 rounded-full cursor-pointer shadow-xl relative">
                          {removingId === card.id ? (
                            <div className="flex text-[#9333EA]">
                              <IconLoader2 size={18} className="animate-spin" />
                            </div>
                          ) : (
                            <div
                              onClick={() => {
                                setRemovingId(card.id);
                                setTimeout(() => {
                                  handlebtn(card?.id);
                                  setRemovingId(null);
                                }, 2000);
                              }}>
                              <IconHeartFilled color="red" size={18} />
                            </div>
                          )}
                        </div>
                        <div className="bg-white p-3 rounded-full cursor-pointer shadow-xl relative">
                          <IconEye
                            onClick={() => handlepopup(card)}
                            color="gray"
                            size={18}
                            className="absolute top-[3px] right-[3px]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="md:mt-5 flex flex-col gap-y-2">
                      <Badge
                        color="#7C3AED"
                        variant="light"
                        radius="xl"
                        size="md">
                        {card?.category}
                      </Badge>{" "}
                      <p className="text-lg font-bold">{card?.title}</p>
                      <p className="flex gap-x-1 items-center">
                        <IconStarFilled color="orange" />
                        {card?.rating}
                      </p>
                      <div className="flex justify-between items-center">
                        {card.discount > 0 ? (
                          <div className="flex items-center gap-x-3">
                            <p className="text-xl font-semibold">
                              <span>$</span>
                              {card.discountedPrice}
                            </p>
                            <p className="font-lg line-through font-thin text-[#8f8f8f]">
                              <span>$</span>
                              {card.price}
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-xl flex items-center font-semibold">
                              <span>$</span>
                              {card.price}
                            </p>
                          </div>
                        )}
                        <Link href={"/addToCart"}>
                          <button className="items-center cursor-pointer text-white px-3 py-2 hover:bg-[#8b32ff] duration-300 flex gap-x-2 rounded-xl bg-[#7D2AE8] hover:scale-105">
                            <IconShoppingCart size={19} className="w-5 h-5" />{" "}
                            Add
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* POPUP */}
        {showpopup && selectedproduct && (
          <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center">
            <div className="absolute w-full h-full bg-black/80 backdrop-blur-[1px] pointer-events-none"></div>
            <div className="mx-3 relative z-10 bg-white rounded-xl shadow-lg p-8 max-w-4xl h-[83vh] md:max-h-[90vh] overflow-y-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8">
              <button
                onClick={closepopup}
                className="cursor-pointer absolute top-3 right-3 bg-[#7D2AE8] text-white p-2 rounded-full shadow-md hover:scale-105 transition z-20">
                <IconX size={18} />
              </button>

              <div>
                <img
                  src={selectedproduct.img}
                  className="w-[550px] h-[445px] object-cover rounded-xl"
                  alt={selectedproduct.title}
                />
              </div>

              <div className="flex flex-col gap-y-[6px]">
                <Badge variant="light" color="#8b5cf6" radius="xl" size="md">
                  {selectedproduct.category}
                </Badge>
                <h1 className="text-xl font-bold tracking-wider">
                  {selectedproduct.title}
                </h1>
                <p className="flex gap-x-1 items-center">
                  <IconStarFilled color="orange" size={20} />
                  {selectedproduct.rating}
                </p>

                {selectedproduct.discount > 0 ? (
                  <div className="flex items-center gap-x-5">
                    <p className="text-3xl font-bold">
                      <span>$</span>
                      {selectedproduct.discountedPrice}
                    </p>
                    <p className="line-through text-2xl font-thin text-[#b6b6b6]">
                      <span>$</span>
                      {selectedproduct.price}
                    </p>
                    <Badge color="red" variant="light" radius="xl" size="lg">
                      {selectedproduct.discount}%
                    </Badge>
                  </div>
                ) : (
                  <div>
                    <h1 className="flex items-center mt-1 text-3xl font-bold">
                      <span className="text-3xl">$</span>
                      {selectedproduct.price}
                    </h1>
                  </div>
                )}
                <p className="text-green-700 font-semibold">
                  {selectedproduct.stock} in stock
                </p>
                <h1 className="text-md font-semibold">Description</h1>
                <p className="text-[#4d4d4d] leading-5 text-sm">
                  {selectedproduct.description}
                </p>
                <h1 className="text-md font-semibold">Key Features</h1>
                {selectedproduct.features && (
                  <ul className="list-disc list-inside text-sm text-[#4d4d4d] space-y-1">
                    {selectedproduct.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                )}
                <div className="flex gap-x-4 items-center">
                  <h1 className="text-md font-semibold">Quantity:</h1>
                  <div className="flex items-center border border-[#adadad] rounded-md overflow-hidden">
                    <button
                      onClick={decrease}
                      className="cursor-pointer px-3 py-[2px] text-lg font-semibold bg-[#f3f3f3] hover:bg-[#e2e2e2]">
                      -
                    </button>
                    <span className="px-4 py-[2px] text-md font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={increase}
                      className="cursor-pointer px-3 py-[2px] text-lg font-semibold bg-[#f3f3f3] hover:bg-[#e2e2e2]">
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap md:flex-nowrap justify-between gap-3 mt-5">
                  <Link href={"/addToCart"}>
                    <button className="items-center cursor-pointer text-white px-3 py-2 flex gap-x-2 rounded-xl bg-[#7D2AE8] hover:bg-[#8b32ff] duration-300">
                      <IconShoppingCart size={19} className="w-5 h-5" /> Add To
                      Cart
                    </button>
                  </Link>

                  <button className="flex-1 px-4 py-2 rounded-xl border border-[#adadad] font-semibold hover:bg-[#f5f5f5] transition">
                    Buy Now
                  </button>

                  <div className="flex items-center justify-center px-3 py-2 flex-shrink cursor-pointer rounded-xl border border-[#adadad]">
                    {removingId === selectedproduct?.id ? (
                      <div className="flex text-[#9333EA]">
                        <IconLoader2 size={20} className="animate-spin" />
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          setRemovingId(selectedproduct?.id);
                          setTimeout(() => {
                            handlebtn(selectedproduct?.id);
                            setshowpopup(false);
                            setRemovingId(null);
                          }, 2000);
                        }}>
                        <IconHeartFilled color="red" size={20} />
                      </div>
                    )}
                  </div>
                </div>
                <hr className="w-full text-[#cfcfcf] mx-auto mt-5" />
                <div className="flex flex-col gap-y-2 mt-5">
                  <div className="flex gap-x-2">
                    <IconTruck className="text-[#3B82F6]" size={20} />
                    <p className="text-[#4d4d4d] text-sm">
                      Free delivery on orders over $50
                    </p>
                  </div>
                  <div className="flex gap-x-2">
                    <IconReload className="text-[#8B5CF6]" size={20} />
                    <p className="text-[#4d4d4d] text-sm">
                      30-day return policy
                    </p>
                  </div>
                  <div className="flex gap-x-2">
                    <IconShieldCheck className="text-[#10B981]" size={20} />
                    <p className="text-[#4d4d4d] text-sm">
                      2-year warranty included
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Wishlist;
