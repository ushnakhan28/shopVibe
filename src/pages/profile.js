import { IconLoader2, IconUser } from "@tabler/icons-react";
import BackBtn from "../../components/home/backBtn";
import Header from "../../components/home/header";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter();
  const [isLoggedOut, setisLoggedOut] = useState(false);
  const [loading, setloading] = useState(false);
  const [popup, setpopup] = useState(false);

  useEffect(() => {
    const loggedOut = localStorage.getItem("isLoggedOut");
    if (loggedOut === "true") {
      setisLoggedOut(true);
    }
  }, []);

  const handlebtn = () => {
    setloading(true);
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "false");
      localStorage.setItem("isLoggedOut", "true");
      setisLoggedOut(true);
      router.push("/");
      setloading(false);
      setpopup(false);
    }, 3000);
  };

  return (
    <div>
      <Header />
      <section className="mt-40 lg:mt-30 lg:mx-9 md:mx-4 sm:mx-5 mx-4">
        <div className="flex flex-col gap-y-6 text-lg">
          <BackBtn />
          <h1 className="flex gap-x-3 text-2xl font-bold items-center">
            <IconUser color="#9333EA" /> My Profile
          </h1>
          <button
            onClick={() => setpopup(true)}
            className="flex gap-x-2 justify-center items-center cursor-pointer text-white px-4 py-2 text-sm rounded-lg bg-[#7D2AE8] hover:bg-[#8b32ff] duration-200">
            Logout
          </button>
        </div>
      </section>
      {popup && (
        <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-black/30 backdrop-blur-[1px]">
          <div className="absolute w-full h-full  pointer-events-none"></div>
          <div className="flex flex-col justify-center items-center border bg-white border-[#eeeeee] shadow-xl w-[350px] py-6 rounded-xl">
            <div>
              <h1 className="text-lg font-semibold">
                Are you sure you want a logout?
              </h1>
            </div>
            <div className="flex gap-x-5 mt-4">
              <p
                onClick={handlebtn}
                className="tracking-wider flex items-center gap-x-2 cursor-pointer bg-[#319464] text-white w-[100px] justify-center rounded-xl font-semibold py-2">
                {loading && <IconLoader2 className="animate-spin" size={20} />}
                Yes
              </p>
              <p
                onClick={() => setpopup(false)}
                className="tracking-wider cursor-pointer bg-[#ff3939] text-white px-10 rounded-xl font-semibold py-2">
                No
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
