import {
  IconCalendarWeek,
  IconConfetti,
  IconMail,
  IconRocket,
  IconTag,
} from "@tabler/icons-react";
import Form from "./form";

const Newsletter = () => {
  const data = [
    {
      icon: <IconCalendarWeek color="#eeeeee" />,
      text: "Weekly Updates",
    },
    {
      icon: <IconTag color="#eeeeee" />,
      text: "Exclusive Deals",
    },
    {
      icon: <IconRocket color="#eeeeee" />,
      text: "New Arrivals",
    },
  ];
  return (
    <div className="bg-purple-700 mt-20 py-15 px-5 md:px-0" id="newsletter">
      <center>
        <IconMail color="white" size={55} />
      </center>
      <h1 className="mt-4 font-bold text-2xl md:text-3xl text-center text-white">
        Stay Updated!
      </h1>
      <p className="text-center text-white text-base md:text-xl mt-4">
        Get the latest deals and offers directly in your inbox
      </p>
      <p className="text-center text-[#eeeeee] text-sm md:text-base mt-4">
        Subscribe to our newsletter and never miss out on amazing discounts
      </p>
      <Form />
      <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-x-15 mt-10 items-center">
        {data.map((item, index) => (
          <div key={index} className="flex gap-x-2 items-center">
            <i>{item.icon}</i>
            <p className="text-[#eeeeee] text-sm md:text-base">
              {item.text}
            </p>{" "}
          </div>
        ))}
      </div>
      <p className="text-sm text-[#eeeeee] text-center mt-8">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
};
export default Newsletter;
