import { useEffect, useState } from "react";
import {
  IconEdit,
  IconLoader2,
  IconMapPin,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import AddressPopup from "./addAddress";

const AddressSection = () => {
  const [addresspopup, setaddresspopup] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editLoaderIndex, setEditLoaderIndex] = useState(null);
  const [deleteLoaderIndex, setDeleteLoaderIndex] = useState(null);
  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem("deliveryAddresses");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("deliveryAddresses", JSON.stringify(addresses));
  }, [addresses]);
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

      <div className="bg-[#fcfcfc] m-4 sm:m-10 px-4 sm:px-8 py-6 sm:py-8 rounded-lg border border-[#e0e0e0] shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="font-bold text-2xl sm:text-3xl">
              Delivery Addresses
            </h1>
            <p className="text-[#616161] text-sm sm:text-base tracking-[1.2px]">
              Manage your shipping addresses
            </p>
          </div>
          <div className="tracking-[1px] text-lg">
            <button
              onClick={() => {
                setEditIndex(null);
                setaddresspopup(true);
              }}
              className="mt-4 sm:mt-0 flex items-center gap-x-2 bg-purple-700 text-white cursor-pointer px-4 py-2 rounded-lg shadow">
              <IconPlus size={20} /> Add Address
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-y-5 mt-6">
          {addresses.length === 0 ? (
            <div className="flex flex-col mt-5 gap-y-2 items-center">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-purple-200">
                <IconMapPin size={30} color="#7e22ce" />
              </div>

              <h1 className="font-semibold text-xl text-center">
                No Address Saved
              </h1>
              <p className="text-[#616161]">
                Add a delivery address to proceed with your order.
              </p>
              <div className="tracking-[1px] text-lg">
                <button
                  onClick={() => {
                    setEditIndex(null);
                    setaddresspopup(true);
                  }}
                  className="mt-4 sm:mt-2 flex items-center gap-x-2 bg-purple-700 hover:bg-purple-700 text-white cursor-pointer px-8 py-2 rounded-lg shadow">
                  <IconPlus size={20} /> Add Address
                </button>
              </div>
            </div>
          ) : (
            addresses.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg px-5 py-4 bg-white hover:shadow-md transition">
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
                        setEditLoaderIndex(index);
                        setTimeout(() => {
                          setEditIndex(index);
                          setaddresspopup(true);
                          setEditLoaderIndex(null);
                        }, 2000);
                      }}
                      className="p-2 cursor-pointer border border-gray-300 rounded-lg hover:bg-gray-100">
                      {editLoaderIndex === index ? (
                        <IconLoader2 size={18} className="animate-spin" />
                      ) : (
                        <IconEdit size={18} />
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setDeleteLoaderIndex(index);
                        setTimeout(() => {
                          handleDelete(index);
                          setDeleteLoaderIndex(null);
                        }, 2000);
                      }}
                      className="p-2 cursor-pointer border border-gray-300 rounded-lg hover:bg-gray-100">
                      {deleteLoaderIndex === index ? (
                        <IconLoader2 size={18} className="animate-spin" />
                      ) : (
                        <IconTrash size={18} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="mt-3 text-gray-700">
                  <p className="text-sm sm:text-base">{item.address}</p>
                  <p className="text-sm sm:text-base">{item.phone}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressSection;
