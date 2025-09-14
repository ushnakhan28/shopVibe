import {
  IconHeart,
  IconLoader2,
  IconMenu2,
  IconSearch,
  IconShoppingCart,
  IconUser,
  IconX,
} from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Header = () => {
  const router = useRouter();
  const data = [
    { content: "Home", links: "/" },
    { content: "Categories", links: "#category" },
    { content: "Products", links: "#product" },
    { content: "Services", links: "#services" },
    { content: "Newsletter", links: "#newsletter" },
  ];

  const [openmenu, setopenmenu] = useState(false);
  const [search, setsearch] = useState("");
  const [active, setactive] = useState("#");
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [initials, setInitials] = useState("");
  const [username, setUsername] = useState("");
  const [cartLoader, setcartLoader] = useState(false);
  const [favLoader, setfavLoader] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [signinloader, setsigninloader] = useState(false);
  const [createloader, setcreateloader] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateWishlistCount = () => {
      const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlistCount(storedWishlist.length);
    };

    updateWishlistCount();

    window.addEventListener("wishlistUpdated", updateWishlistCount);

    return () => {
      window.removeEventListener("wishlistUpdated", updateWishlistCount);
    };
  }, []);

  useEffect(() => {
    const updateCartCount = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalItems = storedCart.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      setCartCount(totalItems);
    };

    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);
  const handleClick = (path) => {
    setsigninloader(true);
    setTimeout(() => {
      router.push(path);
      setsigninloader(false);
    }, 2000);
  };
  const handlecreate = (path) => {
    setcreateloader(true);
    setTimeout(() => {
      router.push(path);
      setcreateloader(false);
    }, 2000);
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const created = localStorage.getItem("isCreated");

    if (loggedIn === "true" || created === "true") {
      setisLoggedIn(true);

      const storedName = localStorage.getItem("userName");
      if (storedName) {
        setUsername(storedName);
        setInitials(getInitials(storedName));
      }
    } else {
      setisLoggedIn(false);
      setUsername("");
      setInitials("");
    }
  }, [router.pathname]);

  const handlebtn = () => {
    setsearch("");
  };

  const handlelinks = (link) => {
    setactive(link);
  };

  const getInitials = (name) => {
    if (!name) return "";
    const words = name.trim().split(" ");
    if (words.length === 1) {
      return words[0][0].toUpperCase();
    }
    return words[0][0].toUpperCase() + words[1][0].toUpperCase();
  };
  return (
    <div className="fixed bg-white border-b border-[#d8d8d8] w-full top-0 z-50">
      <div className="flex justify-between items-center px-4 md:px-10 py-3 gap-4 flex-wrap md:flex-nowrap">
        <div className="lg:hidden fixed text-sm top-[8px] left-4 z-50 bg-purple-600 text-white p-2 rounded-lg shadow">
          SV
        </div>
        <h1 className="text-xl md:text-2xl md:ml-6 lg:ml-0 ml-12 font-bold text-purple-700 whitespace-nowrap">
          ShopVibe
        </h1>

        <div className="hidden lg:ml-5 mt-1 lg:flex lg:gap-x-8 text-gray-600 text-sm lg:text-base flex-shrink-0 whitespace-nowrap">
          {data.map((item, index) => (
            <a
              key={index}
              href={item.links}
              onClick={() => handlelinks(item.links)}
              className={`hover:text-purple-700 font-semibold duration-100 ${
                active === item.links ? "text-purple-700" : ""
              }`}>
              {item.content}
            </a>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative hidden lg:block lg:ml-5 w-full lg:w-[300px] xl:w-[400px]">
          <IconSearch
            className="absolute left-3 top-2"
            size={18}
            color="#7e22ce"
          />
          <input
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            placeholder="Search..."
            className="w-full pl-10 pr-8 py-1.5 rounded-lg bg-[#eeeeee] outline-purple-700 text-sm"
          />
          {search.length > 0 && (
            <IconX
              onClick={handlebtn}
              className="absolute right-2 top-2 cursor-pointer"
              size={16}
              color="#7e22ce"
            />
          )}
        </div>

        <div className="flex items-center gap-10 ml-auto">
          <div className="hidden lg:flex gap-8">
            <div
              onClick={() => {
                setfavLoader(true);
                setTimeout(() => {
                  router.push("/headerWishlist");
                  setfavLoader(false);
                }, 2000);
              }}
              className={`cursor-pointer p-1.5 rounded-lg ${
                router.pathname === "/headerWishlist"
                  ? "bg-[#ded4ff] text-purple-700"
                  : "hover:bg-[#e9e9e9]"
              }`}>
              {favLoader && router.pathname !== "/headerWishlist" ? (
                <div className="text-purple-700">
                  <IconLoader2 className="animate-spin" size={20} />
                </div>
              ) : (
                <div>
                  {wishlistCount > 0 && isLoggedIn ? (
                    <div className="relative">
                      <IconHeart size={20} />
                      <div className="rounded-full absolute bottom-3 left-[13px] bg-red-500 w-5 h-5 flex justify-center items-center text-white text-[10px]">
                        {wishlistCount}
                      </div>
                    </div>
                  ) : (
                    <IconHeart size={20} />
                  )}
                </div>
              )}
            </div>

            <div
              onClick={() => {
                setcartLoader(true);
                setTimeout(() => {
                  router.push("/headerCart");
                  setcartLoader(false);
                }, 2000);
              }}
              className={`cursor-pointer p-1.5 rounded-lg ${
                router.pathname === "/headerCart"
                  ? "bg-[#ded4ff] text-purple-700"
                  : "hover:bg-[#e9e9e9]"
              }`}>
              {cartLoader && router.pathname !== "/headerCart" ? (
                <div className="text-purple-700">
                  <IconLoader2 className="animate-spin" size={20} />
                </div>
              ) : (
                <div>
                  {cartCount > 0 && isLoggedIn ? (
                    <div className="relative">
                      <IconShoppingCart size={20} />
                      <div className="rounded-full absolute bottom-3 left-[13px] bg-red-500 w-5 h-5 flex justify-center items-center text-white text-[10px]">
                        {cartCount}
                      </div>
                    </div>
                  ) : (
                    <IconShoppingCart size={20} />
                  )}
                </div>
              )}
            </div>

            {isLoggedIn ? (
              <div
                onClick={() => router.push("/profile")}
                className="cursor-pointer rounded-lg">
                <div className="sm:w-9 sm:h-9 bg-purple-700 flex items-center justify-center text-white font-semibold rounded-full">
                  {initials}
                </div>
              </div>
            ) : (
              <div className="relative">
                <div
                  onClick={() => setOpenDropdown(!openDropdown)}
                  className={`cursor-pointer p-1.5 rounded-lg ${
                    openDropdown
                      ? "bg-[#ded4ff] text-purple-700"
                      : "hover:bg-[#e9e9e9]"
                  }`}>
                  {" "}
                  {openDropdown ? <IconX size={20} /> : <IconUser size={20} />}
                </div>

                {/* Dropdown */}
                {openDropdown && (
                  <div className="absolute right-0 mt-3 w-[170px] bg-[#ffffff] border rounded-lg shadow-lg overflow-hidden z-50">
                    <button
                      onClick={() => handleClick("/loginForm")}
                      className="flex px-3 items-center gap-x-2 hover:bg-[#f9f2ff] w-full cursor-pointer py-[8px] text-sm rounded-lg duration-200">
                      {signinloader && (
                        <IconLoader2 className="animate-spin" size={18} />
                      )}
                      Sign In
                    </button>
                    <button
                      onClick={() => handlecreate("/accountForm")}
                      className="flex px-3 items-center gap-x-2 hover:bg-[#f9f2ff] w-full cursor-pointer py-[8px] text-sm rounded-lg duration-200">
                      {createloader && (
                        <IconLoader2 className="animate-spin" size={18} />
                      )}
                      Create Account
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Menu Button */}
          <button
            onClick={() => setopenmenu(!openmenu)}
            className="cursor-pointer block lg:hidden">
            {openmenu ? <IconX size={24} /> : <IconMenu2 size={24} />}
          </button>
        </div>
      </div>

      <div className="block lg:hidden px-4 pb-3">
        <div className="relative w-full">
          <IconSearch
            className="absolute left-3 top-2.5"
            size={18}
            color="#7e22ce"
          />
          <input
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            placeholder="Search..."
            className="w-full pl-10 pr-8 py-2 rounded-lg bg-[#eeeeee] outline-purple-700 text-sm"
          />
          {search.length > 0 && (
            <IconX
              onClick={handlebtn}
              className="absolute right-2 top-2.5 cursor-pointer"
              size={16}
              color="#7e22ce"
            />
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          openmenu ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}>
        <div className="px-6 py-4 flex flex-col gap-y-3 bg-[#bb73ff] text-white text-base">
          {data.map((item, index) => (
            <a
              key={index}
              href={item.links}
              onClick={() => setopenmenu(false)}
              className="hover:text-[#f0e6ff] duration-100">
              {item.content}
            </a>
          ))}
          <div className="lg:flex md:flex md:flex-col gap-4 pt-3">
            <div className="flex gap-x-5">
              <div
                onClick={() => {
                  setfavLoader(true);
                  setTimeout(() => {
                    router.push("/headerWishlist");
                    setfavLoader(false);
                  }, 2000);
                }}
                className="cursor-pointer p-2 rounded-lg bg-white text-[#bb73ff]">
                {favLoader && router.pathname !== "/headerWishlist" ? (
                  <div className="text-purple-700">
                    <IconLoader2 className="animate-spin" size={20} />
                  </div>
                ) : (
                  <div>
                    {wishlistCount > 0 && isLoggedIn ? (
                      <div className="relative">
                        <IconHeart size={20} />
                        <div className="rounded-full absolute bottom-[18px] left-[18px] bg-red-500 w-5 h-5 flex justify-center items-center text-white text-[10px]">
                          {wishlistCount}
                        </div>
                      </div>
                    ) : (
                      <IconHeart size={20} />
                    )}
                  </div>
                )}{" "}
              </div>
              <div
                onClick={() => {
                  setcartLoader(true);
                  setTimeout(() => {
                    router.push("/headerCart");
                    setcartLoader(false);
                  }, 2000);
                }}
                className="cursor-pointer p-2 rounded-lg bg-white text-[#bb73ff]">
                {cartLoader && router.pathname !== "/headerCart" ? (
                  <div className="text-purple-700">
                    <IconLoader2 className="animate-spin" size={20} />
                  </div>
                ) : (
                  <div>
                    {cartCount > 0 && isLoggedIn ? (
                      <div className="relative">
                        <IconShoppingCart size={20} />
                        <div className="rounded-full absolute bottom-[18px] left-[18px] bg-red-500 w-5 h-5 flex justify-center items-center text-white text-[10px]">
                          {cartCount}
                        </div>
                      </div>
                    ) : (
                      <IconShoppingCart size={20} />
                    )}
                  </div>
                )}{" "}
              </div>
            </div>
            {isLoggedIn ? (
              <div
                onClick={() => router.push("/profile")}
                className="cursor-pointer mt-3 rounded-lg text-[#bb73ff]">
                <div className="inline-block bg-purple-700 text-white font-semibold rounded-lg">
                  <p className="px-4 py-2 ">{username}</p>
                </div>
              </div>
            ) : null}
          </div>

          {!isLoggedIn && (
            <div className="mt-3 flex flex-col gap-y-3 w-full max-w-xs mx-auto">
              <button
                onClick={() => handleClick("/loginForm")}
                className="flex justify-center items-center gap-x-3 w-full cursor-pointer text-white px-8 py-[8px] text-sm rounded-lg bg-[#7D2AE8] hover:bg-[#8b32ff] duration-200">
                {signinloader && (
                  <IconLoader2 className="animate-spin" size={20} />
                )}
                Sign In
              </button>
              <button
                onClick={() => handlecreate("/accountForm")}
                className="flex justify-center items-center gap-x-3 w-full cursor-pointer text-white px-8 py-[8px] text-sm rounded-lg bg-[#7D2AE8] hover:bg-[#8b32ff] duration-200">
                {createloader && (
                  <IconLoader2 className="animate-spin" size={20} />
                )}
                Create Account
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
