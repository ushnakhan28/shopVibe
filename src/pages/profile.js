import { QRCodeCanvas } from "qrcode.react";
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
  IconTruck,
  IconClock,
  IconShoppingBag,
  IconSettings,
  IconCheck,
  IconEye,
  IconLogout2,
  IconMenu2,
  IconShoppingCart,
  IconEyeOff,
  IconKey,
  IconLock,
  IconSignRight,
} from "@tabler/icons-react";
import Header from "../../components/home/header";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Badge } from "@mantine/core";
import Wishlist from "./wishlist";
import LogoutPopup from "../../components/home/logoutPopup";
import SixDigit from "../../components/home/digit";
import AddToCart from "./addToCart";
import AddressPopup from "../../components/home/addAddress";

const Profile = () => {
  const router = useRouter();
  const [isLoggedOut, setisLoggedOut] = useState(false);
  const [loading, setloading] = useState(false);
  const [username, setusername] = useState(false);
  const [email, setemail] = useState(false);
  const [wishlistcount, setwishlistcount] = useState(0);
  const [edit, setedit] = useState(false);
  const [activeTab, setactiveTab] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [passPopup, setpassPopup] = useState(false);
  const [showEyeIcon1, setshowEyeIcon1] = useState(false);
  const [showEyeIcon2, setshowEyeIcon2] = useState(false);
  const [showEyeIcon3, setshowEyeIcon3] = useState(false);
  const [deletepopup, setdeletepopup] = useState(false);
  const [selected, setSelected] = useState("");
  const [authpopup, setauthpopup] = useState(false);
  const [error, seterror] = useState(false);
  const [verify, setverify] = useState(false);
  const [isMethodAdded, setIsMethodAdded] = useState(false); // button ke liye
  const [timer, setTimer] = useState(0);
  const [codeSent, setCodeSent] = useState(false);
  const [addresspopup, setaddresspopup] = useState(false);

  // popup open hone par localStorage check
  useEffect(() => {
    const savedMethod = localStorage.getItem("selectedMethod");
    if (savedMethod) {
      setSelected(savedMethod);
      setIsMethodAdded(true);
      setverify(false); // direct QR/SMS screen mat dikhao
    } else {
      setSelected(null);
      setIsMethodAdded(false);
      setverify(false);
    }
  }, [authpopup]);

  useEffect(() => {
    const loggedOut = localStorage.getItem("isLoggedOut");
    if (loggedOut === "true") {
      setisLoggedOut(true);
    }

    // chahe login se aaye ya create se, dono me ye fields same hongi
    const savedName = localStorage.getItem("userName");
    const savedEmail = localStorage.getItem("email");

    if (savedName) {
      setusername(savedName);
    }
    if (savedEmail) {
      setemail(savedEmail);
    }

    // wishlist
    const wishlistData = JSON.parse(localStorage.getItem("wishlist")) || [];
    setwishlistcount(wishlistData.length);
  }, []);

  const handleSendCode = () => {
    if (!formik.values.phone || formik.errors.phone) {
      formik.handleSubmit(); // trigger error
      return;
    }
    setCodeSent(true);
    setTimer(60); // start 60s countdown
  };

  // Timer countdown
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const phoneFormik = useFormik({
    initialValues: {
      phone: "",
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .matches(/^[0-9]{10,15}$/, "Invalid phone number")
        .required("Phone number is required"),
    }),
    onSubmit: () => {},
  });
  const deleteFormik = useFormik({
    initialValues: {
      confirmText: "",
      dltpassword: "",
      reason: "",
    },
    validationSchema: Yup.object({
      confirmText: Yup.string()
        .oneOf(["DELETE"], "You must type DELETE to confirm")
        .required("This field is required"),
      dltpassword: Yup.string()
        .required("Password is required")
        .test("match-password", "Incorrect password", function (value) {
          const storedPassword = localStorage.getItem("password");
          return value === storedPassword;
        }),
      reason: Yup.string().required("Please select a reason"), // 👈 ye required kar diya
    }),
    onSubmit: (values) => {
      setloading(true);
      setTimeout(() => {
        localStorage.clear();
        router.push("/");
        setloading(false);
      }, 2000);
    },
    enableReinitialize: true,
  });
  const formik = useFormik({
    initialValues: {
      username: username || "",
      email: email || "",
      phone: "+92 300 1234567",
      address: "123 Main Street, Karachi, Pakistan",
      password: "",
      newpass: "",
      confirmpass: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Enter valid email")
        .required("Email is required"),
      phone: Yup.string().required("Phone number is required"),
      address: Yup.string().required("Address is required"),
      password: Yup.string()
        .required("Current Password is required")
        .test(
          "match-password",
          "Current password is incorrect",
          function (value) {
            const storedPassword = localStorage.getItem("password"); // 👈 check localStorage
            return value === storedPassword;
          }
        ),

      newpass: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("New Password is required")
        .notOneOf(
          [Yup.ref("password")],
          "New password must be different from current password"
        ),

      confirmpass: Yup.string()
        .required("Confirm your new password")
        .oneOf([Yup.ref("newpass")], "Passwords must match"),
    }),
    onSubmit: (values) => {
      localStorage.setItem("userName", values.username);
      localStorage.setItem("email", values.email);
      localStorage.setItem("phone", values.phone);
      localStorage.setItem("address", values.address);
      // localStorage.setItem("password", values.newpass);

      setusername(values.username);
      setemail(values.email);
      setedit(false);
      setpassPopup(false);
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

  const address = [
    {
      place: "HOME",
      address: "123 Main St, City, State 12345",
      number: "+1 (555) 123-4567",
      badge: "Default",
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

  const [settings, setSettings] = useState({
    email: false,
    sms: false,
    marketing: false,
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem("settings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  const handleupdate = () => {
    if (formik.isValid && formik.dirty) {
      setloading(true);
      setTimeout(() => {
        localStorage.setItem("password", formik.values.newpass);
        setloading(false);
        setpassPopup(false);
        formik.resetForm({
          values: {
            ...formik.values,
            password: "",
            newpass: "",
            confirmpass: "",
          },
        });
        setshowEyeIcon1(false);
        setshowEyeIcon2(false);
        setshowEyeIcon3(false);
      }, 2000);
    } else {
      formik.handleSubmit();
    }
  };
  const options = [
    "Privacy Concerns",
    "Usability Issues",
    "Duplicate Account",
    "Other",
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
                <button
                  onClick={() => setaddresspopup(true)}
                  className="mt-4 sm:mt-0 flex items-center gap-x-2 bg-purple-600 hover:bg-purple-700 text-white font-medium cursor-pointer px-4 py-2 rounded-lg shadow">
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
                        <button className="p-2 cursor-pointer border border-gray-300 rounded-lg hover:bg-gray-100">
                          <IconEdit size={18} />
                        </button>
                        <button className="p-2 cursor-pointer border border-gray-300 rounded-lg hover:bg-gray-100">
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
            <div className="bg-[#fcfcfc] m-4 sm:m-10 px-4 sm:px-8 py-6 sm:py-8 rounded-xl border border-[#e0e0e0] shadow-sm">
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h1 className="font-bold text-2xl sm:text-3xl">
                    Payment Methods
                  </h1>
                  <p className="text-[#616161] text-sm sm:text-base tracking-[1.2px]">
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
                          {card.type} ending in {card.last4}
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
            <div className="mb-5">
              <div className="bg-[#fcfcfc] m-4 sm:m-10 px-4 sm:px-8 py-6 sm:py-8 rounded-xl border border-[#e0e0e0] shadow-sm">
                <h1 className="font-bold text-2xl sm:text-3xl">
                  Account Settings
                </h1>
                <p className="text-[#616161] text-sm sm:text-base tracking-[1.2px]">
                  Configure your account preferences
                </p>

                <div className="flex justify-between items-center border-b border-[#adadad] py-5">
                  <div>
                    <h1 className="text-lg font-semibold">
                      Email Notifications
                    </h1>
                    <p className="text-sm text-gray-600">
                      Receive updates about orders and promotions
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle("email")}
                    className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ${
                      settings.email ? "bg-[#7D2AE8]" : "bg-gray-300"
                    }`}>
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                        settings.email ? "translate-x-6" : "translate-x-0"
                      }`}></div>
                  </button>
                </div>

                <div className="flex justify-between items-center border-b border-[#adadad] py-5">
                  <div>
                    <h1 className="text-lg font-semibold">SMS Notifications</h1>
                    <p className="text-sm text-gray-600">
                      Get text updates about your orders
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle("sms")}
                    className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ${
                      settings.sms ? "bg-[#7D2AE8]" : "bg-gray-300"
                    }`}>
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                        settings.sms ? "translate-x-6" : "translate-x-0"
                      }`}></div>
                  </button>
                </div>

                {/* Marketing Emails */}
                <div className="flex justify-between items-center pt-5">
                  <div>
                    <h1 className="text-lg font-semibold">Marketing Emails</h1>
                    <p className="text-sm text-gray-600">
                      Receive promotional offers and deals
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle("marketing")}
                    className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ${
                      settings.marketing ? "bg-[#7D2AE8]" : "bg-gray-300"
                    }`}>
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                        settings.marketing ? "translate-x-6" : "translate-x-0"
                      }`}></div>
                  </button>
                </div>
              </div>

              <div className="bg-[#fcfcfc] mt-8 m-4 sm:m-10 px-4 sm:px-8 py-6 sm:py-8 rounded-xl border border-[#e0e0e0] shadow-sm">
                <h1 className="font-bold text-2xl sm:text-3xl">Security</h1>
                <p className="text-[#616161] text-sm sm:text-base tracking-[1.2px]">
                  Manage your account security
                </p>
                <div className="mt-5 flex flex-col gap-y-3">
                  <div
                    onClick={() => setpassPopup(true)}
                    className="flex gap-x-3 items-center border border-[#adadad] hover:bg-gray-100 cursor-pointer rounded-xl px-3 py-2">
                    <IconSettings size={20} color="#9333EA" />
                    <span>Change Password</span>
                  </div>
                  <div
                    onClick={() => setauthpopup(true)}
                    className="flex gap-x-3 items-center border border-[#adadad] hover:bg-gray-100 cursor-pointer rounded-xl px-3 py-2">
                    <IconSettings size={20} color="#9333EA" />
                    <span>Two-Factor Authentication</span>
                  </div>
                  <div
                    onClick={() => setdeletepopup(true)}
                    className="flex gap-x-3 items-center border border-[#adadad] hover:bg-gray-100 cursor-pointer rounded-xl px-3 py-2">
                    <IconTrash size={20} color="#ff3939" />
                    <span>Delete Account</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ----------Signout---------- */}

        <div>
          {activeTab === "Signout" && (
            <LogoutPopup setactiveTab={setactiveTab} />
          )}
        </div>

        {/* ----------Popup---------- */}

        {passPopup && (
          <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-black/60 backdrop-blur-[1px]">
            <div className="absolute w-full h-full pointer-events-none"></div>
            <div className="flex flex-col justify-center items-center border bg-white border-[#eeeeee] shadow-xl w-[300px] sm:w-[500px] px-5 py-6 rounded-xl">
              <form onSubmit={formik.handleSubmit} className="w-full">
                <div className="flex flex-col gap-y-2 mt-2">
                  <label className="font-semibold">Current Password:</label>
                  <div className="flex gap-x-0 sm:gap-x-3 items-center border border-[#adadad] px-3 py-2 rounded-xl">
                    <IconLock
                      className="sm:block hidden"
                      size={20}
                      color="#b9b9b9"
                    />
                    <input
                      onBlur={formik.handleBlur}
                      type={showEyeIcon1 ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      className="flex-1 outline-none focus:ring-0"
                      autoComplete="off"
                    />
                    <div className="cursor-pointer p-1 hover:bg-[#eeeeee] rounded-lg">
                      {showEyeIcon1 ? (
                        <IconEye
                          size={20}
                          onClick={() => setshowEyeIcon1(false)}
                        />
                      ) : (
                        <IconEyeOff
                          size={20}
                          onClick={() => setshowEyeIcon1(true)}
                        />
                      )}
                    </div>
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.password}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-y-2 mt-2">
                  <label className="font-semibold">New Password:</label>
                  <div className="flex gap-x-0 sm:gap-x-3 items-center w-full border border-[#adadad] px-3 py-2 rounded-xl">
                    <IconLock
                      className="sm:block hidden"
                      size={20}
                      color="#b9b9b9"
                    />
                    <input
                      onBlur={formik.handleBlur}
                      type={showEyeIcon2 ? "text" : "password"}
                      name="newpass"
                      placeholder="Enter your password"
                      onChange={formik.handleChange}
                      value={formik.values.newpass}
                      className="flex-1 outline-none focus:ring-0"
                      autoComplete="off"
                    />
                    <div className="cursor-pointer p-1 hover:bg-[#eeeeee] rounded-lg">
                      {showEyeIcon2 ? (
                        <IconEye
                          size={20}
                          onClick={() => setshowEyeIcon2(false)}
                        />
                      ) : (
                        <IconEyeOff
                          size={20}
                          onClick={() => setshowEyeIcon2(true)}
                        />
                      )}
                    </div>
                  </div>
                  {formik.touched.newpass && formik.errors.newpass && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.newpass}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-y-2 mt-2">
                  <label className="font-semibold">Confirm New Password:</label>
                  <div className="flex gap-x-0 sm:gap-x-3 items-center w-full border border-[#adadad] px-3 py-2 rounded-xl">
                    <IconLock
                      className="sm:block hidden"
                      size={20}
                      color="#b9b9b9"
                    />
                    <input
                      onBlur={formik.handleBlur}
                      type={showEyeIcon3 ? "text" : "password"}
                      name="confirmpass"
                      placeholder="Enter your password"
                      onChange={formik.handleChange}
                      value={formik.values.confirmpass}
                      className="flex-1 outline-none focus:ring-0"
                      autoComplete="off"
                    />
                    <div className="cursor-pointer p-1 hover:bg-[#eeeeee] rounded-lg">
                      {showEyeIcon3 ? (
                        <IconEye
                          size={20}
                          onClick={() => setshowEyeIcon3(false)}
                        />
                      ) : (
                        <IconEyeOff
                          size={20}
                          onClick={() => setshowEyeIcon3(true)}
                        />
                      )}
                    </div>
                  </div>
                  {formik.touched.confirmpass && formik.errors.confirmpass && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.confirmpass}
                    </p>
                  )}
                </div>
                <div className="w-full sm:flex flex flex-col gap-y-2 mt-4 gap-x-3">
                  <button
                    onClick={handleupdate}
                    type="button"
                    className="flex justify-center gap-x-2 items-center rounded-xl px-4 py-2 bg-[#9333EA] text-white w-full cursor-pointer hover:bg-[#a03bff]">
                    {loading ? (
                      <IconLoader2 className="animate-spin" size={20} />
                    ) : (
                      <IconKey size={20} />
                    )}
                    Update Password
                  </button>
                  <button
                    onClick={() => {
                      setpassPopup(false);
                      formik.resetForm({
                        values: {
                          password: "",
                          newpass: "",
                          confirmpass: "",
                        },
                      });
                    }}
                    className="rounded-xl px-4 py-2 border border-gray-300 w-full cursor-pointer hover:bg-gray-100">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {deletepopup && (
          <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-black/60 backdrop-blur-[1px]">
            <div className="absolute w-full h-full pointer-events-none"></div>
            <form
              onSubmit={deleteFormik.handleSubmit}
              className="flex flex-col items-start border bg-white border-[#eeeeee] shadow-xl w-[300px] sm:w-[500px] px-4 py-6 rounded-xl">
              <h1 className="font-bold text-2xl">Delete Account</h1>
              <p className="text-sm text-[#616161] mt-2">
                This action cannot be undone. This will permanently delete your
                account and remove all associated data.
              </p>
              <p className="font-semibold mt-2">Why are you leaving?</p>
              <div className="mt-3 flex flex-col gap-y-2 w-full">
                {options.map((option, index) => (
                  <label
                    key={index}
                    onClick={() => {
                      setSelected(option);
                      deleteFormik.setFieldValue("reason", option);
                    }}
                    className={`px-3 py-2 rounded-xl flex items-center gap-x-2 cursor-pointer border transition 
            ${
              selected === option
                ? "bg-red-50 border-red-500"
                : "bg-white text-black border-gray-300 hover:border-red-400"
            }`}>
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center
              ${
                selected === option
                  ? "bg-white border-red-500 border-2"
                  : "border-gray-400"
              }`}>
                      {selected === option && (
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      )}
                    </span>
                    {option}
                  </label>
                ))}
              </div>
              {deleteFormik.touched.reason && deleteFormik.errors.reason && (
                <p className="text-red-500 text-xs mt-1">
                  {deleteFormik.errors.reason}
                </p>
              )}

              <div className="flex gap-x-2 mt-3 w-full">
                <div className="w-full">
                  <label className="text-sm">Confirm by typing DELETE</label>
                  <input
                    name="confirmText"
                    placeholder="DELETE"
                    value={deleteFormik.values.confirmText}
                    onChange={deleteFormik.handleChange}
                    onBlur={deleteFormik.handleBlur}
                    className="px-4 py-2 mt-1 outline-[#9333EA] w-full rounded-xl border-[#adadad] border"
                  />
                  {deleteFormik.errors.confirmText &&
                    deleteFormik.touched.confirmText && (
                      <p className="text-red-500 text-xs mt-1">
                        {deleteFormik.errors.confirmText}
                      </p>
                    )}
                </div>
                <div className="w-full">
                  <label className="text-sm">Password</label>
                  <input
                    name="dltpassword"
                    type="password"
                    placeholder="Your password"
                    value={deleteFormik.values.dltpassword}
                    onChange={deleteFormik.handleChange}
                    onBlur={deleteFormik.handleBlur}
                    className="px-4 py-2 mt-1 outline-[#9333EA] w-full rounded-xl border-[#adadad] border"
                  />
                  {deleteFormik.touched.dltpassword &&
                    deleteFormik.errors.dltpassword && (
                      <p className="text-red-500 text-sm">
                        {deleteFormik.errors.dltpassword}
                      </p>
                    )}
                </div>
              </div>
              <div className="w-full sm:flex flex-col flex gap-y-2 mt-4 gap-x-3">
                <button
                  type="submit"
                  className="flex justify-center gap-x-2 items-center rounded-xl px-4 py-2 bg-[#9333EA] text-white w-full cursor-pointer hover:bg-[#a03bff]">
                  {loading ? (
                    <IconLoader2 className="animate-spin" size={20} />
                  ) : (
                    <IconTrash size={20} />
                  )}
                  Delete Account
                </button>
                <button
                  onClick={() => {
                    setdeletepopup(false);
                    setSelected(null);
                    deleteFormik.resetForm({
                      values: {
                        confirmText: "",
                        dltpassword: "",
                      },
                    });
                  }}
                  className="rounded-xl px-4 py-2 border border-gray-300 w-full cursor-pointer hover:bg-gray-100">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {authpopup && (
          <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-black/60 backdrop-blur-[1px]">
            <div className="absolute w-full h-full pointer-events-none"></div>
            <div className="flex flex-col items-start border bg-white border-[#eeeeee] shadow-xl w-[300px] sm:w-[500px] px-5 py-6 rounded-xl">
              {!verify ? (
                <>
                  <h1 className="font-bold text-2xl">
                    Two-Factor Authentication
                  </h1>
                  <p className="text-sm text-[#616161] mt-2">
                    Protect your account with an extra step at sign-in.
                  </p>
                  <p className="font-semibold mt-4">Choose a method:</p>
                  <div className="mt-3 flex flex-col gap-y-2 w-full">
                    {["Authentication App", "SMS"].map((option, index) => {
                      const isDisabled = isMethodAdded && selected !== option;
                      return (
                        <label
                          key={index}
                          onClick={() => {
                            if (isDisabled) return;
                            setSelected(option);
                            seterror(false);
                          }}
                          className={`px-3 py-2 rounded-xl flex items-center gap-x-2 border transition
                    ${
                      selected === option
                        ? "bg-purple-50 border-purple-500"
                        : "bg-white text-black border-gray-300 hover:border-purple-400"
                    }
                    ${
                      isDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }
                  `}>
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center
                      ${
                        selected === option
                          ? "bg-white border-purple-500 border-2"
                          : "border-gray-400"
                      }`}>
                            {selected === option && (
                              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                            )}
                          </span>
                          {option}
                        </label>
                      );
                    })}

                    {error && (
                      <p className="text-red-500 text-sm">
                        Please select a method
                      </p>
                    )}
                  </div>
                  <div className="sm:flex flex flex-col gap-y-2 gap-x-3 w-full mt-5">
                    <button
                      disabled={isMethodAdded}
                      className={`flex items-center justify-center gap-x-2 w-full rounded-xl px-4 py-2 
                ${
                  isMethodAdded
                    ? "bg-[#9333EA] cursor-default"
                    : "bg-[#9333EA] hover:bg-[#a03bff]"
                } text-white`}
                      onClick={() => {
                        if (!selected) {
                          seterror(true);
                          return;
                        }
                        setloading(true);
                        setTimeout(() => {
                          setIsMethodAdded(true);
                          setverify(true);
                          setloading(false);
                        }, 2000);
                      }}>
                      {loading && (
                        <IconLoader2 className="animate-spin" size={20} />
                      )}
                      {isMethodAdded && <IconCheck />}
                      {isMethodAdded ? "Verified" : "Continue"}
                    </button>

                    <button
                      className="w-full rounded-xl px-4 py-2 border border-gray-300 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setauthpopup(false);
                        setSelected(null);
                      }}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div className="w-full">
                  <div
                    className="flex justify-between"
                    onClick={() => setauthpopup(false)}>
                    <h1 className="font-bold text-2xl">
                      Two-Factor Authentication
                    </h1>
                    <IconX
                      size={25}
                      color="#9333ea"
                      className="cursor-pointer -mt-4 -mr-3"
                    />
                  </div>
                  <p className="text-sm text-[#616161] mt-2">
                    Protect your account with an extra step at sign-in.
                  </p>

                  {selected === "Authentication App" ? (
                    <div>
                      <p className="mt-3 text-[#000] text-sm">
                        Scan this QR code with your authenticator app and enter
                        the 6-digit code.
                      </p>
                      <div className="flex justify-center mt-5">
                        <QRCodeCanvas
                          value="otpauth://totp/UshnaApp?secret=JBSWY3DPEHPK3PXP&issuer=MyEcommerce"
                          size={120}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-3 text-center">
                        Can’t scan? Enter this code manually:{" "}
                        <b className="text-[#505050]">JBSWY3DPEHPK3PXP</b>
                      </p>
                      <SixDigit
                        setauthpopup={setauthpopup}
                        selected={selected}
                      />
                    </div>
                  ) : (
                    <div className="w-full sm:w-[455px]">
                      <form className="flex flex-col">
                        <label className="font-semibold text-[#adadad] mt-2">
                          Phone Number
                        </label>
                        <input
                          name="phone"
                          placeholder="Enter your number"
                          className="border border-[#adadad] px-4 py-2 rounded-xl w-full mt-2 outline-[#9333ea]"
                          value={phoneFormik.values.phone}
                          onChange={phoneFormik.handleChange}
                          onBlur={phoneFormik.handleBlur}
                        />
                        {phoneFormik.touched.phone &&
                          phoneFormik.errors.phone && (
                            <p className="text-red-500 text-sm mt-1">
                              {phoneFormik.errors.phone}
                            </p>
                          )}
                        <div className="text-sm">
                          {!codeSent ? (
                            <button
                              type="button"
                              onClick={handleSendCode}
                              className="w-[120px] hover:bg-[#a23fff] mt-2 py-2 rounded-xl bg-[#9333ea] text-white cursor-pointer">
                              Send Code
                            </button>
                          ) : timer > 0 ? (
                            <button
                              type="button"
                              disabled
                              className="w-[140px] mt-2 py-2 rounded-xl bg-gray-400 text-white cursor-not-allowed">
                              Resend in {timer}s
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={handleSendCode}
                              className="w-[120px] hover:bg-[#a23fff] mt-2 py-2 rounded-xl bg-[#9333ea] text-white cursor-pointer">
                              Resend Code
                            </button>
                          )}
                        </div>
                      </form>
                      <div>
                        <SixDigit
                          setauthpopup={setauthpopup}
                          selected={selected}
                          isCodeSent={codeSent}
                          phoneNumber={formik.values.phone}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {addresspopup && (
          <div>
            <AddressPopup
              addresspopup={addresspopup}
              setaddresspopup={setaddresspopup}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
