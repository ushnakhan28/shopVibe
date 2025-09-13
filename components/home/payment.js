import { useEffect, useState } from "react";
import {
  IconCreditCard,
  IconEdit,
  IconLoader2,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import PaymentPopup from "./addPayment";

const PaymentMethods = () => {
  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem("paymentCards");
    return saved ? JSON.parse(saved) : [];
  });
  const [editLoaderIndex, setEditLoaderIndex] = useState(null);
  const [deleteLoaderIndex, setDeleteLoaderIndex] = useState(null);
  useEffect(() => {
    localStorage.setItem("paymentCards", JSON.stringify(cards));
  }, [cards]);
  const [paymentPopup, setPaymentPopup] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleSave = (newCard) => {
    if (editIndex !== null) {
      const updated = [...cards];
      updated[editIndex] = newCard;
      setCards(updated);
      setEditIndex(null);
    } else {
      setCards([...cards, newCard]);
    }
    setPaymentPopup(false);
  };

  const handleDelete = (index) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-[#fcfcfc] m-4 sm:m-10 px-4 sm:px-8 py-6 sm:py-8 rounded-lg border border-[#e0e0e0] shadow-sm">
      {paymentPopup && (
        <PaymentPopup
          paymentPopup={paymentPopup}
          setPaymentPopup={setPaymentPopup}
          onSave={handleSave}
          existingData={editIndex !== null ? cards[editIndex] : null}
        />
      )}

      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="font-bold text-2xl sm:text-3xl">Payment Methods</h1>
          <p className="text-[#616161] text-sm sm:text-base tracking-[1.2px]">
            Manage your payment options
          </p>
        </div>
        <button
          onClick={() => {
            setEditIndex(null);
            setPaymentPopup(true);
          }}
          className="flex justify-center items-center gap-x-2 cursor-pointer bg-purple-700 text-white px-4 py-2 rounded-lg font-medium">
          <IconPlus size={20} /> Add Card
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {cards.length === 0 ? (
          <div className="flex flex-col mt-10 gap-y-2 items-center">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-purple-200">
              <IconCreditCard size={30} color="#7e22ce" />
            </div>

            <h1 className="font-semibold text-xl text-center">
              No Cards Saved
            </h1>
            <p className="text-[#616161] text-center">
              Add a payment method to proceed with your order.
            </p>
            <button
              onClick={() => {
                setEditIndex(null);
                setPaymentPopup(true);
              }}
              className="mt-4 sm:mt-2 flex items-center gap-x-2 bg-purple-700 text-white font-medium cursor-pointer px-8 py-2 rounded-lg shadow">
              <IconPlus size={20} /> Add Card
            </button>
          </div>
        ) : (
          cards.map((card, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-200 rounded-lg px-5 py-4 bg-white hover:shadow-md transition">
              <div className="flex items-center gap-3">
                <IconCreditCard className="text-gray-600" />
                <div>
                  <h2 className="font-medium">
                    {card.type} ending in {card.last4}
                    {card.default && (
                      <span className="ml-2 bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                        Default
                      </span>
                    )}
                  </h2>
                  <p className="text-sm text-gray-500">Expires {card.expiry}</p>
                </div>
              </div>

              <div className="flex gap-x-2 mt-3 sm:mt-0">
                <button
                  onClick={() => {
                    setEditLoaderIndex(index);
                    setTimeout(() => {
                      setEditIndex(index);
                      setPaymentPopup(true);
                      setEditLoaderIndex(null);
                    }, 1000);
                  }}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100">
                  {editLoaderIndex === index ? (
                    <IconLoader2 size={18} className="animate-spin" />
                  ) : (
                    <IconEdit size={18} />
                  )}{" "}
                </button>
                <button
                  onClick={() => {
                    setDeleteLoaderIndex(index);
                    setTimeout(() => {
                      handleDelete(index);
                      setDeleteLoaderIndex(null);
                    }, 1000);
                  }}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100">
                  {deleteLoaderIndex === index ? (
                    <IconLoader2 size={18} className="animate-spin" />
                  ) : (
                    <IconTrash size={18} />
                  )}{" "}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PaymentMethods;
