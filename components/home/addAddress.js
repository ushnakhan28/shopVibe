import { useState } from "react";
import { IconX } from "@tabler/icons-react";

export default function AddressPopup({ addresspopup, setaddresspopup }) {
  const [type, setType] = useState("HOME");
  const [label, setLabel] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleSave = () => {
    const newAddress = {
      type,
      label,
      address,
      phone,
    };
    console.log("Saved Address:", newAddress);
    setaddresspopup(false); // close modal
  };

  if (!addresspopup) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-black/60 backdrop-blur-[1px]">
      <div className="absolute w-full h-full pointer-events-none"></div>
      <div className="flex flex-col border bg-white border-[#eeeeee] shadow-xl w-[300px] sm:w-[500px] px-5 py-6 rounded-xl relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h1 className="font-semibold text-xl">Add Address</h1>
          <IconX
            size={25}
            color="#9333ea"
            className="cursor-pointer"
            onClick={() => setaddresspopup(false)}
          />
        </div>
        <p className="text-[#616161] text-sm mb-4">
          Manage your shipping address.
        </p>

        {/* Type Selection */}
        <div className="flex gap-3 mb-4">
          {["HOME", "OFFICE", "OTHER"].map((option) => (
            <button
              key={option}
              className={`px-4 py-2 rounded-lg border ${
                type === option
                  ? "border-purple-500 bg-purple-50 text-purple-600"
                  : "border-gray-300 text-gray-600"
              }`}
              onClick={() => setType(option)}>
              {option}
            </button>
          ))}
        </div>

        {/* Label */}
        <label className="text-sm font-medium mb-1">Label</label>
        <input
          type="text"
          placeholder="Default, Billing, etc."
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:outline-purple-500"
        />

        {/* Full Address */}
        <label className="text-sm font-medium mb-1">Full Address</label>
        <input
          type="text"
          placeholder="Street, City, State, ZIP"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:outline-purple-500"
        />

        {/* Phone */}
        <label className="text-sm font-medium mb-1">Phone</label>
        <input
          type="text"
          placeholder="+1 555 000 0000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-purple-500"
        />

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="bg-purple-600 text-white px-5 py-2 rounded-lg self-end hover:bg-purple-700 transition">
          Save
        </button>
      </div>
    </div>
  );
}
