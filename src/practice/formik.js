import { useState } from "react";
const { useFormik } = require("formik");

const form = () => {
  const [card, setcard] = useState(false);
  const formik = useFormik({
    initialValues: {
      fullname: "",
      country: "",
      color: "",
    },
    onSubmit: () => {
      setcard(true);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="m-8">
      <h1 className="text-3xl font-bold">Fill the Form:</h1>
      <input
        type="text"
        name="fullname"
        value={formik.values.fullname}
        onChange={formik.handleChange}
        placeholder="fullname"
        className="border-black border-1 px-3 py-1 mt-4 text-lg rounded-lg"
      />
      <br />
      <input
        type="text"
        name="country"
        value={formik.values.country}
        onChange={formik.handleChange}
        placeholder="country"
        className="border-black border-1 px-3 py-1 mt-2 text-lg rounded-lg"
      />
      <br />
      <input
        type="text"
        name="color"
        value={formik.values.color}
        onChange={formik.handleChange}
        placeholder="color"
        className="border-black border-1 px-3 py-1 mt-2 text-lg rounded-lg"
      />
      <br />
      <button
        type="submit"
        className="bg-black px-5 rounded-lg py-2 mt-4 text-white">
        Submit
      </button>
      {card && (
        <div>
          <h1 className="text-xl mt-5 font-bold">Your Information:</h1>
          <p className="text-lg mt-3">
            name:
            <strong> {formik.values.fullname}</strong>
          </p>
          <p className="text-lg mt-1">
            Country:
            <strong> {formik.values.country}</strong>
          </p>
          <p className="text-lg mt-1">
            Favourite Color:
            <strong> {formik.values.color}</strong>
          </p>
        </div>
      )}
    </form>
  );
};

export default form;
