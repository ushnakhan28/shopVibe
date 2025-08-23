import {
  IconArrowLeft,
  IconCalendarWeek,
  IconLoader2,
  IconMail,
  IconCreditCard,
  IconGift,
  IconPackage,
  IconHeart,
  IconCamera,
} from "@tabler/icons-react";
import Header from "../../components/home/header";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Profile = () => {
  const router = useRouter();
  const [isLoggedOut, setisLoggedOut] = useState(false);
  const [loading, setloading] = useState(false);
  const [popup, setpopup] = useState(false);
  const [username, setusername] = useState(false);
  const [email, setemail] = useState(false);
  const [wishlistcount, setwishlistcount] = useState(0);

  useEffect(() => {
    const loggedOut = localStorage.getItem("isLoggedOut");
    if (loggedOut === "true") {
      setisLoggedOut(true);
    }
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      setusername(savedName);
    }
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setemail(savedEmail);
    }
    const wishlistData = JSON.parse(localStorage.getItem("wishlist")) || [];
    setwishlistcount(wishlistData.length);
  }, []);

  const handlebtn = () => {
    setloading(true);
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "false");
      localStorage.setItem("isLoggedOut", "true");
      setisLoggedOut(true);
      router.push("/");
      setloading(false);
      setpopup(false);
    }, 3000);
  };

  const getInitials = (name) => {
    if (!name) return "";
    const words = name.trim().split(" ");
    if (words.length === 1) {
      return words[0][0].toUpperCase();
    }
    return words[0][0].toUpperCase() + words[1][0].toUpperCase();
  };

  const data = [
    {
      title: "Total Spent",
      quantity: "$999.9",
      icon: <IconCreditCard size={30} />,
      para: "+12% from last month",
      bg: "bg-green-50",
      text: "text-green-700",
      iconBg: "bg-green-100 text-green-600",
    },
    {
      title: "Loyalty Points",
      quantity: "1250",
      icon: <IconGift size={30} />,
      para: "750 to next tier",
      bg: "bg-blue-50",
      text: "text-blue-700",
      iconBg: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Orders",
      quantity: "24",
      icon: <IconPackage size={30} />,
      para: "15 reviewed",
      bg: "bg-purple-50",
      text: "text-purple-700",
      iconBg: "bg-purple-100 text-purple-600",
    },
    {
      title: "Wishlist Items",
      quantity: wishlistcount,
      icon: <IconHeart size={30} />,
      para: "3 on sale now",
      bg: "bg-red-50",
      text: "text-red-700",
      iconBg: "bg-red-100 text-red-600",
    },
  ];

  return (
    <div>
      <Header />
      <section className="lg:mt-15 mt-25">
        <div className="bg-[#9333EA] px-6 sm:px-10 py-8">
          <Link
            href="/"
            className="w-[160px] items-center flex gap-x-2 text-[#e2e2e2] text-sm sm:text-base">
            <IconArrowLeft size={18} /> Back to ShopVibe
          </Link>

          <div className="flex flex-col sm:flex-row sm:gap-x-8 mt-5 items-center sm:items-start text-center sm:text-left">
            <div className="relative mb-4 sm:mb-0">
              <div className="bg-black font-bold text-3xl text-white w-[90px] h-[90px] sm:w-[100px] sm:h-[100px] rounded-full border-4 flex items-center justify-center">
                {getInitials(username)}
              </div>

              <div className="absolute bottom-0 right-0 cursor-pointer hover:scale-105 duration-150 bg-black rounded-full p-2 border-2 border-white">
                <IconCamera color="white" size={16} />
              </div>
            </div>

            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl sm:text-3xl font-semibold text-white">
                Welcome Back, {username}
              </h1>
              <p className="flex gap-x-2 text-sm sm:text-md text-[#e2e2e2] justify-center sm:justify-start items-center">
                <IconMail size={17} /> {email}
              </p>
              <p className="flex gap-x-2 text-xs sm:text-sm items-center text-[#e2e2e2] justify-center sm:justify-start">
                <IconCalendarWeek size={17} /> Member since May 2023
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-10 mx-6 sm:mx-10 gap-6">
          {data.map((item, index) => (
            <div
              key={index}
              className={`rounded-xl p-5 shadow-sm ${item.bg} flex flex-col justify-between`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className={`text-sm ${item.text}`}>{item.title}</p>
                  <h2 className={`text-xl sm:text-2xl font-bold ${item.text}`}>
                    {item.quantity}
                  </h2>
                </div>
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${item.iconBg}`}>
                  {item.icon}
                </div>
              </div>
              <p className={`text-xs sm:text-sm ${item.text} mt-3`}>
                {item.para}
              </p>
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <div className="flex mx-10 justify-center">
          <button
            onClick={() => setpopup(true)}
            className="mt-10 w-full flex gap-x-2 justify-center items-center cursor-pointer text-white px-5 py-2 text-sm sm:text-base rounded-lg bg-[#7D2AE8] hover:bg-[#8b32ff] duration-200">
            Logout
          </button>
        </div>
      </section>

      {popup && (
        <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-black/30 backdrop-blur-[1px]">
          <div className="absolute w-full h-full pointer-events-none"></div>
          <div className="flex flex-col justify-center items-center border bg-white border-[#eeeeee] shadow-xl w-[300px] sm:w-[350px] py-6 rounded-xl">
            <div>
              <h1 className="text-base sm:text-lg font-semibold text-center">
                Are you sure you want a logout?
              </h1>
            </div>
            <div className="flex gap-x-5 mt-4">
              <p
                onClick={handlebtn}
                className="tracking-wider flex items-center gap-x-2 cursor-pointer bg-[#319464] text-white w-[90px] sm:w-[100px] justify-center rounded-xl font-semibold py-2">
                {loading && <IconLoader2 className="animate-spin" size={20} />}
                Yes
              </p>
              <p
                onClick={() => setpopup(false)}
                className="tracking-wider cursor-pointer bg-[#ff3939] text-white px-8 sm:px-10 rounded-xl font-semibold py-2">
                No
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
