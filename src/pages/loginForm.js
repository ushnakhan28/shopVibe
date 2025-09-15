import {
  IconArrowLeft,
  IconEye,
  IconEyeOff,
  IconLoader2,
  IconLogin,
  IconMail,
  IconPhone,
  IconUser,
} from "@tabler/icons-react";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Link from "next/link";
import FullWidthBtn from "../../components/home/fullWidthBtn";

const LoginForm = () => {
  const [showEyeIcon, setshowEyeIcon] = useState(false);
  const [loading, setloading] = useState(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "Enter Valid Username")
        .required("Username is required"),
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
        localStorage.setItem("authType", "login");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userName", values.username);
        localStorage.setItem("email", values.email);
        localStorage.setItem("password", values.password);
        router.push("/profile");
        setloading(false);
      }, 3000);
    },
  });

  return (
    <div className="flex gap-y-1 flex-col items-center justify-center h-[100vh]">
      <Link
        href="/"
        className="mt-30 md:mt-1 items-center flex gap-x-2 text-[#999999]">
        <IconArrowLeft size={20} />{" "}
        <span className="hover:underline">Back to ShopVibe</span>
      </Link>
      <div
        className="shadow-2xl sm:px-5 px-3 border border-[#dddddd] py-4 rounded-lg 
  w-[480px] 
  max-[480px]:w-[90%]">
        <h1 className="font-bold text-2xl text-center">Welcome back</h1>
        <p className="text-md text-center mt-2 text-[#adadad]">
          Sign in to your account to continue shopping
        </p>
        <form onSubmit={formik.handleSubmit}>
          <div>
            {/* Username */}
            <div className="flex flex-col mt-2">
              <label className="font-semibold">Username:</label>
              <div
                className={`flex gap-x-3 items-center w-full border border-[#adadad] px-3 py-[8px] rounded-lg ${
                  formik.errors.username ? "border-red-500" : ""
                }`}>
                <IconUser
                  className="sm:block hidden"
                  size={20}
                  color="#b9b9b9"
                />
                <input
                  onBlur={formik.handleBlur}
                  name="username"
                  placeholder="Enter your Username"
                  className="flex-1 outline-none focus:ring-0"
                  onChange={formik.handleChange}
                  autoComplete="off"
                  value={formik.values.username}
                />
              </div>
              {formik.touched.username && formik.errors.username && (
                <p className="text-red-500 text-sm">{formik.errors.username}</p>
              )}
            </div>
            {/* Email */}
            <div className="flex flex-col mt-2">
              <label className="font-semibold">Email:</label>
              <div
                className={`flex gap-x-3 items-center w-full border border-[#adadad] px-3 py-[8px] rounded-lg ${
                  formik.errors.email ? "border-red-500" : ""
                }`}>
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
            <div className="flex flex-col mt-2">
              <label className="font-semibold">Password:</label>
              <div
                className={`flex gap-x-0 sm:gap-x-3 items-center w-full border border-[#adadad] px-3 py-[8px] rounded-lg ${
                  formik.errors.password ? "border-red-500" : ""
                }`}>
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

          <FullWidthBtn
            text="Sign In"
            loading={loading}
            icon={<IconLogin size={20} />}
          />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
