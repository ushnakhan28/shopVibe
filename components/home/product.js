import { useEffect, useState } from "react";
import Title from "./title";
import {
  IconShoppingCart,
  IconStar,
  IconStarFilled,
  IconChevronLeft,
  IconChevronRight,
  IconEye,
  IconHeart,
  IconHeartFilled,
  IconX,
  IconReload,
  IconTruck,
  IconShieldCheck,
  IconAdjustmentsHorizontal,
  IconChevronDown,
  IconColumns3,
  IconLayoutColumns,
  IconLoader2,
  IconArrowLeft,
  IconArrowRight,
} from "@tabler/icons-react";
import AppBadge from "./badge";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ActionIcon, Badge, Select } from "@mantine/core";
import Btn from "./btn";
import Link from "next/link";
import { useRouter } from "next/router";

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute right-[-25px] top-[40%] z-10 cursor-pointer bg-purple-700 text-white p-2 rounded-full hover:scale-105 duration-300">
      <IconChevronRight />
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute left-[-25px] top-[40%] z-10 cursor-pointer bg-purple-700 text-white p-2 rounded-full hover:scale-105 duration-300">
      <IconChevronLeft />
    </div>
  );
};

const Product = () => {
  const router = useRouter();

  const [products, setproducts] = useState([]);
  const [showbg, setshowbg] = useState(null);
  const [showpopup, setshowpopup] = useState(false);
  const [selectedproduct, setselectedproduct] = useState(null);
  const [quantity, setquantity] = useState(1);
  const [filter, setfilter] = useState(null);
  const [noproduct, setnoproduct] = useState(false);
  const [dropdown, setdropdown] = useState(false);
  const [columns3, setcolumns3] = useState(false);
  const [columns4, setcolumns4] = useState(false);
  const [showall, setshowall] = useState(false);
  const [loading, setloading] = useState(false);
  const [popupAdded, setPopupAdded] = useState(false);

  const addToCart = (product) => {
    if (typeof window !== "undefined") {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existingItemIndex = cart.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdated"));
    }
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

  const handlepopup = (product) => {
    setshowpopup(true);
    setselectedproduct(product);
    document.body.style.overflow = "hidden";
  };

  const closepopup = () => {
    setshowpopup(false);
    document.body.style.overflow = "auto";
  };

  function bgfilled(id, product) {
    const updated = { ...showbg };
    updated[id] = true;
    setshowbg(updated);
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const alreadyExists = wishlist.some((item) => item?.id === product.id);
    if (!alreadyExists) {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("wishlistUpdated"));
    }
  }

  function bgstroke(id) {
    const updated = { ...showbg };
    updated[id] = false;
    setshowbg(updated);
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist = wishlist.filter((item) => item?.id !== id);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("wishlistUpdated"));
    }
  }

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const initialState = {};
    wishlist.forEach((item) => {
      initialState[item?.id] = true;
    });
    setshowbg(initialState);
  }, []);

  useEffect(() => {
    fetch("/api/product")
      .then((res) => res.json())
      .then((data) => setproducts(data));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const data = [
    "Under $25",
    "$25 - $50",
    "$50 - $100",
    "$100 - $200",
    "Over $200",
  ];

  const finalFilteredProducts = products.filter((card) => {
    if (
      dropdown &&
      dropdown !== "All Categories" &&
      card.category !== dropdown
    ) {
      return false;
    }

    if (filter) {
      if (filter === "Under $25") {
        return (
          (card.discount > 0 && card.discountedPrice < 25) ||
          (card.discount === 0 && card.price < 25)
        );
      }
      if (filter === "$25 - $50") {
        return (
          (card.discount > 0 &&
            card.discountedPrice >= 25 &&
            card.discountedPrice < 50) ||
          (card.discount === 0 && card.price >= 25 && card.price < 50)
        );
      }
      if (filter === "$50 - $100") {
        return (
          (card.discount > 0 &&
            card.discountedPrice >= 50 &&
            card.discountedPrice < 100) ||
          (card.discount === 0 && card.price >= 50 && card.price < 100)
        );
      }
      if (filter === "$100 - $200") {
        return (
          (card.discount > 0 &&
            card.discountedPrice >= 100 &&
            card.discountedPrice < 200) ||
          (card.discount === 0 && card.price >= 100 && card.price < 200)
        );
      }
      if (filter === "Over $200") {
        return (
          (card.discount > 0 && card.discountedPrice >= 200) ||
          (card.discount === 0 && card.price >= 200)
        );
      }
    }

    return true;
  });
  const visibleCategories = showall
    ? finalFilteredProducts
    : finalFilteredProducts.slice(0, 12);

  const show = () => {
    setloading(true);
    setTimeout(() => {
      setshowall(true);
      setloading(false);
    }, 2000);
  };
  const less = () => {
    setloading(true);
    setTimeout(() => {
      setshowall(false);
      setloading(false);
    }, 2000);
  };

  useEffect(() => {
    setnoproduct(finalFilteredProducts.length === 0);
  }, [finalFilteredProducts]);

  return (
    <div id="product" className="pt-1 relative">
      <AppBadge text=" Best Sellers" icon={<IconStar size={18} />} />
      <Title
        head="Featured Products"
        para="Explore our top-selling and most-loved products, handpicked just for you."
      />

      <div className="flex flex-col md:flex-row md:justify-between md:items-center flex-wrap sm:mx-10 mx-5  md:mx-10 border border-b-[#c9c9c9] py-3 border-l-0 border-r-0 border-t-[#c9c9c9] mt-4 md:mt-8 gap-4">
        {/* Filters heading */}
        <div className="flex gap-x-2 md:gap-x-3 items-center">
          <IconAdjustmentsHorizontal size={20} color="#aaaaaa" />
          <h1 className="font-semibold text-sm md:text-base text-[#747474]">
            Filters:
          </h1>
        </div>

        {/* Price filter */}
        <div className="flex flex-wrap gap-2 items-center">
          <h1 className="text-sm md:text-base text-[#747474]">Price:</h1>
          <div className="flex flex-wrap gap-2">
            {data?.map((item, index) => (
              <div
                key={index}
                onClick={() => setfilter(item)}
                className={`px-2 md:px-3 py-[1px] rounded-lg cursor-pointer ${
                  filter === item ? "bg-purple-700 text-white" : "bg-[#f0f0f0]"
                }`}>
                <span className="text-xs md:text-sm">{item}</span>
              </div>
            ))}
            <Badge
              color="#7e22ce"
              variant="light"
              radius="xl"
              size="md"
              className="mt-1">
              {finalFilteredProducts.length} products found
            </Badge>
          </div>
        </div>

        {/* Category dropdown */}
        <div className="w-full md:w-auto">
          <Select
            onChange={(value) => setdropdown(value)}
            className="w-full md:w-auto outline-1 outline-purple-700 rounded-sm"
            placeholder="All Categories"
            data={[
              "All Categories",
              "Electronics",
              "Fashion",
              "Home Decor",
              "Beauty",
              "Sports",
              "Books",
              "Gaming",
              "Accessories",
              "Baby & Kids",
              "Music",
              "Photography",
              "Kitchen",
            ]}
            rightSection={<IconChevronDown size={16} color="#7e22ce" />}
            rightSectionWidth={50}
            maxDropdownHeight={440}
            styles={{
              dropdown: {
                maxHeight: 200,
                overflowY: "auto",
              },
            }}
          />
        </div>
        <div className="w-17 lg:block items-center overflow-hidden hidden border-2 border-[#e5d6fb] rounded-lg bg-white">
          <button
            onClick={() => {
              setcolumns3(false);
              setcolumns4(true);
            }}
            className={`p-[7px] transition-all duration-300  ${
              columns4
                ? "bg-purple-700 text-white scale-105"
                : "bg-[#f3f3f3] text-purple-700 hover:bg-[#e5d6fb]"
            }`}>
            <IconColumns3 size={18} />
          </button>

          <button
            onClick={() => {
              setcolumns4(false);
              setcolumns3(true);
            }}
            className={`p-[7px] transition-all duration-300 ${
              columns3
                ? "bg-purple-700 text-white scale-105"
                : "bg-[#f3f3f3] text-purple-700 hover:bg-[#e5d6fb]"
            }`}>
            <IconLayoutColumns size={18} />
          </button>
        </div>
      </div>

      <div className="mx-10 md:mx-20 mt-5 md:mt-10 relative">
        {visibleCategories && finalFilteredProducts.length > 0 ? (
          !columns3 && !columns4 && !filter && !dropdown ? (
            <Slider {...settings}>
              {finalFilteredProducts.map((card) => (
                <ProductCard
                  key={card.id}
                  card={card}
                  showbg={showbg}
                  bgfilled={bgfilled}
                  bgstroke={bgstroke}
                  handlepopup={handlepopup}
                  addToCart={addToCart}
                />
              ))}
            </Slider>
          ) : (
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${
                columns3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
              }`}>
              {visibleCategories.map((card) => (
                <ProductCard
                  key={card.id}
                  card={card}
                  showbg={showbg}
                  bgfilled={bgfilled}
                  bgstroke={bgstroke}
                  handlepopup={handlepopup}
                  addToCart={addToCart}
                />
              ))}

              <div className="flex justify-center mt-10 md:20 col-span-full">
                {loading ? (
                  <div className="flex gap-x-3 bg-white rounded-lg text-purple-700 border-2 border-purple-700 shadow-sm cursor-not-allowed px-3 py-2">
                    <IconLoader2 className="animate-spin" />
                    <span>Loading Categories...</span>
                  </div>
                ) : !showall ? (
                  <button
                    onClick={show}
                    type="submit"
                    className="bg-purple-700 px-6 py-3 flex gap-x-2 rounded-lg text-white cursor-pointer ">
                    View All Categories
                    <i>
                      <IconArrowRight />
                    </i>
                  </button>
                ) : (
                  <button
                    onClick={less}
                    type="submit"
                    className="bg-purple-700 px-6 py-3 flex gap-x-2 rounded-lg text-white cursor-pointer ">
                    View Less Categories
                    <i>
                      <IconArrowLeft />
                    </i>
                  </button>
                )}
              </div>
            </div>
          )
        ) : (
          <p className="text-center text-[#a0a0a0] mt-5">
            No products found matching your criteria
          </p>
        )}
      </div>

      {showpopup && selectedproduct && (
        <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center">
          <div className="absolute w-full h-full bg-black/80 backdrop-blur-[1px] pointer-events-none"></div>
          <div className="mx-3 relative z-10 bg-white rounded-lg shadow-lg p-8 max-w-4xl max-h-[83vh] overflow-y-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8">
            <button
              onClick={closepopup}
              className="cursor-pointer absolute top-3 right-3 bg-purple-700 text-white p-2 rounded-full shadow-md hover:scale-105 transition z-20">
              <IconX size={18} />
            </button>

            <div>
              <img
                src={selectedproduct.img}
                className="w-[550px] h-[445px] object-cover rounded-lg"
                alt={selectedproduct.title}
              />
            </div>
            <div className="flex flex-col gap-y-[6px]">
              <Badge variant="light" color="#7e22ce" radius="xl" size="md">
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
              <div className="flex justify-between mt-5">
                <div>
                  <button
                    onClick={() => {
                      addToCart(selectedproduct);
                      setPopupAdded(true);
                    }}
                    disabled={popupAdded}
                    className={`flex items-center gap-x-2 px-8 rounded-lg py-2 text-white 
          ${
            popupAdded
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-700 duration-300"
          }`}>
                    <IconShoppingCart size={19} />
                    {popupAdded ? "Added" : "Add to Cart"}
                  </button>
                </div>
                <div className="font-semibold">
                  <button className="cursor-pointer px-8 rounded-lg py-2 border border-[#adadad]">
                    Buy Now
                  </button>
                </div>
                <div className="flex items-center justify-center px-3 cursor-pointer rounded-lg border border-[#adadad]">
                  {showbg && showbg[selectedproduct.id] ? (
                    <IconHeartFilled
                      onClick={() => bgstroke(selectedproduct.id)}
                      color="red"
                      size={24}
                    />
                  ) : (
                    <IconHeart
                      onClick={() =>
                        bgfilled(selectedproduct.id, selectedproduct)
                      }
                      color="gray"
                      size={24}
                    />
                  )}{" "}
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
                  <IconReload className="text-purple-700" size={20} />
                  <p className="text-[#4d4d4d] text-sm">30-day return policy</p>
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
    </div>
  );
};

const ProductCard = ({
  card,
  showbg,
  bgfilled,
  bgstroke,
  handlepopup,
  addToCart,
}) => {
  const [added, setAdded] = useState(false);
  const handleAdd = () => {
    addToCart(card);
    setAdded(true);
  };

  return (
    <div className="p-2 h-[380px]">
      <div className="h-full flex flex-col justify-between border hover:scale-105 border-[#d3d3d3] p-3 rounded-lg group hover:shadow-xl duration-300">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={card.img}
            className="w-full h-[200px] object-cover rounded-lg group-hover:scale-105 duration-300"
            alt={card.title}
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
            <div className="bg-white p-3 rounded-full cursor-pointer shadow-xl relative">
              {showbg && showbg[card.id] ? (
                <IconHeartFilled
                  onClick={() => bgstroke(card.id)}
                  color="red"
                  size={16}
                  className="absolute top-[4px] right-[4px]"
                />
              ) : (
                <IconHeart
                  onClick={() => bgfilled(card.id, card)}
                  color="gray"
                  size={16}
                  className="absolute top-[4px] right-[4px]"
                />
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
            className="mt-3 md:mt-0"
            color="#7e22ce"
            variant="light"
            radius="xl"
            size="md">
            {card.category}
          </Badge>
          <p className="text-lg font-bold">{card.title}</p>
          <p className="flex gap-x-1 items-center">
            <IconStarFilled color="orange" />
            {card.rating}
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

            <button
              onClick={handleAdd}
              disabled={added}
              className={`items-center text-white px-3 py-2 flex gap-x-2 rounded-lg 
          ${
            added
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-700 hover:scale-105 duration-200"
          }`}>
              <IconShoppingCart size={19} className="w-5 h-5" />{" "}
              {added ? "Added" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
