import { useEffect, useState } from "react";
import { IconLoader2, IconX } from "@tabler/icons-react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function AddressPopup({
  addresspopup,
  setaddresspopup,
  onSave,
  existingData,
}) {
  const [loading, setloading] = useState(false);
  const formik = useFormik({
    initialValues: {
      type: "HOME",
      label: "",
      address: "",
      phone: "",
    },
    validationSchema: Yup.object({
      type: Yup.string().required("Type is required"),
      label: Yup.string().required("Label is required"),
      address: Yup.string().required("Address is required"),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Phone must contain only digits")
        .min(10, "Phone must be at least 10 digits")
        .required("Phone is required"),
    }),
    onSubmit: (values) => {
      setloading(true);
      setTimeout(() => {
        const newAddress = { ...values, badge: values.label };
        onSave(newAddress);
        setloading(false);
      }, 2000);
    },
  });

  useEffect(() => {
    if (existingData) {
      formik.setValues({
        type: existingData.type || "HOME",
        label: existingData.label || "",
        address: existingData.address || "",
        phone: existingData.phone || "",
      });
    }
  }, [existingData]);

  if (!addresspopup) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-black/60 backdrop-blur-[1px]">
      <div className="flex flex-col border bg-white border-[#eeeeee] shadow-xl w-[300px] sm:w-[500px] px-5 py-6 rounded-xl relative">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-2xl">
            {existingData ? "Edit Address" : "Add Address"}
          </h1>
          <IconX
            size={25}
            color="#7e22ce"
            className="cursor-pointer"
            onClick={() => setaddresspopup(false)}
          />
        </div>
        <p className="text-[#616161] text-sm mb-4">
          Manage your shipping address.
        </p>

        {/* Form */}
        <form onSubmit={formik.handleSubmit}>
          {/* Type Selection */}
          <div className="flex gap-3 mb-4">
            {["HOME", "OFFICE", "OTHER"].map((option) => (
              <button
                type="button"
                key={option}
                className={`px-4 py-2 rounded-lg border ${
                  formik.values.type === option
                    ? "border-purple-700 bg-purple-50 text-purple-700"
                    : "border-gray-300 text-gray-600"
                }`}
                onClick={() => formik.setFieldValue("type", option)}>
                {option}
              </button>
            ))}
          </div>
          {formik.touched.type && formik.errors.type && (
            <p className="text-red-500 text-xs mb-2">{formik.errors.type}</p>
          )}

          {/* Label */}
          <label className="text-sm font-medium mb-1">Label</label>
          <input
            type="text"
            name="label"
            placeholder="Default, Billing, etc."
            value={formik.values.label}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-1 focus:outline-purple-700"
          />
          {formik.touched.label && formik.errors.label && (
            <p className="text-red-500 text-xs mb-2">{formik.errors.label}</p>
          )}

          {/* Full Address */}
          <label className="text-sm font-medium mb-1">Full Address</label>
          <input
            type="text"
            name="address"
            placeholder="Street, City, State, ZIP"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-1 focus:outline-purple-700"
          />
          {formik.touched.address && formik.errors.address && (
            <p className="text-red-500 text-xs mb-2">{formik.errors.address}</p>
          )}

          {/* Phone */}
          <label className="text-sm font-medium mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            placeholder="+1 555 000 0000"
            value={formik.values.phone}
            onChange={(e) => {
              const onlyNums = e.target.value.replace(/[^0-9]/g, "");
              formik.setFieldValue("phone", onlyNums);
            }}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-1 focus:outline-purple-700"
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-red-500 text-xs mb-2">{formik.errors.phone}</p>
          )}
          <div className="tracking-[1px] text-lg">
            <button
              type="submit"
              className="flex justify-center items-center gap-x-2 bg-purple-700 cursor-pointer text-white w-full px-5 py-2 rounded-lg self-end transition mt-3">
              {loading && <IconLoader2 size={20} className="animate-spin" />}{" "}
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
