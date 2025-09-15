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
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import FullWidthBtn from "../../components/home/fullWidthBtn";

const AccountForm = () => {
  const router = useRouter();
  const [showEyeIcon, setshowEyeIcon] = useState(false);
  const [loading, setloading] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords do not match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values) => {
      setloading(true);
      setTimeout(() => {
        localStorage.setItem("authType", "create");
        localStorage.setItem("isCreated", "true");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("firstName", values.firstName);
        localStorage.setItem("lastName", values.lastName);
        const fullName = `${values.firstName} ${values.lastName}`;
        localStorage.setItem("userName", fullName);
        localStorage.setItem("email", values.email);
        localStorage.setItem("password", values.password);
        router.push("/profile");
        setloading(false);
      }, 3000);
    },
  });

  return (
    <div className="flex gap-y-3 flex-col items-center justify-center h-[100vh]">
      <Link href="/" className="items-center flex gap-x-2 text-[#999999]">
        <IconArrowLeft size={20} />
        <span className="hover:underline">Back to ShopVibe</span>
      </Link>
      <div
        className="shadow-2xl sm:px-5 px-3 border border-[#dddddd] sm:py-5 py-5 rounded-lg 
  w-[480px] 
  max-[480px]:w-[90%]">
        <h1 className="font-bold text-2xl text-center">Create Account</h1>
        <p className="text-md text-center mt-2 text-[#adadad]">
          Join ShopVibe and start your shopping journey{" "}
        </p>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 mt-3 gap-x-3">
              <div className="flex flex-col mt-2 flex-1">
                <label className="font-semibold">First Name:</label>
                <div
                  className={`flex gap-x-3 items-center w-full border border-[#adadad] px-3 py-[7px] rounded-lg ${
                    formik.errors.firstName ? "border-red-500" : ""
                  }`}>
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
              <div className="flex flex-col mt-2 flex-1">
                <label className="font-semibold">Last Name:</label>
                <div
                  className={`flex gap-x-3 items-center w-full border border-[#adadad] px-3 py-[7px] rounded-lg ${
                    formik.errors.lastName ? "border-red-500" : ""
                  }`}>
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
            <div className="flex flex-col mt-1">
              <label className="font-semibold">Email:</label>
              <div
                className={`flex gap-x-3 items-center w-full border border-[#adadad] px-3 py-[7px] rounded-lg ${
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
            <div className="flex flex-col mt-1">
              <label className="font-semibold">Password:</label>
              <div
                className={`flex gap-x-0 sm:gap-x-3 items-center w-full border border-[#adadad] px-3 py-[7px] rounded-lg ${
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
            <div className="flex flex-col mt-1">
              <label className="font-semibold">Confirm Password:</label>
              <div
                className={`flex gap-x-0 sm:gap-x-3 items-center w-full border border-[#adadad] px-3 py-[7px] rounded-lg ${
                  formik.errors.confirmPassword ? "border-red-500" : ""
                }`}>
                <IconPhone
                  className="sm:block hidden"
                  size={20}
                  color="#b9b9b9"
                />
                <input
                  onBlur={formik.handleBlur}
                  type={showEyeIcon ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
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
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>
            <FullWidthBtn
              text="Create Account"
              loading={loading}
              icon={<IconLogin size={20} />}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountForm;
