import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../../components/home/header";
import Footer from "../../../components/home/footer";
import CategoryBnr from "../../../components/category/categoryBnr";
import {
  IconAdjustmentsHorizontal,
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
import { Badge } from "@mantine/core";

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [showpopup, setshowpopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [categoryData, setCategoryData] = useState(null);
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [filter, setfilter] = useState(null);
  const [added, setAdded] = useState(false);
  const [addedItems, setAddedItems] = useState({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    setFavorites(stored.map((item) => item.id));
  }, []);

  const toggleFavorite = (productId) => {
    let stored = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (stored.find((p) => p.id === productId)) {
      stored = stored.filter((p) => p.id !== productId);
    } else {
      const product = products.find((p) => p.id === productId);
      if (product) stored.push(product);
    }

    localStorage.setItem("wishlist", JSON.stringify(stored));
    setFavorites(stored.map((p) => p.id));

    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  useEffect(() => {
    if (!slug) return;

    fetch("/api/category")
      .then((res) => res.json())
      .then((data) => {
        const cat = data.find((c) => c.name === slug);
        setCategoryData(cat || null);
      });

    fetch("/api/product")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((p) => p.category === slug);
        setProducts(filtered);
      });
  }, [slug]);

  if (!categoryData)
    return (
      <div className="p-5 flex items-center h-[100vh] justify-center">
        <IconLoader2 size={50} className="animate-spin text-purple-700" />
      </div>
    );
  const handleAdd = (product, quantity = 1) => {
    if (!product) return;
    addToCart(product, quantity);

    setAddedItems((prev) => ({
      ...prev,
      [product.id]: true,
    }));
  };

  const handlepopup = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setshowpopup(true);
    document.body.style.overflow = "hidden";
  };

  const closepopup = () => {
    setshowpopup(false);
    document.body.style.overflow = "auto";
  };

  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  const increase = () => {
    if (selectedProduct && quantity < selectedProduct.stock)
      setQuantity(quantity + 1);
  };
  const addToCart = (product, quantity = 1) => {
    if (typeof window !== "undefined") {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existingItemIndex = cart.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += quantity;
      } else {
        cart.push({ ...product, quantity });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      // 🔔 Header ko update karne ke liye event
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  const data = [
    "Under $25",
    "$25 - $50",
    "$50 - $100",
    "$100 - $200",
    "Over $200",
  ];
  const finalFilteredProducts = products.filter((product) => {
    // Price filter
    if (filter) {
      if (filter === "Under $25") {
        return (
          (product.discount > 0 && product.discountedPrice < 25) ||
          (product.discount === 0 && product.price < 25)
        );
      }
      if (filter === "$25 - $50") {
        return (
          (product.discount > 0 &&
            product.discountedPrice >= 25 &&
            product.discountedPrice < 50) ||
          (product.discount === 0 && product.price >= 25 && product.price < 50)
        );
      }
      if (filter === "$50 - $100") {
        return (
          (product.discount > 0 &&
            product.discountedPrice >= 50 &&
            product.discountedPrice < 100) ||
          (product.discount === 0 && product.price >= 50 && product.price < 100)
        );
      }
      if (filter === "$100 - $200") {
        return (
          (product.discount > 0 &&
            product.discountedPrice >= 100 &&
            product.discountedPrice < 200) ||
          (product.discount === 0 &&
            product.price >= 100 &&
            product.price < 200)
        );
      }
      if (filter === "Over $200") {
        return (
          (product.discount > 0 && product.discountedPrice >= 200) ||
          (product.discount === 0 && product.price >= 200)
        );
      }
    }

    return true;
  });
  return (
    <div className="w-full">
      <Header />
      <div className="mt-20">
        <center>
          <CategoryBnr
            icon={categoryData.icon}
            text={categoryData.badge}
            head={categoryData.bannerHead}
            para={categoryData.bannerPara}
            stats={categoryData.stats}
          />
        </center>
      </div>
      <div className="my-15">
        <div className="flex flex-col md:flex-row md:items-center flex-wrap sm:mx-10 mx-5  md:mx-10 border border-b-[#c9c9c9] py-3 border-l-0 border-r-0 border-t-[#c9c9c9] mt-15 md:mt-20 gap-x-20">
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
                    filter === item
                      ? "bg-purple-700 text-white"
                      : "bg-[#f0f0f0]"
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
                <span className="flex gap-x-2">
                  {finalFilteredProducts.length}
                  {finalFilteredProducts.length > 1 ? (
                    <p>products found</p>
                  ) : (
                    <p>product found</p>
                  )}
                </span>
              </Badge>
            </div>
          </div>
        </div>
        <div className="md:mx-20 mx-10 my-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-5 mt-5 gap-x-5">
            {finalFilteredProducts?.length > 0 ? (
              finalFilteredProducts?.map((product) => (
                <div key={product?.id} className="h-[380px]">
                  <div className="h-full flex flex-col justify-between border border-[#d3d3d3] p-3 rounded-lg group hover:shadow-xl duration-300">
                    <div className="relative overflow-hidden rounded-lg">
                      <img
                        src={product.img}
                        className="w-full h-[200px] object-cover rounded-lg group-hover:scale-105 duration-300"
                        alt={product.title}
                      />
                      {product.discount !== 0 && (
                        <div className="absolute top-2 left-2 z-10">
                          <Badge
                            color="red"
                            variant="filled"
                            radius="xl"
                            size="lg"
                            className="bg-red-600 text-white">
                            {product.discount}%
                          </Badge>
                        </div>
                      )}
                      <div className="absolute top-2 right-2 flex flex-col gap-y-2 items-end opacity-100 md:opacity-0 group-hover:md:opacity-100 duration-300 z-10">
                        <div className="bg-white p-1 rounded-full cursor-pointer shadow-xl relative">
                          <div onClick={() => toggleFavorite(product.id)}>
                            {favorites.includes(product.id) ? (
                              <IconHeartFilled color="red" size={18} />
                            ) : (
                              <IconHeart color="gray" size={18} />
                            )}
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded-full cursor-pointer shadow-xl relative">
                          <IconEye
                            onClick={() => handlepopup(product)}
                            color="gray"
                            size={18}
                            className="absolute top-[3px] right-[3px]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="md:mt-5 flex flex-col gap-y-2">
                      <Badge
                        color="#7e22ce"
                        variant="light"
                        radius="xl"
                        size="md">
                        {product.category}
                      </Badge>
                      <p className="text-lg font-bold">{product.title}</p>
                      <p className="flex gap-x-1 items-center">
                        <IconStarFilled color="orange" />
                        {product.rating}
                      </p>
                      <div className="flex justify-between items-center">
                        {product.discount > 0 ? (
                          <div className="flex items-center gap-x-3">
                            <p className="text-xl font-semibold">
                              <span>$</span>
                              {product.discountedPrice}
                            </p>
                            <p className="font-lg line-through font-thin text-[#8f8f8f]">
                              <span>$</span>
                              {product.price}
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-xl flex items-center font-semibold">
                              <span>$</span>
                              {product.price}
                            </p>
                          </div>
                        )}
                        <button
                          onClick={() => handleAdd(product, 1)}
                          disabled={addedItems[product.id]} // sirf current product disable
                          className={`flex items-center justify-center gap-x-2 px-3 py-2 rounded-lg text-white 
    ${
      addedItems[product.id]
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-purple-700"
    }`}>
                          <IconShoppingCart size={19} />
                          {addedItems[product.id] ? "Added" : "Add"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex justify-center items-center h-40">
                <p className="text-center text-[#a0a0a0]">
                  No products found matching your criteria
                </p>
              </div>
            )}
          </div>
        </div>
        {showpopup && selectedProduct && (
          <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center">
            <div className="absolute w-full h-full bg-black/80 backdrop-blur-[1px] pointer-events-none"></div>
            <div className="mx-3 relative z-10 bg-white rounded-lg shadow-lg p-8 max-w-4xl h-[83vh] md:max-h-[90vh] overflow-y-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8">
              <button
                onClick={closepopup}
                className="cursor-pointer absolute top-3 right-3 bg-purple-700 text-white p-2 rounded-full shadow-md hover:scale-105 transition z-20">
                <IconX size={18} />
              </button>

              <div>
                <img
                  src={selectedProduct.img}
                  className="w-[550px] h-[445px] object-cover rounded-lg"
                  alt={selectedProduct.title}
                />
              </div>

              <div className="flex flex-col gap-y-[6px]">
                <Badge variant="light" color="#7e22ce" radius="xl" size="md">
                  {selectedProduct.category}
                </Badge>
                <h1 className="text-xl font-bold tracking-wider">
                  {selectedProduct.title}
                </h1>
                <p className="flex gap-x-1 items-center">
                  <IconStarFilled color="orange" size={20} />
                  {selectedProduct.rating}
                </p>

                {selectedProduct.discount > 0 ? (
                  <div className="flex items-center gap-x-5">
                    <p className="text-3xl font-bold">
                      <span>$</span>
                      {selectedProduct.discountedPrice}
                    </p>
                    <p className="line-through text-2xl font-thin text-[#b6b6b6]">
                      <span>$</span>
                      {selectedProduct.price}
                    </p>
                    <Badge color="red" variant="light" radius="xl" size="lg">
                      {selectedProduct.discount}%
                    </Badge>
                  </div>
                ) : (
                  <div>
                    <h1 className="flex items-center mt-1 text-3xl font-bold">
                      <span className="text-3xl">$</span>
                      {selectedProduct.price}
                    </h1>
                  </div>
                )}
                <p className="text-green-700 font-semibold">
                  {selectedProduct.stock} in stock
                </p>
                <h1 className="text-md font-semibold">Description</h1>
                <p className="text-[#4d4d4d] leading-5 text-sm">
                  {selectedProduct.description}
                </p>
                <h1 className="text-md font-semibold">Key Features</h1>
                {selectedProduct.features && (
                  <ul className="list-disc list-inside text-sm text-[#4d4d4d] space-y-1">
                    {selectedProduct.features.map((feature, index) => (
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
                  <button
                    onClick={() => handleAdd(selectedProduct, quantity)}
                    disabled={addedItems[selectedProduct.id]} // same status use karo
                    className={`flex-1 flex items-center justify-center gap-x-2 px-4 py-2 rounded-lg text-white 
    ${
      addedItems[selectedProduct.id]
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-purple-700"
    }`}>
                    <IconShoppingCart size={19} />
                    {addedItems[selectedProduct.id] ? "Added" : "Add to Cart"}
                  </button>

                  <button className="flex-1 px-4 py-2 rounded-lg border border-[#adadad] font-semibold hover:bg-[#f5f5f5] transition">
                    Buy Now
                  </button>

                  <div className="flex items-center justify-center px-3 py-2 flex-shrink cursor-pointer rounded-lg border border-[#adadad]">
                    <div onClick={() => toggleFavorite(selectedProduct.id)}>
                      {favorites.includes(selectedProduct.id) ? (
                        <IconHeartFilled color="red" size={18} />
                      ) : (
                        <IconHeart size={18} />
                      )}
                    </div>
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
      </div>
      <Footer />
    </div>
  );
}
