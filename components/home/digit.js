// import { IconCheck, IconLoader2 } from "@tabler/icons-react";
// import { useState } from "react";
// import toast from "react-hot-toast";

// const SixDigit = ({ setauthpopup, selected }) => {
//   const [code, setCode] = useState(["", "", "", "", "", ""]);
//   const [error, setError] = useState("");
//   const [loading, setloading] = useState(false);

//   const handleChange = (value, index) => {
//     if (/^[0-9]?$/.test(value)) {
//       const newCode = [...code];
//       newCode[index] = value;
//       setCode(newCode);

//       if (value && index < 5) {
//         document.getElementById(`otp-${index + 1}`).focus();
//       }
//     }
//   };

//   const handleVerify = () => {
//     if (code.some((digit) => digit === "")) {
//       setError("Please enter all 6 digits");
//     } else {
//       setloading(true);
//       setTimeout(() => {
//         setError("");
//         setloading(false);
//         setauthpopup(false);
//         toast.success("Two-Factor Authentication Verified 🎉", {
//           icon: <IconCheck size={40} color="white" />,
//         });
//         if (selected === "SMS") {
//           localStorage.setItem("selectedMethod", "SMS");
//         } else {
//           localStorage.setItem("selectedMethod", "Authentication App");
//         }
//       }, 1500);
//     }
//   };

//   return (
//     <div>
//       <h1 className="font-semibold mt-4 text-[#adadad]">Enter 6-digit code</h1>
//       <div className="mt-2 flex">
//         {code.map((digit, index) => (
//           <input
//             key={index}
//             id={`otp-${index}`}
//             type="text"
//             maxLength="1"
//             value={digit}
//             onChange={(e) => handleChange(e.target.value, index)}
//             className={`w-12 h-12 text-center font-semibold text-lg outline-none border
//               ${index === 0 ? "rounded-tl-xl rounded-bl-xl" : ""}
//               ${index === 5 ? "rounded-tr-xl rounded-br-xl" : ""}
//               border-gray-300 focus:border-[#9333ea] focus:text-[#9333ea]`}
//           />
//         ))}
//       </div>

//       {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

//       <div className="text-lg">
//         <button
//           className="flex items-center justify-center gap-x-3 py-2 rounded-xl bg-[#9333ea] text-white w-full mt-3 cursor-pointer hover:bg-[#a23fff]"
//           onClick={handleVerify}>
//           {loading && <IconLoader2 className="animate-spin" size={20} />} Verify
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SixDigit;

// SixDigit.jsx
import { IconCheck, IconLoader2 } from "@tabler/icons-react";
import { useState } from "react";
import toast from "react-hot-toast";

const SixDigit = ({ setauthpopup, selected, isCodeSent, phoneNumber }) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleVerify = () => {
    if (!isCodeSent || !phoneNumber) {
      setError("Please send code to your phone first");
      return;
    }
    if (code.some((digit) => digit === "")) {
      setError("Please enter all 6 digits");
      return;
    }

    setloading(true);
    setTimeout(() => {
      setError("");
      setloading(false);
      setauthpopup(false);
      toast.success("Two-Factor Authentication Verified 🎉", {
        icon: <IconCheck size={40} color="white" />,
      });
      if (selected === "SMS") {
        localStorage.setItem("selectedMethod", "SMS");
      } else {
        localStorage.setItem("selectedMethod", "Authentication App");
      }
    }, 1500);
  };

  return (
    <div>
      <h1 className="font-semibold mt-4 text-[#adadad]">Enter 6-digit code</h1>
      <div className="mt-2 flex">
        {code.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            className={`w-12 h-12 text-center font-semibold text-lg outline-none border 
              ${index === 0 ? "rounded-tl-xl rounded-bl-xl" : ""} 
              ${index === 5 ? "rounded-tr-xl rounded-br-xl" : ""} 
              border-gray-300 focus:border-[#9333ea] focus:text-[#9333ea]`}
          />
        ))}
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <div className="text-lg">
        <button
          className="flex items-center justify-center gap-x-3 py-2 rounded-xl bg-[#9333ea] text-white w-full mt-3 cursor-pointer hover:bg-[#a23fff]"
          onClick={handleVerify}>
          {loading && <IconLoader2 className="animate-spin" size={20} />} Verify
        </button>
      </div>
    </div>
  );
};

export default SixDigit;
