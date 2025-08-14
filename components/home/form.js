import { useState } from "react";
import Btn from "./btn";
import { IconConfetti, IconSend } from "@tabler/icons-react";
import { useFormik } from "formik";

const Form = () => {
  const [click, setclick] = useState(false);
  const [para, setpara] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: () => {
      if (formik.values.email.trim() === "") {
        setpara(true);
        return;
      } else {
        setclick(true);
        setpara(false);
      }
    },
  });
  const handle = () => {
    setclick(false);
    formik.values.email = "";
  };
  return (
    <div>
      <center className="mt-8">
        {click ? (
          <div className="flex flex-col gap-y-2 justify-center items-center w-full md:w-6/12 mx-auto py-8 rounded-xl bg-[#ab5ff3]">
            <IconConfetti color="white" size={40} />
            <h1 className="text-white font-bold text-xl">Thank You!</h1>
            <p className="text-[#eeeeee] text-center px-3 md:px-0">
              You&apos;ve successfully subscribed to our newsletter.
            </p>
            <Btn click={handle} text="Unsubscribe" icon1={<IconSend />} />
          </div>
        ) : (
          <div>
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col md:flex-row justify-center gap-3 md:gap-x-5 px-4 md:px-0">
              <input
                type="email"
                className={`border-2 rounded-xl w-full md:w-96 px-3 py-2 outline-0 ${
                  para ? "border-red-400" : "border-[#bdbdbd]"
                }`}
                placeholder="Enter your email address"
                onChange={formik.handleChange}
                name="email"
                value={formik.values.email}
              />
              <Btn text="Subscribe" icon1={<IconSend />} />
            </form>
            <center>
              {para && (
                <p className="text-red-400 mt-3">Please enter your email</p>
              )}
            </center>
          </div>
        )}
      </center>
    </div>
  );
};

export default Form;
