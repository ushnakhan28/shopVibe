// import { Badge } from "@mantine/core";
// import { IconAdjustmentsHorizontal } from "@tabler/icons-react";

// const Filters = () => {
//   const data = [
//     "Under $25",
//     "$25 - $50",
//     "$50 - $100",
//     "$100 - $200",
//     "Over $200",
//   ];
//   return (
//     <div className="flex flex-wrap md:flex-nowrap mx-4 sm:mx-10 md:mx-23 border border-b-[#c9c9c9] py-3 border-l-0 border-r-0 border-t-[#c9c9c9] mt-4 md:mt-8 gap-x-4 md:gap-x-10 items-center">
//       {/* Left section */}
//       <div className="flex gap-x-2 md:gap-x-3 items-center mb-2 md:mb-0">
//         <IconAdjustmentsHorizontal size={20} color="#aaaaaa" />
//         <h1 className="font-semibold text-sm md:text-base text-[#747474]">
//           Filters:
//         </h1>
//       </div>

//       {/* Right section */}
//       <div className="flex flex-wrap gap-y-2 gap-x-3 md:gap-x-5 items-center">
//         <h1 className="text-sm md:text-base text-[#747474]">Price:</h1>

//         <div className="flex flex-wrap gap-y-2 gap-x-2 md:gap-x-3 items-center">
//           {data?.map((item, index) => (
//             <div
//               key={index}
//               className="border border-[#747474] px-2 md:px-3 py-[1px] rounded-xl bg-[#f0f0f0] cursor-pointer">
//               <span className="text-xs md:text-sm">{item}</span>
//             </div>
//           ))}

//           <Badge
//             color="#7C3AED"
//             variant="light"
//             radius="xl"
//             size="md"
//             className="ml-0 md:ml-5">
//             8 products found
//           </Badge>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Filters;
