import {
  IconLock,
  IconEye,
  IconEyeOff,
  IconLoader2,
  IconKey,
} from "@tabler/icons-react";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const PasswordPopup = ({ passPopup, setpassPopup }) => {
  const [showEyeIcon1, setshowEyeIcon1] = useState(false);
  const [showEyeIcon2, setshowEyeIcon2] = useState(false);
  const [showEyeIcon3, setshowEyeIcon3] = useState(false);
  const [loading, setloading] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      newpass: "",
      confirmpass: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Current Password is required")
        .test(
          "match-password",
          "Current password is incorrect",
          function (value) {
            const storedPassword = localStorage.getItem("password");
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
      setloading(true);
      setTimeout(() => {
        localStorage.setItem("password", values.newpass);

        // ✅ popup close
        setpassPopup(false);

        // reset form + eye icons
        formik.resetForm();
        setshowEyeIcon1(false);
        setshowEyeIcon2(false);
        setshowEyeIcon3(false);

        setloading(false);
      }, 2000);
    },
  });
  if (!passPopup) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-black/60 backdrop-blur-[1px]">
      <div className="absolute w-full h-full pointer-events-none"></div>
      <div className="flex flex-col justify-center items-center border bg-white border-[#eeeeee] shadow-xl w-[300px] sm:w-[500px] px-5 py-6 rounded-xl">
        <form onSubmit={formik.handleSubmit} className="w-full">
          {/* Current Password */}
          <div className="flex flex-col gap-y-2 mt-2">
            <label className="font-semibold">Current Password:</label>
            <div className="flex items-center border border-[#adadad] px-3 py-2 rounded-xl">
              <IconLock className="sm:block hidden" size={20} color="#b9b9b9" />
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
              <div
                className="cursor-pointer p-1 hover:bg-[#eeeeee] rounded-lg"
                onClick={() => setshowEyeIcon1(!showEyeIcon1)}>
                {showEyeIcon1 ? (
                  <IconEye size={20} />
                ) : (
                  <IconEyeOff size={20} />
                )}
              </div>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
          </div>

          {/* New Password */}
          <div className="flex flex-col gap-y-2 mt-2">
            <label className="font-semibold">New Password:</label>
            <div className="flex items-center border border-[#adadad] px-3 py-2 rounded-xl">
              <IconLock className="sm:block hidden" size={20} color="#b9b9b9" />
              <input
                onBlur={formik.handleBlur}
                type={showEyeIcon2 ? "text" : "password"}
                name="newpass"
                placeholder="Enter new password"
                onChange={formik.handleChange}
                value={formik.values.newpass}
                className="flex-1 outline-none focus:ring-0"
                autoComplete="off"
              />
              <div
                className="cursor-pointer p-1 hover:bg-[#eeeeee] rounded-lg"
                onClick={() => setshowEyeIcon2(!showEyeIcon2)}>
                {showEyeIcon2 ? (
                  <IconEye size={20} />
                ) : (
                  <IconEyeOff size={20} />
                )}
              </div>
            </div>
            {formik.touched.newpass && formik.errors.newpass && (
              <p className="text-red-500 text-sm">{formik.errors.newpass}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-y-2 mt-2">
            <label className="font-semibold">Confirm New Password:</label>
            <div className="flex items-center border border-[#adadad] px-3 py-2 rounded-xl">
              <IconLock className="sm:block hidden" size={20} color="#b9b9b9" />
              <input
                onBlur={formik.handleBlur}
                type={showEyeIcon3 ? "text" : "password"}
                name="confirmpass"
                placeholder="Confirm new password"
                onChange={formik.handleChange}
                value={formik.values.confirmpass}
                className="flex-1 outline-none focus:ring-0"
                autoComplete="off"
              />
              <div
                className="cursor-pointer p-1 hover:bg-[#eeeeee] rounded-lg"
                onClick={() => setshowEyeIcon3(!showEyeIcon3)}>
                {showEyeIcon3 ? (
                  <IconEye size={20} />
                ) : (
                  <IconEyeOff size={20} />
                )}
              </div>
            </div>
            {formik.touched.confirmpass && formik.errors.confirmpass && (
              <p className="text-red-500 text-sm">
                {formik.errors.confirmpass}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="w-full flex flex-col gap-y-2 mt-4">
            <button
              type="submit"
              className="flex justify-center gap-x-2 items-center rounded-xl px-4 py-2 bg-[#9333EA] text-white w-full cursor-pointer hover:bg-[#a03bff]">
              {loading ? (
                <IconLoader2 className="animate-spin" size={20} />
              ) : (
                <IconKey size={20} />
              )}
              Update Password
            </button>
            <button
              type="button"
              onClick={() => {
                setpassPopup(false);
                formik.resetForm();
              }}
              className="rounded-xl px-4 py-2 border border-gray-300 w-full cursor-pointer hover:bg-gray-100">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordPopup;
