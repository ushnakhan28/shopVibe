import {
  IconEye,
  IconEyeOff,
  IconLoader2,
  IconMail,
  IconPhone,
} from "@tabler/icons-react";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useRouter } from "next/router";

const Form = () => {
  const [showEyeIcon, setshowEyeIcon] = useState(false);
  const [loading, setloading] = useState(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
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
        router.push("/profile");
        setloading(false);
      }, 3000);
    },
  });
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <div className="shadow-2xl px-5 border border-[#dddddd] py-15 rounded-xl w-[450px]">
        <h1 className="font-bold text-2xl text-center">Welcome back</h1>
        <p className="text-md text-center mt-2 text-[#adadad]">
          Sign in to your account to continue shopping
        </p>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <div className="flex flex-col gap-y-2 mt-5">
              <label className="font-semibold">Email:</label>
              <div className="flex gap-x-3 items-center w-full border border-[#adadad] px-3 py-[10px] rounded-xl">
                <IconMail className="" size={20} color="#b9b9b9" />
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
            <div className="flex flex-col gap-y-2 mt-5">
              <label className="font-semibold">Password:</label>
              <div className="flex gap-x-3 items-center w-full border border-[#adadad] px-3 py-2 rounded-xl">
                <IconPhone className="" size={20} color="#b9b9b9" />
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
