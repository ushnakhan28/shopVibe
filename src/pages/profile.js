import {
  IconCreditCard,
  IconHeart,
  IconMapPin,
  IconUser,
  IconX,
  IconLayoutDashboard,
  IconShoppingBag,
  IconSettings,
  IconLogout2,
  IconMenu2,
  IconShoppingCart,
} from "@tabler/icons-react";
import Header from "../../components/home/header";
import { useEffect, useState } from "react";
import Wishlist from "./wishlist";
import LogoutPopup from "../../components/home/logoutPopup";
import AddToCart from "./addToCart";
import OrderHistory from "../../components/home/order";
import PaymentMethods from "../../components/home/payment";
import Settings from "../../components/home/settings";
import Dashboard from "../../components/home/dashboard";
import AddressSection from "../../components/home/address";
import PersonalInfo from "../../components/home/profile";

const Profile = () => {
  const [activeTab, setactiveTab] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const sidebar = [
    {
      icon: <IconLayoutDashboard />,
      sidebarContent: "Dashboard",
    },
    {
      icon: <IconUser />,
      sidebarContent: "Profile Info",
    },
    {
      icon: <IconShoppingBag />,
      sidebarContent: "Orders",
    },
    {
      icon: <IconHeart />,
      sidebarContent: "Wishlist",
    },
    {
      icon: <IconShoppingCart />,
      sidebarContent: "Cart",
    },
    {
      icon: <IconMapPin />,
      sidebarContent: "Addresses",
    },
    {
      icon: <IconCreditCard />,
      sidebarContent: "Payment Methods",
    },
    {
      icon: <IconSettings />,
      sidebarContent: "Settings",
    },
    {
      icon: <IconLogout2 />,
      sidebarContent: "Signout",
    },
  ];

  return (
    <div className="flex bg-[#f0f0f0]">
      <Header />

      <button
        className="lg:hidden fixed top-[8px] left-4 z-50 bg-gradient-to-r from-pink-500 to-purple-500 text-white p-2 rounded-lg shadow"
        onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? <IconX size={22} /> : <IconMenu2 size={22} />}
      </button>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}></div>
      )}
      <div
        className={`bg-[#fcfcfc] fixed lg:-top-2 md:top-10 top-8 left-0 h-full xs:w-[100%] sm:w-[30%] lg:w-[20%] mt-[70px] overflow-y-auto shadow-lg z-40 transform transition-transform duration-300 
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="pt-6 gap-y-2 flex flex-col">
          {sidebar.map((item, index) => (
            <div
              key={index}
              className="mx-3"
              onClick={() => {
                setactiveTab(item.sidebarContent);
                setSidebarOpen(false);
              }}>
              <div
                className={`flex gap-x-4 cursor-pointer items-center px-3 py-3 rounded-xl w-full font-semibold text-md ${
                  activeTab === item.sidebarContent
                    ? "bg-[#ebd6ff] text-purple-700 border-r-3 border-purple-700"
                    : "hover:bg-[#f0f0f0] text-gray-700"
                }`}>
                <i className="">{item.icon}</i>
                <p className="">{item.sidebarContent}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:ml-[20%] ml-0 lg:w-[80%] w-[100%] h-screen overflow-y-auto">
        {/* ----------Dashboard---------- */}
        <div>
          {activeTab === "Dashboard" && (
            <div>
              <Dashboard />
            </div>
          )}
        </div>
        {/* ----------Personal Info---------- */}
        <div>
          {activeTab === "Profile Info" && (
            <div>
              <PersonalInfo />
            </div>
          )}
        </div>
        {/* ----------Orders---------- */}
        <div className="lg:mt-22 mt-32">
          {activeTab === "Orders" && (
            <div>
              <OrderHistory />
            </div>
          )}
        </div>
        {/* ----------Wishlist---------- */}
        <div>
          {activeTab === "Wishlist" && (
            <div className="mt-20">
              <Wishlist />
            </div>
          )}
        </div>
        {/* ----------Cart---------- */}
        <div>
          {activeTab === "Cart" && (
            <div className="mt-20">
              <AddToCart />
            </div>
          )}
        </div>
        {/* ----------Addresses---------- */}
        <div className="lg:mt-22 mt-32">
          {activeTab === "Addresses" && (
            <div>
              <AddressSection />
            </div>
          )}
        </div>
        {/* ----------Payment Methods---------- */}
        <div>
          {activeTab === "Payment Methods" && (
            <div>
              <PaymentMethods />
            </div>
          )}
        </div>
        {/* ----------Settings---------- */}
        <div>
          {activeTab === "Settings" && (
            <div>
              <Settings />
            </div>
          )}
        </div>
        {/* ----------Signout---------- */}
        <div>
          {activeTab === "Signout" && (
            <LogoutPopup setactiveTab={setactiveTab} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
