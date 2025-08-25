// import {
//   IconHeart,
//   IconMenu2,
//   IconSearch,
//   IconShoppingCart,
//   IconUser,
//   IconX,
// } from "@tabler/icons-react";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";

// const Header = () => {
//   const router = useRouter();
//   const data = [
//     { content: "Home", links: "/" },
//     { content: "Categories", links: "#category" },
//     { content: "Products", links: "#product" },
//     { content: "Services", links: "#services" },
//     { content: "Newsletter", links: "#newsletter" },
//   ];

//   const [openmenu, setopenmenu] = useState(false);
//   const [search, setsearch] = useState("");
//   const [active, setactive] = useState("#");
//   const [isLoggedIn, setisLoggedIn] = useState(false);

//   useEffect(() => {
//     const loggedIn = localStorage.getItem("isLoggedIn");
//     if (loggedIn === "true") {
//       setisLoggedIn(true);
//     } else {
//       setisLoggedIn(false);
//     }
//   }, [router.pathname]);

//   const handlebtn = () => {
//     setsearch("");
//   };

//   const handlelinks = (link) => {
//     setactive(link);
//   };

//   return (
//     <div className="fixed bg-white border-b border-[#d8d8d8] w-full top-0 z-50">
//       {/* Top Navbar */}
//       <div className="flex justify-between items-center px-4 md:px-10 py-3 gap-4 flex-wrap md:flex-nowrap">
//         {/* Logo */}
//         <div className="lg:hidden fixed text-sm top-[8px] left-4 z-50 bg-purple-600 text-white p-2 rounded-lg shadow">
//           SV
//         </div>
//         <h1 className="text-xl md:text-2xl md:ml-6 lg:ml-0 ml-12 font-bold text-[#7C3AED] whitespace-nowrap">
//           ShopVibe
//         </h1>

//         {/* NavLinks */}
//         <div className="hidden lg:ml-5 mt-1 lg:flex lg:gap-x-8 text-gray-600 text-sm lg:text-base flex-shrink-0 whitespace-nowrap">
//           {data.map((item, index) => (
//             <a
//               key={index}
//               href={item.links}
//               onClick={() => handlelinks(item.links)}
//               className={`hover:text-[#8B5CF6] font-semibold duration-100 ${
//                 active === item.links ? "text-[#8B5CF6]" : ""
//               }`}>
//               {item.content}
//             </a>
//           ))}
//         </div>

//         {/* Search Bar */}
//         <div className="relative hidden lg:block lg:ml-5 w-full lg:w-[300px] xl:w-[400px]">
//           <IconSearch
//             className="absolute left-3 top-2"
//             size={18}
//             color="#7C3AED"
//           />
//           <input
//             value={search}
//             onChange={(e) => setsearch(e.target.value)}
//             placeholder="Search..."
//             className="w-full pl-10 pr-8 py-1.5 rounded-xl bg-[#eeeeee] outline-[#7C3AED] text-sm"
//           />
//           {search.length > 0 && (
//             <IconX
//               onClick={handlebtn}
//               className="absolute right-2 top-2 cursor-pointer"
//               size={16}
//               color="#7C3AED"
//             />
//           )}
//         </div>

//         <div className="flex items-center gap-10 ml-auto">
//           <div className="hidden lg:flex gap-8">
//             <div
//               onClick={() => router.push("/headerWishlist")}
//               className={`cursor-pointer p-1.5 rounded-xl ${
//                 router.pathname === "/wishlist"
//                   ? "bg-[#ded4ff] text-[#7C3AED]"
//                   : "hover:bg-[#e9e9e9]"
//               }`}>
//               <IconHeart size={20} />
//             </div>

//             <div
//               onClick={() => router.push("/addToCart")}
//               className={`cursor-pointer p-1.5 rounded-xl ${
//                 router.pathname === "/addToCart"
//                   ? "bg-[#ded4ff] text-[#7C3AED]"
//                   : "hover:bg-[#e9e9e9]"
//               }`}>
//               <IconShoppingCart size={20} />
//             </div>

//             {isLoggedIn ? (
//               <div
//                 onClick={() => router.push("/profile")}
//                 className={`cursor-pointer p-1.5 rounded-xl ${
//                   router.pathname === "/profile"
//                     ? "bg-[#ded4ff] text-[#7C3AED]"
//                     : "hover:bg-[#e9e9e9]"
//                 }`}>
//                 {" "}
//                 <IconUser size={20} />
//               </div>
//             ) : (
//               <Link href={"/form"}>
//                 <button className="hidden lg:flex items-center cursor-pointer text-white px-4 py-[5px] text-sm gap-x-2 rounded-lg bg-[#7D2AE8] hover:bg-[#8b32ff] duration-200">
//                   Login
//                 </button>
//               </Link>
//             )}
//           </div>

//           {/* Menu Button */}
//           <button
//             onClick={() => setopenmenu(!openmenu)}
//             className="cursor-pointer block lg:hidden">
//             {openmenu ? <IconX size={24} /> : <IconMenu2 size={24} />}
//           </button>
//         </div>
//       </div>

//       <div className="block lg:hidden px-4 pb-3">
//         <div className="relative w-full">
//           <IconSearch
//             className="absolute left-3 top-2.5"
//             size={18}
//             color="#7C3AED"
//           />
//           <input
//             value={search}
//             onChange={(e) => setsearch(e.target.value)}
//             placeholder="Search..."
//             className="w-full pl-10 pr-8 py-2 rounded-xl bg-[#eeeeee] outline-[#7C3AED] text-sm"
//           />
//           {search.length > 0 && (
//             <IconX
//               onClick={handlebtn}
//               className="absolute right-2 top-2.5 cursor-pointer"
//               size={16}
//               color="#7C3AED"
//             />
//           )}
//         </div>
//       </div>

//       {/* Mobile Dropdown Menu */}
//       <div
//         className={`lg:hidden overflow-hidden transition-all duration-300 ${
//           openmenu ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
//         }`}>
//         <div className="px-6 py-4 flex flex-col gap-y-3 bg-[#bb73ff] text-white text-base">
//           {data.map((item, index) => (
//             <a
//               key={index}
//               href={item.links}
//               onClick={() => setopenmenu(false)}
//               className="hover:text-[#f0e6ff] duration-100">
//               {item.content}
//             </a>
//           ))}
//           <div className="flex gap-4 pt-3">
//             <div
//               onClick={() => router.push("/headerWishlist")}
//               className="cursor-pointer p-2 rounded-xl bg-white text-[#bb73ff]">
//               <IconHeart />
//             </div>
//             <div
//               onClick={() => router.push("/addToCart")}
//               className="cursor-pointer p-2 rounded-xl bg-white text-[#bb73ff]">
//               <IconShoppingCart />
//             </div>
//             {isLoggedIn ? (
//               <div
//                 onClick={() => router.push("/profile")}
//                 className="cursor-pointer p-2 rounded-xl bg-white text-[#bb73ff]">
//                 <IconUser />
//               </div>
//             ) : null}
//           </div>

//           {!isLoggedIn && (
//             <div className="mt-3">
//               <Link href={"/form"}>
//                 <button className="block lg:hidden items-center cursor-pointer text-white px-8 py-[5px] text-sm gap-x-2 rounded-lg bg-[#7D2AE8] hover:bg-[#8b32ff] duration-200">
//                   Login
//                 </button>
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;
import {
  IconHeart,
  IconMenu2,
  IconSearch,
  IconShoppingCart,
  IconUser,
  IconX,
} from "@tabler/icons-react";
import Link from "next/link";
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

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");

    if (loggedIn === "true") {
      setisLoggedIn(true);

      const storedName = localStorage.getItem("userName");

      if (storedName) {
        setUsername(storedName); // full name
        setInitials(getInitials(storedName)); // initials desktop ke liye
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
      {/* Top Navbar */}
      <div className="flex justify-between items-center px-4 md:px-10 py-3 gap-4 flex-wrap md:flex-nowrap">
        {/* Logo */}
        <div className="lg:hidden fixed text-sm top-[8px] left-4 z-50 bg-purple-600 text-white p-2 rounded-lg shadow">
          SV
        </div>
        <h1 className="text-xl md:text-2xl md:ml-6 lg:ml-0 ml-12 font-bold text-[#7C3AED] whitespace-nowrap">
          ShopVibe
        </h1>

        {/* NavLinks */}
        <div className="hidden lg:ml-5 mt-1 lg:flex lg:gap-x-8 text-gray-600 text-sm lg:text-base flex-shrink-0 whitespace-nowrap">
          {data.map((item, index) => (
            <a
              key={index}
              href={item.links}
              onClick={() => handlelinks(item.links)}
              className={`hover:text-[#8B5CF6] font-semibold duration-100 ${
                active === item.links ? "text-[#8B5CF6]" : ""
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
            color="#7C3AED"
          />
          <input
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            placeholder="Search..."
            className="w-full pl-10 pr-8 py-1.5 rounded-xl bg-[#eeeeee] outline-[#7C3AED] text-sm"
          />
          {search.length > 0 && (
            <IconX
              onClick={handlebtn}
              className="absolute right-2 top-2 cursor-pointer"
              size={16}
              color="#7C3AED"
            />
          )}
        </div>

        <div className="flex items-center gap-10 ml-auto">
          <div className="hidden lg:flex gap-8">
            <div
              onClick={() => router.push("/headerWishlist")}
              className={`cursor-pointer p-1.5 rounded-xl ${
                router.pathname === "/wishlist"
                  ? "bg-[#ded4ff] text-[#7C3AED]"
                  : "hover:bg-[#e9e9e9]"
              }`}>
              <IconHeart size={20} />
            </div>

            <div
              onClick={() => router.push("/addToCart")}
              className={`cursor-pointer p-1.5 rounded-xl ${
                router.pathname === "/addToCart"
                  ? "bg-[#ded4ff] text-[#7C3AED]"
                  : "hover:bg-[#e9e9e9]"
              }`}>
              <IconShoppingCart size={20} />
            </div>

            {isLoggedIn ? (
              <div
                onClick={() => router.push("/profile")}
                className="cursor-pointer rounded-xl">
                <div className="sm:w-9 sm:h-9 bg-[#9333EA] flex items-center justify-center text-white font-semibold rounded-full">
                  {initials}
                </div>
              </div>
            ) : (
              <Link href={"/form"}>
                <button className="hidden lg:flex items-center cursor-pointer text-white px-4 py-[5px] text-sm gap-x-2 rounded-lg bg-[#7D2AE8] hover:bg-[#8b32ff] duration-200">
                  Login
                </button>
              </Link>
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
            color="#7C3AED"
          />
          <input
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            placeholder="Search..."
            className="w-full pl-10 pr-8 py-2 rounded-xl bg-[#eeeeee] outline-[#7C3AED] text-sm"
          />
          {search.length > 0 && (
            <IconX
              onClick={handlebtn}
              className="absolute right-2 top-2.5 cursor-pointer"
              size={16}
              color="#7C3AED"
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
                onClick={() => router.push("/headerWishlist")}
                className="cursor-pointer p-2 rounded-xl bg-white text-[#bb73ff]">
                <IconHeart />
              </div>
              <div
                onClick={() => router.push("/addToCart")}
                className="cursor-pointer p-2 rounded-xl bg-white text-[#bb73ff]">
                <IconShoppingCart />
              </div>
            </div>
            {isLoggedIn ? (
              <div
                onClick={() => router.push("/profile")}
                className="cursor-pointer mt-3 rounded-xl text-[#bb73ff]">
                <div className="inline-block bg-[#9333EA] text-white font-semibold rounded-xl">
                  <p className="px-4 py-2 ">{username}</p>
                </div>
              </div>
            ) : null}
          </div>

          {!isLoggedIn && (
            <div className="mt-3">
              <Link href={"/form"}>
                <button className="block lg:hidden items-center cursor-pointer text-white px-8 py-[5px] text-sm gap-x-2 rounded-lg bg-[#7D2AE8] hover:bg-[#8b32ff] duration-200">
                  Login
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
