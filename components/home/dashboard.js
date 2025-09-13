import {
  IconCreditCard,
  IconGift,
  IconHeart,
  IconPackage,
} from "@tabler/icons-react";
import OrderHistory from "./order";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [email, setemail] = useState(false);
  const [isLoggedOut, setisLoggedOut] = useState(false);
  const [username, setusername] = useState(false);
  const [wishlistcount, setwishlistcount] = useState(0);
  useEffect(() => {
    const loggedOut = localStorage.getItem("isLoggedOut");
    if (loggedOut === "true") {
      setisLoggedOut(true);
    }
    const savedName = localStorage.getItem("userName");
    const savedEmail = localStorage.getItem("email");

    if (savedName) {
      setusername(savedName);
    }
    if (savedEmail) {
      setemail(savedEmail);
    }
    const wishlistData = JSON.parse(localStorage.getItem("wishlist")) || [];
    setwishlistcount(wishlistData.length);
  }, []);
  const data = [
    {
      title: "Total Spent",
      quantity: "$797",
      icon: <IconCreditCard size={30} />,
      para: "+12% from last month",
      bg: "bg-green-50",
      text: "text-green-700",
      iconBg: "bg-green-100 text-green-600",
    },
    {
      title: "Loyalty Points",
      quantity: "996",
      icon: <IconGift size={30} />,
      para: "750 to next tier",
      bg: "bg-blue-50",
      text: "text-blue-700",
      iconBg: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Orders",
      quantity: "3",
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
    <div className="lg:mt-15 mt-30">
      {/* Welcome Section */}
      <div className="bg-purple-700 sm:px-10 px-5 sm:py-8 py-5 sm:mx-10 mx-5 my-10 rounded-lg mt-20">
        <h1 className="font-bold text-white text-3xl">
          Welcome back, {username}!
        </h1>
        <p className="text-[#eeeeee] mt-3">
          {"Here's what's happening with your account today."}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-10 mx-5 sm:mx-10 gap-6">
        {data.map((item, index) => (
          <div
            key={index}
            className={`rounded-lg p-5 shadow-sm ${item.bg} flex flex-col justify-between`}>
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

      <OrderHistory />
    </div>
  );
};

export default Dashboard;
