import {
  IconArrowLeft,
  IconLoader2,
  IconLogout,
  IconShield,
} from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LogoutPopup = ({ setactiveTab }) => {
  const router = useRouter();
  const getInitials = (name) => {
    if (!name) return "";
    const words = name.trim().split(" ");
    if (words.length === 1) {
      return words[0][0].toUpperCase();
    }
    return words[0][0].toUpperCase() + words[1][0].toUpperCase();
  };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [initials, setInitials] = useState("");
  const [logoutLoading, setlogoutLoading] = useState(false);
  const [cancelLoading, setcancelLoading] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("email");

    if (storedName) {
      setUsername(storedName);
      setInitials(getInitials(storedName));
    }
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handlebtn = () => {
    setlogoutLoading(true);
    setTimeout(() => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("isCreated");
      localStorage.removeItem("userName");
      localStorage.removeItem("email");
      localStorage.setItem("isLoggedOut", "true");

      router.push("/");
      setlogoutLoading(false);
    }, 3000);
  };

  const handleCancel = () => {
    setcancelLoading(true);
    setTimeout(() => {
      setactiveTab("Profile Info");
      setcancelLoading(false);
    }, 3000);
  };
  return (
    <div className="mb-5 min-h-[75vh] mt-6 sm:mt-10 flex items-center justify-center px-2 sm:px-4">
      <div className="bg-white border-[#eeeeee] shadow-lg rounded-lg flex flex-col justify-center py-4 sm:py-6 px-4 sm:px-8 gap-y-3 sm:gap-y-4 w-full max-w-md">
        <div className="flex justify-center">
          <div className="bg-red-50 text-red-500 w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] flex items-center justify-center rounded-full">
            <IconLogout size={26} className="sm:size-[30px]" />
          </div>
        </div>

        <h1 className="text-lg sm:text-2xl font-semibold text-center">
          Confirm Signout
        </h1>
        <p className="text-[#adadad] text-center text-xs sm:text-base">
          Are you sure you want to sign out of your account?
        </p>

        <div className="flex flex-col gap-y-3 sm:gap-y-4 items-center">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-x-4 items-center sm:items-center border-[#adadad] rounded-lg w-full px-4 sm:px-5 border py-3 sm:h-20">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black flex items-center justify-center text-white font-semibold text-lg sm:text-xl rounded-full">
              {initials}
            </div>
            <div className="text-center sm:text-left">
              <p className="text-sm sm:text-base font-semibold">{username}</p>
              <p className="text-xs sm:text-base text-[#616161]">{email}</p>
            </div>
          </div>

          <div className="flex gap-x-3 sm:gap-x-4 items-center border-[#adadad] rounded-lg w-full px-4 sm:px-5 border py-2 sm:py-3">
            <div className="flex-shrink-0">
              <IconShield size={24} className="sm:size-[28px] text-green-600" />
            </div>
            <p className="text-[#616161] text-xs sm:text-[15px] leading-snug sm:leading-relaxed">
              You will need to sign in again to access your account and continue
              shopping.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2">
          <button
            onClick={handleCancel}
            className="px-4 sm:px-6 py-2 flex gap-x-2 w-full cursor-pointer justify-center items-center border border-gray-200 rounded-lg hover:bg-gray-100 duration-300 text-sm sm:text-base">
            {cancelLoading ? (
              <IconLoader2 className="animate-spin" size={20} />
            ) : (
              <IconArrowLeft size={18} className="sm:size-[20px]" />
            )}
            Cancel
          </button>
          <button
            onClick={handlebtn}
            className="px-4 sm:px-6 py-2 flex gap-x-2 w-full cursor-pointer justify-center items-center bg-red-600 text-white rounded-lg hover:bg-red-700 duration-300 text-sm sm:text-base">
            {logoutLoading ? (
              <IconLoader2 className="animate-spin" size={20} />
            ) : (
              <IconLogout size={18} className="sm:size-[20px]" />
            )}
            Signout
          </button>
        </div>

        <p className="text-[10px] sm:text-xs text-center text-[#adadad] mt-1 sm:mt-2">
          Your data will remain secure and available when you return.
        </p>
      </div>
    </div>
  );
};

export default LogoutPopup;
