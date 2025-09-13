import {
  IconAward,
  IconClock,
  IconCrown,
  IconHeadphones,
  IconReload,
  IconShieldCheck,
  IconTag,
  IconTruck,
} from "@tabler/icons-react";
import Title from "./title";
import React from "react";
import AppBadge from "./badge";
const Services = () => {
  const data = [
    {
      icon: <IconTruck size={30} />,
      iconName: "Free Delivery",
      desc: "Free shipping on orders over $50",
      textColor: "text-[#3B82F6]",
      bgColor: "bg-[#DBEAFE]",
    },
    {
      icon: <IconShieldCheck size={30} />,
      iconName: "Secure Payment",
      desc: "100% secure payment processing",
      textColor: "text-[#10B981]",
      bgColor: "bg-[#D1FAE5]",
    },
    {
      icon: <IconReload size={30} />,
      iconName: "Easy Returns",
      desc: "30-day hassle-free returns",
      textColor: "text-[#8B5CF6]",
      bgColor: "bg-[#EDE9FE]",
    },
    {
      icon: <IconHeadphones size={30} />,
      iconName: "24/7 Support",
      desc: "Round-the-clock customer care",
      textColor: "text-[#F97316]",
      bgColor: "bg-[#FFEDD5]",
    },
    {
      icon: <IconClock size={30} />,
      iconName: "Fast Processing",
      desc: "Orders processed within 24 hours",
      textColor: "text-[#EF4444]",
      bgColor: "bg-[#FEE2E2]",
    },
    {
      icon: <IconAward size={30} />,
      iconName: "Quality Guarantee",
      desc: "Premium quality products only",
      textColor: "text-[#F59E0B]",
      bgColor: "bg-[#FEF9C3]",
    },
    {
      icon: <IconTag size={30} />,
      iconName: "Exclusive Discounts",
      desc: "Special offers and member-only deals",
      textColor: "text-[#06B6D4]",
      bgColor: "bg-[#CFFAFE]",
    },
  ];
  return (
    <div id="services" className="pt-1">
      <AppBadge
        text="Premium Service Experience"
        icon={<IconCrown size={18} />}
      />
      <Title
        head="Why Choose Us?"
        para="We provide exceptional service and quality that you can trust"
      />
      <div>
        <div className="flex flex-wrap justify-center gap-14 md:mx-32 mx-10 md:mt-20 mt-10">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center gap-y-3 hover:scale-110 duration-[0.3s] group w-[200px]">
              <div
                className={`p-4 rounded-lg ${item.bgColor} group-hover:animate-bounce`}>
                <i className={`text-3xl ${item.textColor}`}>{item.icon}</i>
              </div>
              <h1 className="font-bold text-xl group-hover:text-purple-700 duration-[0.3s]">
                {item.iconName}
              </h1>
              <p className="text-[#797979]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
