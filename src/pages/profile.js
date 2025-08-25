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
  IconPhone,
  IconMapPin,
  IconUser,
  IconEdit,
  IconDownload,
  IconX,
  IconLayoutDashboard,
  IconTrash,
  IconSignRight,
  IconTruck,
  IconClock,
  IconShoppingBag,
  IconSettings,
  IconCheck,
  IconEye,
  IconPencil,
  IconLogout,
  IconLogout2,
  IconMenu2,
} from "@tabler/icons-react";
import Header from "../../components/home/header";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Badge } from "@mantine/core";
import Wishlist from "./wishlist";

const Profile = () => {
  const router = useRouter();
  const [isLoggedOut, setisLoggedOut] = useState(false);
  const [loading, setloading] = useState(false);
  const [popup, setpopup] = useState(false);
  const [username, setusername] = useState(false);
  const [email, setemail] = useState(false);
  const [wishlistcount, setwishlistcount] = useState(0);
  const [edit, setedit] = useState(false);
  const [activeTab, setactiveTab] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      sidebarContent: "Logout",
    },
  ];

  const address = [
    {
      place: "HOME",
      address: "123 Main St, City, State 12345",
      number: "+1 (555) 123-4567",
      badge: "Default",
    },
    {
      place: "OFFICE",
      address: "456 Business Ave, Downtown, State 67890",
      number: "+1 (555) 987-6543",
    },
  ];

  const cards = [
    { id: 1, type: "Visa", last4: "4242", expiry: "12/26", default: true },
    {
      id: 2,
      type: "Mastercard",
      last4: "8888",
      expiry: "09/25",
      default: false,
    },
  ];

  const orders = [
    {
      product: "Premium Wireless Headphones",
      id: "#ORD-001",
      date: "2024-01-15",
      price: 299,
      status: "Delivered",
    },
    {
      product: "Smart Watch Series 5",
      id: "#ORD-002",
      date: "2024-01-12",
      price: 399,
      status: "Shipped",
    },
    {
      product: "Bluetooth Speaker",
      id: "#ORD-003",
      date: "2024-01-10",
      price: 99,
      status: "Processing",
    },
  ];

  return (
    <div className="flex bg-[#f0f0f0]">
      <Header />

      {/* 👇 Mobile menu toggle button */}
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
      {/* 👇 Sidebar */}
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
                setSidebarOpen(false); // mobile pe close ho jaye
              }}>
              <div
                className={`flex gap-x-4 cursor-pointer items-center px-3 py-3 rounded-xl hover:bg-[#f0f0f0] w-full font-semibold text-md ${
                  activeTab === item.sidebarContent ? "bg-[#f0f0f0]" : ""
                }`}>
                <i className="text-gray-700">{item.icon}</i>
                <p className="text-gray-700">{item.sidebarContent}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:ml-[20%] ml-0 lg:w-[80%] w-[100%] h-screen overflow-y-auto">
        {/* ----------Dashboard---------- */}

        <div>
          {activeTab === "Dashboard" && (
            <div className="lg:mt-15 mt-30">
              <div className="bg-[#9333EA] sm:px-10 px-5 sm:py-8 py-5 sm:mx-10 mx-5 my-10 rounded-xl mt-20">
                <h1 className="font-bold text-white text-3xl">
                  Welcome back, {username}!
                </h1>
                <p className="text-[#eeeeee] mt-3">
                  {"Here's what's happening with your account today."}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-10 mx-5 sm:mx-10 gap-6">
                {data.map((item, index) => (
                  <div
                    key={index}
                    className={`rounded-xl p-5 shadow-sm ${item.bg} flex flex-col justify-between`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className={`text-sm ${item.text}`}>{item.title}</p>
                        <h2
                          className={`text-xl sm:text-2xl font-bold ${item.text}`}>
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
              <div className="mt-20 bg-[#fcfcfc] m-4 sm:m-10 px-4 sm:px-8 py-6 sm:py-8 rounded-xl border border-[#e0e0e0] shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <h1 className="font-bold text-2xl sm:text-3xl">
                      Recent Orders
                    </h1>
                    <p className="text-[#616161] text-sm sm:text-base tracking-[1.2px]">
                      Your latest purchase history
                    </p>
                  </div>
                  <button className="mt-4 sm:mt-0 flex items-center gap-x-2 bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-lg shadow">
                    <span className="text-lg">+</span> View All
                  </button>
                </div>

                <div className="flex flex-col gap-y-4 mt-6">
                  {orders.map((order, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-200 rounded-xl px-5 py-4 bg-white hover:shadow-md transition">
                      <div>
                        <h2 className="font-semibold text-lg">
                          {order.product}
                        </h2>
                        <p className="text-gray-500 text-sm">
                          {order.id} • {order.date}
                        </p>
                      </div>

                      <div className="flex items-center gap-x-4 mt-3 sm:mt-0">
                        <span className="font-semibold text-lg">
                          ${order.price}
                        </span>
                        <span
                          className={`flex items-center gap-x-1 text-xs px-3 py-1 rounded-full font-medium
            ${
              order.status === "Delivered"
                ? "bg-green-100 text-green-700"
                : order.status === "Shipped"
                ? "bg-purple-100 text-purple-700"
                : "bg-yellow-100 text-yellow-700"
            }`}>
                          {order.status === "Delivered" && (
                            <IconCheck size={14} />
                          )}
                          {order.status === "Shipped" && (
                            <IconTruck size={14} />
                          )}
                          {order.status === "Processing" && (
                            <IconClock size={14} />
                          )}
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
                    {" "}
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
            <div className="bg-[#fcfcfc] m-5 lg:m-10 px-4 sm:px-8 py-6 sm:py-8 rounded-xl border border-[#e0e0e0] shadow-sm">
              <div className="mb-6">
                <h1 className="font-bold text-2xl sm:text-3xl">
                  Order History
                </h1>
                <p className="text-[#616161] text-sm sm:text-base">
                  View all your past orders
                </p>
              </div>

              <div className="flex flex-col gap-y-4">
                {orders.map((order, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-200 rounded-xl px-5 py-4 bg-white hover:shadow-md transition">
                    <div>
                      <h2 className="font-semibold text-lg">{order.product}</h2>
                      <p className="text-gray-500 text-sm">
                        {order.id} • {order.date}
                      </p>
                    </div>

                    <div className="flex items-center gap-x-3 mt-3 sm:mt-0">
                      <span className="font-semibold text-lg">
                        ${order.price}
                      </span>

                      <span
                        className={`flex items-center gap-x-1 text-xs px-3 py-1 rounded-full font-medium
                ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : order.status === "Shipped"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}>
                        {order.status}
                      </span>

                      <button className="flex items-center gap-x-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm hover:bg-gray-100 transition">
                        <IconEye size={16} /> View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
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

        {/* ----------Addresses---------- */}

        <div className="lg:mt-22 mt-32">
          {activeTab === "Addresses" && (
            <div className="bg-[#fcfcfc] m-4 sm:m-10 px-4 sm:px-8 py-6 sm:py-8 rounded-xl border border-[#e0e0e0] shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <h1 className="font-bold text-2xl sm:text-3xl">
                    Delivery Addresses
                  </h1>
                  <p className="text-[#616161] text-sm sm:text-base tracking-[1.2px]">
                    Manage your shipping addresses
                  </p>
                </div>
                <button className="mt-4 sm:mt-0 flex items-center gap-x-2 bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-lg shadow">
                  <span className="text-lg">+</span> Add Address
                </button>
              </div>

              <div className="flex flex-col gap-y-5 mt-6">
                {address.map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl px-5 py-4 bg-white hover:shadow-md transition">
                    <div className="flex flex-col sm:flex-row justify-between gap-y-3 sm:gap-y-0">
                      <div className="flex items-center gap-x-3">
                        <span className="font-medium text-base sm:text-lg">
                          {item.place}
                        </span>
                        {item.badge && (
                          <span className="text-xs bg-gray-100 text-gray-600 border border-gray-300 px-2 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-x-2">
                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100">
                          <IconEdit size={18} />
                        </button>
                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100">
                          <IconTrash size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 text-gray-700">
                      <p className="text-sm sm:text-base">{item.address}</p>
                      <p className="text-sm sm:text-base">{item.number}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ----------Payment Methods---------- */}

        <div>
          {activeTab === "Payment Methods" && (
            <div className="lg:mx-10 mx-5 bg-white shadow-sm rounded-xl md:px-6 px-4 py-5">
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h2 className="text-xl font-semibold">Payment Methods</h2>
                  <p className="text-gray-500 text-sm">
                    Manage your payment options
                  </p>
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium">
                  + Add Card
                </button>
              </div>

              <div className="space-y-4">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-200 rounded-xl px-5 py-4 bg-white hover:shadow-md transition">
                    <div className="flex items-center gap-3">
                      <IconCreditCard className="text-gray-600" />
                      <div>
                        <h2 className="font-medium">
                          {card.type} ending in {card.last4}{" "}
                          {card.default && (
                            <span className="ml-2 bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                              Default
                            </span>
                          )}
                        </h2>
                        <p className="text-sm text-gray-500">
                          Expires {card.expiry}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-x-2">
                      <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100">
                        <IconEdit size={18} />
                      </button>
                      <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100">
                        <IconTrash size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ----------Settings---------- */}

        <div>
          {activeTab === "Settings" && (
            <div className="mt-20">
              <div className="flex sm:mx-10 mx-6 justify-center">
                <button
                  onClick={() => setpopup(true)}
                  className="mt-10 w-full flex gap-x-2 justify-center items-center cursor-pointer text-white py-2 sm:text-base rounded-lg bg-[#7D2AE8] hover:bg-[#8b32ff] duration-200">
                  Logout
                </button>
              </div>{" "}
            </div>
          )}
        </div>

        {/* ----------Popup---------- */}

        {popup && (
          <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-black/60 backdrop-blur-[1px]">
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
                  {loading && (
                    <IconLoader2 className="animate-spin" size={20} />
                  )}
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
    </div>
  );
};

export default Profile;
