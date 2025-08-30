import { useEffect, useState } from "react";
import { IconShoppingCart, IconTrash } from "@tabler/icons-react";
import Header from "../../components/home/header";
import WithOutLogin from "../../components/home/withoutLogin";
import BackBtn from "../../components/home/backBtn";

const AddToCart = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [quantity, setquantity] = useState(1);

  // 🔹 Check login status
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedIn === "true");
  }, []);

  // 🔹 Load cart + update on event
  useEffect(() => {
    const updateCart = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(storedCart);
    };

    // jab page load ho
    updateCart();

    // jab product add ho
    window.addEventListener("cartUpdated", updateCart);

    return () => {
      window.removeEventListener("cartUpdated", updateCart);
    };
  }, []);
  const handleRemoveFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };
  const handleClearCart = () => {
    localStorage.removeItem("cart"); // cart ko localStorage se remove kar diya
    setCart([]); // state ko empty kar diya
    window.dispatchEvent(new Event("cartUpdated")); // event trigger
  };
  const handleDecrease = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleIncrease = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < item.stock) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div>
      <Header />
      <section className="mt-40 lg:mt-30 lg:mx-9 md:mx-4 sm:mx-5 mx-4">
        {isLoggedIn ? (
          <div>
            {cart.length === 0 ? (
              <div className="-mt-30">
                <WithOutLogin
                  icon={<IconShoppingCart size={60} color="#9333EA" />}
                  type="Your Cart is Empty"
                  para="Looks like you haven't added anything to your cart yet. Start shopping to fill it up!"
                  btn1="Start Shopping"
                  btn2="Browse Categories"
                  btn1path="/"
                  btn2path="/"
                />
              </div>
            ) : (
              <div>
                <div className="flex flex-col gap-y-6">
                  <BackBtn />
                  <h1 className="flex items-center gap-x-3 font-bold text-2xl">
                    <IconShoppingCart color="#9333EA" /> Shopping Cart
                  </h1>
                </div>
                <div className="mb-5 border border-[#adadad] rounded-xl px-4 sm:px-6 md:px-10 py-6 md:py-8 mt-10">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <h1 className="font-semibold text-xl md:text-2xl">
                      Cart Items
                    </h1>
                    <button
                      onClick={handleClearCart}
                      className="cursor-pointer flex gap-x-2 items-center rounded-xl px-4 py-2 bg-[#9333EA] text-white w-full md:w-auto justify-center">
                      <IconTrash size={20} /> Clear Cart
                    </button>
                  </div>

                  <ul className="space-y-3 mt-5">
                    {cart.map((item) => (
                      <div key={item.id}>
                        <li className="border border-[#adadad] p-3 rounded-xl flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                          <div className="flex flex-col sm:flex-row gap-4">
                            <div className="w-full sm:w-[120px] h-[150px] sm:h-[100px]">
                              <img
                                src={item.img}
                                alt={item.title}
                                className="w-full h-full rounded-xl object-cover"
                              />
                            </div>
                            <div>
                              <h1 className="font-semibold text-lg">
                                {item.title}
                              </h1>
                              <p className="text-[#616161] text-sm">
                                {item.category}
                              </p>
                              <p className="font-bold mt-1">${item.price}</p>
                              <p className="text-sm text-[#9333EA]">
                                {item.stock} items is in stock
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                            <div className="flex items-center border border-[#adadad] rounded-md overflow-hidden w-fit">
                              <button
                                onClick={() => handleDecrease(item.id)}
                                className="cursor-pointer px-3 py-[2px] text-lg font-semibold bg-[#f3f3f3] hover:bg-[#e2e2e2]">
                                -
                              </button>
                              <span className="px-4 py-[2px] text-md font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleIncrease(item.id)}
                                className="cursor-pointer px-3 py-[2px] text-lg font-semibold bg-[#f3f3f3] hover:bg-[#e2e2e2]">
                                +
                              </button>
                            </div>

                            <div className="text-sm">
                              <button
                                onClick={() => handleRemoveFromCart(item.id)}
                                className="cursor-pointer flex gap-x-2 items-center rounded-xl px-4 py-2 bg-[#9333EA] text-white w-full sm:w-auto justify-center">
                                <IconTrash size={16} /> Remove
                              </button>
                            </div>
                          </div>
                        </li>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="-mt-30">
            <WithOutLogin
              icon={<IconShoppingCart size={60} color="#9333EA" />}
              type="Sign In to View Your Cart"
              para="Create an account or sign in to save your favorite items and access them from any device."
              btn1="Sign In"
              btn2="Create Account"
              btn1path="/loginForm"
              btn2path="/accountForm"
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default AddToCart;
