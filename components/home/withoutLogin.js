import { IconLoader2 } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useState } from "react";

const WithOutLogin = (signin) => {
  const [loader1, setloader1] = useState(false);
  const [loader2, setloader2] = useState(false);
  const router = useRouter();

  const handlesignin = (path) => {
    setloader1(true);
    setTimeout(() => {
      router.push(path);
      setloader1(false);
    }, 2000);
  };
  const handlelogout = (path) => {
    setloader2(true);
    setTimeout(() => {
      router.push(path);
      setloader2(false);
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-[90vh] px-4">
      <div className="lg:mt-25 mt-35 mb-3 flex flex-col justify-center items-center border border-[#adadad] rounded-xl shadow-lg w-full max-w-[600px] px-3 sm:px-10 py-10">
        <div className="flex flex-col justify-center items-center gap-y-5 text-center">
          <i className="text-4xl sm:text-5xl">{signin.icon}</i>
          <h1 className="font-bold text-xl sm:text-2xl">{signin.type}</h1>
          <p className="text-[#616161] text-sm sm:text-base">{signin.para}</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 font-semibold w-full sm:w-auto">
            <button
              onClick={() => handlesignin(signin.btn1path)}
              className="cursor-pointer flex gap-x-2 justify-center items-center bg-[#9333EA] text-white rounded-xl px-4 py-2 w-full sm:w-[200px] hover:opacity-90 transition">
              {loader1 && <IconLoader2 className="animate-spin" size={20} />}
              {signin.btn1}
            </button>
            <button
              onClick={() => handlelogout(signin.btn2path)}
              className="cursor-pointer flex gap-x-2 justify-center items-center border border-[#adadad] rounded-xl px-4 py-2 w-full sm:w-[200px] hover:bg-gray-200 duration-200">
              {loader2 && <IconLoader2 className="animate-spin" size={20} />}
              {signin.btn2}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithOutLogin;
