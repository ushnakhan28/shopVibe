import { IconLoader2, IconTrash } from "@tabler/icons-react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import FullWidthBtn from "./fullWidthBtn";

const DeletePopup = ({ deletepopup, setdeletepopup }) => {
  const router = useRouter();
  const [selected, setSelected] = useState("");
  const [loading, setloading] = useState(false);

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
      reason: Yup.string().required("Please select a reason"),
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
  const options = [
    "Privacy Concerns",
    "Usability Issues",
    "Duplicate Account",
    "Other",
  ];
  if (!deletepopup) return null;
  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-black/60 backdrop-blur-[1px]">
      <div className="absolute w-full h-full pointer-events-none"></div>
      <form
        onSubmit={deleteFormik.handleSubmit}
        className="flex flex-col items-start border bg-white border-[#eeeeee] shadow-xl w-[300px] sm:w-[500px] px-4 py-6 rounded-lg">
        <h1 className="font-bold text-2xl">Delete Account</h1>
        <p className="text-sm text-[#616161] mt-2">
          This action cannot be undone. This will permanently delete your
          account and remove all associated data.
        </p>
        <p className="font-semibold mt-2">Why are you leaving?</p>

        {/* Options */}
        <div className="mt-3 flex flex-col gap-y-2 w-full">
          {options.map((option, index) => (
            <label
              key={index}
              onClick={() => {
                setSelected(option);
                deleteFormik.setFieldValue("reason", option);
              }}
              className={`px-3 py-2 rounded-lg flex items-center gap-x-2 cursor-pointer border transition 
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

        {/* Confirm + Password */}
        <div className="flex gap-x-2 mt-3 w-full">
          <div className="w-full">
            <label className="text-sm">Confirm by typing DELETE</label>
            <input
              name="confirmText"
              placeholder="DELETE"
              value={deleteFormik.values.confirmText}
              onChange={deleteFormik.handleChange}
              onBlur={deleteFormik.handleBlur}
              className="px-4 py-2 mt-1 outline-purple-700 w-full rounded-lg border-[#adadad] border"
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
              className="px-4 py-2 mt-1 outline-purple-700 w-full rounded-lg border-[#adadad] border"
            />
            {deleteFormik.touched.dltpassword &&
              deleteFormik.errors.dltpassword && (
                <p className="text-red-500 text-sm">
                  {deleteFormik.errors.dltpassword}
                </p>
              )}
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full sm:flex flex-col flex gap-y-2 mt-4 gap-x-3">
          <FullWidthBtn
            text="Delete Account"
            loading={loading}
            icon={<IconTrash size={22} />}
            type="submit"
          />
          <button
            onClick={() => {
              setdeletepopup(false);
              setSelected(null);
              deleteFormik.resetForm({
                values: { confirmText: "", dltpassword: "" },
              });
            }}
            className="rounded-lg px-4 py-2 border border-gray-300 w-full cursor-pointer hover:bg-gray-100">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeletePopup;
