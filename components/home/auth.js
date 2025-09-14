import React, { useEffect, useState } from "react";
import { IconLoader2, IconCheck, IconX } from "@tabler/icons-react";
import { QRCodeCanvas } from "qrcode.react";
import SixDigit from "./digit";
import FullWidthBtn from "./fullWidthBtn";

const AuthPopup = ({ authpopup, setauthpopup }) => {
  const [verify, setverify] = useState(false);
  const [selected, setSelected] = useState(null);
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);
  const [isMethodAdded, setIsMethodAdded] = useState(false);
  const [phone, setPhone] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    const savedMethod = localStorage.getItem("selectedMethod");
    if (savedMethod) {
      setSelected(savedMethod);
      setIsMethodAdded(true);
      setverify(false);
    } else {
      setSelected(null);
      setIsMethodAdded(false);
      setverify(false);
    }
  }, [authpopup]);
  const handleSendCode = () => {
    if (!phone) return alert("Enter phone number");
    setCodeSent(true);
    setTimer(30);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  if (!authpopup) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-black/60 backdrop-blur-[1px]">
      <div className="absolute w-full h-full pointer-events-none"></div>
      <div className="flex flex-col items-start border bg-white border-[#eeeeee] shadow-xl w-[300px] sm:w-[500px] px-5 py-6 rounded-lg">
        {!verify ? (
          <>
            <h1 className="font-bold text-2xl">Two-Factor Authentication</h1>
            <p className="text-sm text-[#616161] mt-2">
              Protect your account with an extra step at sign-in.
            </p>
            <p className="font-semibold mt-4">Choose a method:</p>
            <div className="mt-3 flex flex-col gap-y-2 w-full">
              {["Authentication App", "SMS"].map((option, index) => {
                const isDisabled = isMethodAdded && selected !== option;
                return (
                  <label
                    key={index}
                    onClick={() => {
                      if (isDisabled) return;
                      setSelected(option);
                      seterror(false);
                    }}
                    className={`px-3 py-2 rounded-lg flex items-center gap-x-2 border transition
                      ${
                        selected === option
                          ? "bg-purple-50 border-purple-700"
                          : "bg-white text-black border-gray-300 hover:border-purple-700"
                      }
                      ${
                        isDisabled
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}>
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center
                        ${
                          selected === option
                            ? "bg-white border-purple-700 border-2"
                            : "border-gray-400"
                        }`}>
                      {selected === option && (
                        <span className="w-2 h-2 rounded-full bg-purple-700"></span>
                      )}
                    </span>
                    {option}
                  </label>
                );
              })}

              {error && (
                <p className="text-red-500 text-sm">Please select a method</p>
              )}
            </div>
            <div className="sm:flex flex flex-col gap-y-2 gap-x-3 w-full mt-5">
              <button
                disabled={isMethodAdded}
                className={`flex items-center justify-center gap-x-2 cursor-pointer w-full rounded-lg px-4 py-2 
                  ${
                    isMethodAdded
                      ? "bg-purple-700 cursor-default"
                      : "bg-purple-700"
                  } text-white`}
                onClick={() => {
                  if (!selected) {
                    seterror(true);
                    return;
                  }
                  setloading(true);
                  setTimeout(() => {
                    setIsMethodAdded(true);
                    setverify(true);
                    setloading(false);
                  }, 2000);
                }}>
                {loading && <IconLoader2 className="animate-spin" size={20} />}
                {isMethodAdded && <IconCheck />}
                {isMethodAdded ? "Verified" : "Continue"}
              </button>

              <button
                className="w-full rounded-lg px-4 py-2 border border-gray-300 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setauthpopup(false);
                  setSelected(null);
                }}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <div className="w-full">
            <div className="flex justify-between">
              <h1 className="font-bold text-2xl">Two-Factor Authentication</h1>
              <IconX
                size={25}
                color="#7e22ce"
                className="cursor-pointer -mt-4 -mr-3"
                onClick={() => setauthpopup(false)}
              />
            </div>
            <p className="text-sm text-[#616161] mt-2">
              Protect your account with an extra step at sign-in.
            </p>

            {selected === "Authentication App" ? (
              <div>
                <p className="mt-3 text-[#000] text-sm">
                  Scan this QR code with your authenticator app and enter the
                  6-digit code.
                </p>
                <div className="flex justify-center mt-5">
                  <QRCodeCanvas
                    value="otpauth://totp/UshnaApp?secret=JBSWY3DPEHPK3PXP&issuer=MyEcommerce"
                    size={120}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-3 text-center">
                  Can’t scan? Enter this code manually:{" "}
                  <b className="text-[#505050]">JBSWY3DPEHPK3PXP</b>
                </p>
                <SixDigit setauthpopup={setauthpopup} selected={selected} />
              </div>
            ) : (
              <div className="w-full sm:w-[455px]">
                <form className="flex flex-col">
                  <label className="font-semibold text-[#adadad] mt-2">
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    placeholder="Enter your number"
                    className="border border-[#adadad] px-4 py-2 rounded-lg w-full mt-2 outline-purple-700"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <div className="text-sm">
                    {!codeSent ? (
                      <button
                        type="button"
                        onClick={handleSendCode}
                        className="w-[120px] hover:bg-[#a23fff] mt-2 py-2 rounded-lg bg-purple-700 text-white cursor-pointer">
                        Send Code
                      </button>
                    ) : timer > 0 ? (
                      <button
                        type="button"
                        disabled
                        className="w-[140px] mt-2 py-2 rounded-lg bg-gray-400 text-white cursor-not-allowed">
                        Resend in {timer}s
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSendCode}
                        className="w-[120px] hover:bg-[#a23fff] mt-2 py-2 rounded-lg bg-purple-700 text-white cursor-pointer">
                        Resend Code
                      </button>
                    )}
                  </div>
                </form>
                <div>
                  <SixDigit
                    setauthpopup={setauthpopup}
                    selected={selected}
                    isCodeSent={codeSent}
                    phoneNumber={phone}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPopup;
