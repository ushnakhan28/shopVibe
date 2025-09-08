import {
  IconArrowLeft,
  IconCalendarWeek,
  IconMail,
  IconCreditCard,
  IconHeart,
  IconCamera,
  IconPhone,
  IconMapPin,
  IconUser,
  IconEdit,
  IconDownload,
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
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import Wishlist from "./wishlist";
import LogoutPopup from "../../components/home/logoutPopup";
import AddToCart from "./addToCart";
import OrderHistory from "../../components/home/order";
import PaymentMethods from "../../components/home/payment";
import Settings from "../../components/home/settings";
import Dashboard from "../../components/home/dashboard";
import AddressSection from "../../components/home/address";

const Profile = () => {
  const [username, setusername] = useState(false);
  const [email, setemail] = useState(false);
  const [edit, setedit] = useState(false);
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

  const formik = useFormik({
    initialValues: {
      username: username || "",
      email: email || "",
      phone: "+92 300 1234567",
      address: "123 Main Street, Karachi, Pakistan",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Enter valid email")
        .required("Email is required"),
      phone: Yup.string().required("Phone number is required"),
      address: Yup.string().required("Address is required"),
    }),
    onSubmit: (values) => {
      localStorage.setItem("userName", values.username);
      localStorage.setItem("email", values.email);
      localStorage.setItem("phone", values.phone);
      localStorage.setItem("address", values.address);

      setusername(values.username);
      setemail(values.email);
      setedit(false);
    },
    enableReinitialize: true,
  });

  const getInitials = (name) => {
    if (!name) return "";
    const words = name.trim().split(" ");
    if (words.length === 1) {
      return words[0][0].toUpperCase();
    }
    return words[0][0].toUpperCase() + words[1][0].toUpperCase();
  };

  const information = [
    {
      icon: <IconUser size={20} />,
      info: formik.values.username,
      infoTitle: "Username",
      name: "username",
    },
    {
      icon: <IconMail size={20} />,
      info: formik.values.email,
      infoTitle: "Email Address",
      name: "email",
    },
    {
      icon: <IconPhone size={20} />,
      info: formik.values.phone,
      infoTitle: "Phone Number",
      name: "phone",
    },
    {
      icon: <IconMapPin size={20} />,
      info: formik.values.address,
      infoTitle: "Address",
      name: "address",
    },
  ];

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
                    ? "bg-[#ebd6ff] text-[#9333EA] border-r-3 border-[#9333EA]"
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
              <div className="bg-[#9333EA] lg:mt-15 mt-25 px-6 sm:px-10 py-8">
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
                      {username}
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

              <div className="sm:mx-10 my-10 mx-5 bg-[#fcfcfc] sm:p-10 p-5 rounded-xl">
                <div className="flex justify-between items-center">
                  <h1 className="sm:font-bold font-semibold text-3xl">
                    Personal Information
                  </h1>
                  <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-2 rounded-xl cursor-pointer hover:scale-105 duration-[0.5s]">
                    <IconEdit
                      onClick={() => setedit(true)}
                      size={22}
                      color="white"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-y-4 mt-5">
                  {information.map((item, index) => (
                    <div key={index} className="flex gap-x-3 items-center">
                      <div>
                        <i className="text-[#9b9b9b]">{item.icon}</i>
                      </div>
                      <div className="">
                        <h1 className="font-semibold">{item.info}</h1>
                        <p className="text-[#9b9b9b]">{item.infoTitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setedit(true)}
                  className="mt-8 w-full flex gap-x-2 justify-center items-center cursor-pointer text-white py-2 sm:text-base rounded-lg bg-[#7D2AE8] hover:bg-[#8b32ff] duration-200">
                  <IconEdit size={20} /> Edit Information
                </button>
              </div>
              {edit && (
                <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-black/60 backdrop-blur-[1px]">
                  <div className="bg-[#fff] sm:p-10 p-5 rounded-xl w-[90%] sm:w-[70%] md:w-[50%] shadow-lg relative">
                    <div className="flex justify-between items-center">
                      <h1 className="sm:font-bold font-semibold text-3xl">
                        Edit Information
                      </h1>

                      <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-2 rounded-xl cursor-pointer hover:scale-105 duration-[0.5s]">
                        <IconX
                          onClick={() => {
                            setedit(false);
                            formik.resetForm();
                          }}
                          size={22}
                          color="white"
                        />
                      </div>
                    </div>
                    <form
                      onSubmit={formik.handleSubmit}
                      className="flex flex-col sm:grid sm:grid-cols-2 gap-6 mt-5">
                      {information.map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-col gap-y-2 w-full">
                          <label className="font-semibold">
                            {item.infoTitle}:
                          </label>
                          <div className="flex items-center border border-[#adadad] px-3 py-[10px] rounded-xl w-full">
                            {item.icon}
                            <input
                              type="text"
                              name={item.name}
                              value={formik.values[item.name]}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className="w-full outline-none focus:ring-0 ml-2"
                            />
                          </div>
                          {formik.touched[item.name] &&
                            formik.errors[item.name] && (
                              <p className="text-red-500 text-xs mt-1">
                                {formik.errors[item.name]}
                              </p>
                            )}
                        </div>
                      ))}

                      <button
                        type="submit"
                        className="lg:mt-2 mt-1 col-span-2 w-full flex gap-x-2 justify-center items-center cursor-pointer text-white py-2 sm:text-base rounded-lg bg-[#7D2AE8] hover:bg-[#8b32ff] duration-200">
                        <IconDownload size={20} /> Save Information
                      </button>
                    </form>
                  </div>
                </div>
              )}
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
