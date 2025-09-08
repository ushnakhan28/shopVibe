import { useState } from "react";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import AddressPopup from "./addAddress";

const AddressSection = () => {
  const [addresspopup, setaddresspopup] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [addresses, setAddresses] = useState([
    {
      type: "HOME",
      label: "Default",
      address: "123 Main St, City, State 12345",
      phone: "+1 (555) 123-4567",
      badge: "Default",
    },
  ]);

  // Save new or edited address
  const handleSave = (newAddress) => {
    if (editIndex !== null) {
      const updated = [...addresses];
      updated[editIndex] = newAddress;
      setAddresses(updated);
      setEditIndex(null);
    } else {
      setAddresses([...addresses, newAddress]);
    }
    setaddresspopup(false);
  };

  // Delete address
  const handleDelete = (index) => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  return (
    <div>
      {addresspopup && (
        <AddressPopup
          addresspopup={addresspopup}
          setaddresspopup={setaddresspopup}
          onSave={handleSave}
          existingData={editIndex !== null ? addresses[editIndex] : null}
        />
      )}

      <div className="bg-[#fcfcfc] m-4 sm:m-10 px-4 sm:px-8 py-6 sm:py-8 rounded-xl border border-[#e0e0e0] shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="font-bold text-2xl sm:text-3xl">
              Delivery Addresses
            </h1>
            <p className="text-[#616161] text-sm sm:text-base tracking-[1.2px]">
              Manage your shipping addresses
            </p>
          </div>
          <button
            onClick={() => {
              setEditIndex(null);
              setaddresspopup(true);
            }}
            className="mt-4 sm:mt-0 flex items-center gap-x-2 bg-purple-600 hover:bg-purple-700 text-white font-medium cursor-pointer px-4 py-2 rounded-lg shadow">
            <span className="text-lg">+</span> Add Address
          </button>
        </div>

        <div className="flex flex-col gap-y-5 mt-6">
          {addresses.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl px-5 py-4 bg-white hover:shadow-md transition">
              <div className="flex flex-col sm:flex-row justify-between gap-y-3 sm:gap-y-0">
                <div className="flex items-center gap-x-3">
                  <span className="font-medium text-base sm:text-lg">
                    {item.type}
                  </span>
                  {item.label && (
                    <span className="text-xs bg-gray-100 text-gray-600 border border-gray-300 px-2 py-0.5 rounded-full">
                      {item.label}
                    </span>
                  )}
                </div>

                <div className="flex gap-x-2">
                  <button
                    onClick={() => {
                      setEditIndex(index);
                      setaddresspopup(true);
                    }}
                    className="p-2 cursor-pointer border border-gray-300 rounded-lg hover:bg-gray-100">
                    <IconEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="p-2 cursor-pointer border border-gray-300 rounded-lg hover:bg-gray-100">
                    <IconTrash size={18} />
                  </button>
                </div>
              </div>

              <div className="mt-3 text-gray-700">
                <p className="text-sm sm:text-base">{item.address}</p>
                <p className="text-sm sm:text-base">{item.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddressSection;
