// components/Settings.jsx

import { IconSettings, IconTrash } from "@tabler/icons-react";
import React, { useState, useEffect } from "react";
import DeletePopup from "./delete";
import AuthPopup from "./auth";
import PasswordPopup from "./password";

const Settings = () => {
  const [deletepopup, setdeletepopup] = useState(false);
  const [authpopup, setauthpopup] = useState(false);
  const [passPopup, setpassPopup] = useState(false);
  // Settings state (email, sms, marketing)
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("settings");
    return saved
      ? JSON.parse(saved)
      : { email: false, sms: false, marketing: false };
  });

  // localStorage se saved settings load karna
  useEffect(() => {
    const savedSettings = localStorage.getItem("settings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // jab bhi settings change ho to localStorage update karna
  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  // toggle function
  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="mb-5">
      {/* Account Settings */}
      <div className="bg-[#fcfcfc] m-4 sm:m-10 px-4 sm:px-8 py-6 sm:py-8 rounded-xl border border-[#e0e0e0] shadow-sm">
        <h1 className="font-bold text-2xl sm:text-3xl">Account Settings</h1>
        <p className="text-[#616161] text-sm sm:text-base tracking-[1.2px]">
          Configure your account preferences
        </p>

        {/* Email Notifications */}
        <div className="flex justify-between items-center border-b border-[#adadad] py-5">
          <div>
            <h1 className="text-lg font-semibold">Email Notifications</h1>
            <p className="text-sm text-gray-600">
              Receive updates about orders and promotions
            </p>
          </div>
          <button
            onClick={() => handleToggle("email")}
            className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ${
              settings.email ? "bg-[#7D2AE8]" : "bg-gray-300"
            }`}>
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                settings.email ? "translate-x-6" : "translate-x-0"
              }`}></div>
          </button>
        </div>

        {/* SMS Notifications */}
        <div className="flex justify-between items-center border-b border-[#adadad] py-5">
          <div>
            <h1 className="text-lg font-semibold">SMS Notifications</h1>
            <p className="text-sm text-gray-600">
              Get text updates about your orders
            </p>
          </div>
          <button
            onClick={() => handleToggle("sms")}
            className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ${
              settings.sms ? "bg-[#7D2AE8]" : "bg-gray-300"
            }`}>
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                settings.sms ? "translate-x-6" : "translate-x-0"
              }`}></div>
          </button>
        </div>

        {/* Marketing Emails */}
        <div className="flex justify-between items-center pt-5">
          <div>
            <h1 className="text-lg font-semibold">Marketing Emails</h1>
            <p className="text-sm text-gray-600">
              Receive promotional offers and deals
            </p>
          </div>
          <button
            onClick={() => handleToggle("marketing")}
            className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ${
              settings.marketing ? "bg-[#7D2AE8]" : "bg-gray-300"
            }`}>
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                settings.marketing ? "translate-x-6" : "translate-x-0"
              }`}></div>
          </button>
        </div>
      </div>

      {/* Security */}
      <div className="bg-[#fcfcfc] mt-8 m-4 sm:m-10 px-4 sm:px-8 py-6 sm:py-8 rounded-xl border border-[#e0e0e0] shadow-sm">
        <h1 className="font-bold text-2xl sm:text-3xl">Security</h1>
        <p className="text-[#616161] text-sm sm:text-base tracking-[1.2px]">
          Manage your account security
        </p>

        <div className="mt-5 flex flex-col gap-y-3">
          <div
            onClick={() => setpassPopup(true)}
            className="flex gap-x-3 items-center border border-[#adadad] hover:bg-gray-100 cursor-pointer rounded-xl px-3 py-2">
            <IconSettings size={20} color="#7e22ce" />
            <span>Change Password</span>
          </div>
          <div
            onClick={() => setauthpopup(true)}
            className="flex gap-x-3 items-center border border-[#adadad] hover:bg-gray-100 cursor-pointer rounded-xl px-3 py-2">
            <IconSettings size={20} color="#7e22ce" />
            <span>Two-Factor Authentication</span>
          </div>
          <div
            onClick={() => setdeletepopup(true)}
            className="flex gap-x-3 items-center border border-[#adadad] hover:bg-gray-100 cursor-pointer rounded-xl px-3 py-2">
            <IconTrash size={20} color="#ff3939" />
            <span>Delete Account</span>
          </div>
        </div>
      </div>

      <DeletePopup deletepopup={deletepopup} setdeletepopup={setdeletepopup} />
      <AuthPopup authpopup={authpopup} setauthpopup={setauthpopup} />
      <PasswordPopup passPopup={passPopup} setpassPopup={setpassPopup} />
    </div>
  );
};

export default Settings;
