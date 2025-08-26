import { IconLoader2 } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useState } from "react";

const WithOutLogin = (signin) => {
  const [loader, setloader] = useState(false);
  const router = useRouter();

  const handlesignin = () => {
    setloader(true);
    setTimeout(() => {
      router.push("/form");
      setloader(false);
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-[90vh] px-4">
      <div className="lg:mt-25 mt-35 mb-3 flex flex-col justify-center items-center border border-[#adadad] rounded-xl shadow-lg w-full max-w-[600px] px-3 sm:px-10 py-10">
        <div className="flex flex-col justify-center items-center gap-y-5 text-center">
          <i className="text-4xl sm:text-5xl">{signin.icon}</i>
          <h1 className="font-bold text-xl sm:text-2xl">
            Sign In to View Your {signin.type}
          </h1>
          <p className="text-[#616161] text-sm sm:text-base">
            Create an account or sign in to save your favorite items and access
            them from any device.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 font-semibold w-full sm:w-auto">
            <button
              onClick={handlesignin}
              className="flex gap-x-2 justify-center items-center bg-[#9333EA] text-white rounded-xl px-4 py-2 w-full sm:w-[150px] hover:opacity-90 transition">
              {loader && <IconLoader2 className="animate-spin" size={20} />}
              Sign In
            </button>
            <button className="border border-[#adadad] rounded-xl px-4 py-2 w-full sm:w-[150px] hover:bg-gray-200 duration-200">
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithOutLogin;
