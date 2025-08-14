import { useState } from "react";
import * as Yup from "yup";
const { useFormik } = require("formik");

const Form = () => {
  const [showcard, setshowcard] = useState(false);
  const [para, setpara] = useState(false);
  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      age: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Enter full name"),
      email: Yup.string()
        .required("Enter email address")
        .email("Enter valid email"),
      age: Yup.string().required("Enter your age"),
    }),
    onSubmit: () => {
      if (formik.values.age < 18) {
        setpara(true);
        setshowcard(false);
      } else {
        setpara(false);
        setshowcard(true);
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="m-8">
        <h1 className="text-3xl font-bold">Fill the Form:</h1>
        <input
          type="text"
          name="fullname"
          value={formik.values.fullname}
          placeholder="Full name"
          onChange={formik.handleChange}
          className="border-1 border-black w-full px-3 py-1 mt-5 text-lg rounded-lg"
        />
        <div className="h-[0px]">
          {formik.errors.fullname && (
            <p className="text-red-600 text-sm">{formik.errors.fullname}</p>
          )}
        </div>
        <br />
        <input
          type="text"
          name="email"
          value={formik.values.email}
          placeholder="Email"
          onChange={formik.handleChange}
          className="border-1 border-black w-full px-3 py-1 mt-5 text-lg rounded-lg"
        />{" "}
        <div className="h-[0px]">
          {formik.errors.email && (
            <p className="text-red-600 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>
        <br />
        <input
          type="number"
          name="age"
          value={formik.values.age}
          placeholder="Age"
          onChange={formik.handleChange}
          className="border-1 border-black w-full px-3 py-1 mt-5 text-lg rounded-lg"
        />{" "}
        <div className="h-[0px]">
          {para && (
            <p className="text-red-600 text-sm mt-1">You are under age</p>
          )}
          {formik.errors.age && (
            <p className="text-red-600 text-sm mt-1">{formik.errors.age}</p>
          )}
        </div>
        <br />
        <button
          type="submit"
          className="bg-black px-5 rounded-lg py-2 mt-5 text-white cursor-pointer">
          Submit
        </button>
      </form>
      {showcard && (
        <div className="bg-amber-200 rounded-lg px-8 py-10">
          <h1 className="text-xl mt-5 font-bold">Your Information:</h1>
          <p className="text-lg mt-3">
            Name: <strong>{formik.values.fullname}</strong>
          </p>
          <p className="text-lg mt-1">
            Email: <strong>{formik.values.email}</strong>
          </p>
          <p className="text-lg mt-1">
            Age: <strong>{formik.values.age}</strong>
          </p>
        </div>
      )}
    </>
  );
};

export default Form;
