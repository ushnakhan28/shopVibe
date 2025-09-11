import { useEffect, useState } from "react";
import { IconLoader2, IconX } from "@tabler/icons-react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function PaymentPopup({
  paymentPopup,
  setPaymentPopup,
  onSave,
  existingData,
}) {
  const [loading, setloading] = useState(false);
  const formik = useFormik({
    initialValues: {
      type: "Visa",
      holder: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    },
    validationSchema: Yup.object({
      type: Yup.string().required("Card type is required"),
      holder: Yup.string().required("Card holder name is required"),
      cardNumber: Yup.string()
        .matches(/^[0-9]{16}$/, "Card number must be 16 digits")
        .required("Card number is required"),
      expiry: Yup.string()
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be MM/YY")
        .required("Expiry date is required"),
      cvv: Yup.string()
        .matches(/^[0-9]{3,4}$/, "CVV must be 3 or 4 digits")
        .required("CVV is required"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      setloading(true); // loader start
      setTimeout(() => {
        const newCard = {
          type: values.type,
          holder: values.holder,
          cardNumber: values.cardNumber,
          last4: values.cardNumber.slice(-4),
          expiry: values.expiry,
          cvv: values.cvv,
        };
        onSave(newCard);
        setPaymentPopup(false);
        setloading(false); // loader stop
        setSubmitting(false);
      }, 2000);
    },
  });

  useEffect(() => {
    if (existingData) {
      formik.setValues({
        type: existingData.type || "Visa",
        holder: existingData.holder || "",
        cardNumber: existingData.cardNumber || "",
        expiry: existingData.expiry || "",
        cvv: existingData.cvv || "",
      });
    }
  }, [existingData]);

  if (!paymentPopup) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-black/60 backdrop-blur-[1px]">
      <div className="flex flex-col border bg-white border-[#eeeeee] shadow-xl w-[300px] sm:w-[500px] px-5 py-6 rounded-xl relative">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-2xl">
            {existingData ? "Edit Card" : "Add Card"}
          </h1>
          <IconX
            size={25}
            color="#7e22ce"
            className="cursor-pointer"
            onClick={() => setPaymentPopup(false)}
          />
        </div>
        <p className="text-[#616161] text-sm mb-1">
          Securely add your payment method.
        </p>

        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-y-1 mt-2">
          <label className="font-medium">Card Type</label>
          <div className="flex gap-3 flex-wrap mb-2">
            {["Visa", "Mastercard", "Amex", "Discover"].map((option) => (
              <label key={option} className="flex items-center gap-1">
                <input
                  type="radio"
                  name="type"
                  value={option}
                  checked={formik.values.type === option}
                  onChange={formik.handleChange}
                  className="accent-purple-600"
                />
                {option}
              </label>
            ))}
          </div>
          {formik.touched.type && formik.errors.type && (
            <p className="text-red-500 text-xs">{formik.errors.type}</p>
          )}{" "}
          <label htmlFor="holder" className="font-medium">
            Card Holder
          </label>
          <input
            id="holder"
            type="text"
            name="holder"
            placeholder="Card Holder"
            value={formik.values.holder}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-purple-500"
          />
          {formik.touched.holder && formik.errors.holder && (
            <p className="text-red-500 text-xs">{formik.errors.holder}</p>
          )}{" "}
          <label htmlFor="cardNumber" className="font-medium">
            Card Number
          </label>
          <input
            id="cardNumber"
            type="text"
            name="cardNumber"
            maxLength="16"
            placeholder="1234 5678 9012 3456"
            value={formik.values.cardNumber}
            onChange={(e) => {
              const onlyNums = e.target.value.replace(/[^0-9]/g, "");
              formik.setFieldValue("cardNumber", onlyNums);
            }}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-purple-500"
          />
          {formik.touched.cardNumber && formik.errors.cardNumber && (
            <p className="text-red-500 text-xs">{formik.errors.cardNumber}</p>
          )}
          <div className="flex gap-x-3">
            <div className="flex flex-col gap-y-2 w-full">
              <label htmlFor="expiry" className="font-medium">
                Expiry
              </label>
              <input
                id="expiry"
                type="text"
                name="expiry"
                maxLength="5"
                placeholder="MM/YY"
                value={formik.values.expiry}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-purple-500"
              />
              {formik.touched.expiry && formik.errors.expiry && (
                <p className="text-red-500 text-xs">{formik.errors.expiry}</p>
              )}
            </div>
            <div className="flex flex-col gap-y-2 w-full">
              <label htmlFor="cvv" className="font-medium">
                CVV
              </label>
              <input
                id="cvv"
                type="text"
                name="cvv"
                maxLength="4"
                placeholder="CVV"
                value={formik.values.cvv}
                onChange={(e) => {
                  const onlyNums = e.target.value.replace(/[^0-9]/g, "");
                  formik.setFieldValue("cvv", onlyNums);
                }}
                onBlur={formik.handleBlur}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-purple-500"
              />
              {formik.touched.cvv && formik.errors.cvv && (
                <p className="text-red-500 text-xs">{formik.errors.cvv}</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="flex justify-center items-center gap-x-2 bg-purple-600 cursor-pointer text-white px-5 py-2 rounded-lg hover:bg-purple-700 mt-2">
            {loading && <IconLoader2 size={20} className="animate-spin" />} Save
          </button>
        </form>
      </div>
    </div>
  );
}
