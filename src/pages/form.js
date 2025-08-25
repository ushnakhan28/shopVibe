import {
  IconArrowLeft,
  IconEye,
  IconEyeOff,
  IconLoader2,
  IconMail,
  IconPhone,
  IconUser,
} from "@tabler/icons-react";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Link from "next/link";

const Form = () => {
  const [showEyeIcon, setshowEyeIcon] = useState(false);
  const [loading, setloading] = useState(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, "First name must be at least 2 characters")
        .required("First name is required"),
      lastName: Yup.string()
        .min(2, "Last name must be at least 2 characters")
        .required("Last name is required"),
      email: Yup.string()
        .email("Enter valid email")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      setloading(true);
      setTimeout(() => {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("firstName", values.firstName);
        localStorage.setItem("lastName", values.lastName);
        const fullName = `${values.firstName} ${values.lastName}`;
        localStorage.setItem("userName", fullName);
        localStorage.setItem("email", values.email);
        router.push("/profile");
        setloading(false);
      }, 3000);
    },
  });

  return (
    <div className="flex gap-y-3 flex-col items-center justify-center h-[100vh]">
      <Link
        href="/"
        className="mt-60 md:mt-20 items-center flex gap-x-2 text-[#999999]">
        <IconArrowLeft size={20} />{" "}
        <span className="hover:underline">Back to ShopVibe</span>
      </Link>
      <div
        className="shadow-2xl sm:px-5 px-3 border border-[#dddddd] sm:py-5 py-6 rounded-xl 
  w-[550px] 
  max-[480px]:w-[90%]">
        <h1 className="font-bold text-2xl text-center">Welcome back</h1>
        <p className="text-md text-center mt-2 text-[#adadad]">
          Sign in to your account to continue shopping
        </p>
        <form onSubmit={formik.handleSubmit}>
          <div>
            {/* First & Last Name side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 mt-3 gap-x-3">
              <div className="flex flex-col gap-y-2 mt-2 flex-1">
                <label className="font-semibold">First Name:</label>
                <div className="flex gap-x-3 items-center w-full border border-[#adadad] px-3 py-[10px] rounded-xl">
                  <IconUser
                    className="sm:block hidden"
                    size={20}
                    color="#b9b9b9"
                  />
                  <input
                    onBlur={formik.handleBlur}
                    name="firstName"
                    placeholder="Enter your first name"
                    className="flex-1 outline-none focus:ring-0"
                    onChange={formik.handleChange}
                    autoComplete="off"
                    value={formik.values.firstName}
                  />
                </div>
                {formik.touched.firstName && formik.errors.firstName && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.firstName}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-y-2 mt-2 flex-1">
                <label className="font-semibold">Last Name:</label>
                <div className="flex gap-x-3 items-center w-full border border-[#adadad] px-3 py-[10px] rounded-xl">
                  <IconUser
                    className="sm:block hidden"
                    size={20}
                    color="#b9b9b9"
                  />
                  <input
                    onBlur={formik.handleBlur}
                    name="lastName"
                    placeholder="Enter your last name"
                    className="flex-1 outline-none focus:ring-0"
                    onChange={formik.handleChange}
                    autoComplete="off"
                    value={formik.values.lastName}
                  />
                </div>
                {formik.touched.lastName && formik.errors.lastName && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-y-2 mt-2">
              <label className="font-semibold">Email:</label>
              <div className="flex gap-x-3 items-center w-full border border-[#adadad] px-3 py-[10px] rounded-xl">
                <IconMail
                  className="sm:block hidden"
                  size={20}
                  color="#b9b9b9"
                />
                <input
                  onBlur={formik.handleBlur}
                  name="email"
                  placeholder="Enter your email"
                  className="flex-1 outline-none focus:ring-0"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  autoComplete="off"
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-y-2 mt-2">
              <label className="font-semibold">Password:</label>
              <div className="flex gap-x-0 sm:gap-x-3 items-center w-full border border-[#adadad] px-3 py-2 rounded-xl">
                <IconPhone
                  className="sm:block hidden"
                  size={20}
                  color="#b9b9b9"
                />
                <input
                  onBlur={formik.handleBlur}
                  type={showEyeIcon ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className="flex-1 outline-none focus:ring-0"
                  autoComplete="new-password"
                />
                <div className="cursor-pointer p-1 hover:bg-[#eeeeee] rounded-lg">
                  {showEyeIcon ? (
                    <IconEye size={20} onClick={() => setshowEyeIcon(false)} />
                  ) : (
                    <IconEyeOff
                      size={20}
                      onClick={() => setshowEyeIcon(true)}
                    />
                  )}
                </div>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="flex gap-x-2 justify-center items-center cursor-pointer text-white w-full mt-7 px-4 py-3 rounded-xl bg-[#7D2AE8] hover:bg-[#8b32ff] duration-200">
            {loading && <IconLoader2 className="animate-spin" size={20} />}
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
