import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconMail,
  IconPhone,
} from "@tabler/icons-react";

const Footer = () => {
  const data = ["About Us", "Contact", "Privacy Policy", "Terms of Service"];
  const icons = [
    <IconBrandFacebook size={28} />,
    <IconBrandTwitter size={28} />,
    <IconBrandInstagram size={28} />,
  ];
  return (
    <div className="px-6 py-12 bg-[#0B1120]">
      <div className="flex flex-col md:flex-row md:justify-between gap-10">
        <div className="flex flex-col gap-y-3 md:w-[30%]">
          <h1 className="font-bold text-3xl text-white">ShopVibe</h1>
          <p className="text-[#adadad]">
            Your trusted online shopping destination. Quality products, great
            prices, and excellent customer service.
          </p>
          <div className="flex gap-x-5">
            {icons.map((icon, index) => (
              <div
                key={index}
                className="cursor-pointer text-[#adadad] hover:text-[#fff] hover:scale-110 duration-[0.3s]">
                {icon}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-y-3 text-center md:text-left md:mr-20">
          <h1 className="text-2xl text-white">Quick Links</h1>
          {data.map((para, index) => (
            <div key={index}>
              <p className="text-[#adadad] cursor-pointer hover:text-[#fff] duration-[0.3s]">
                {para}
              </p>
            </div>
          ))}
        </div>

        <div className="gap-y-3 flex flex-col md:w-[20%]">
          <h1 className="text-2xl text-white">Contact Us</h1>
          <p className="text-[#adadad] flex gap-x-2 items-center">
            <IconMail /> support@shopvibe.com
          </p>
          <p className="text-[#adadad] flex gap-x-2 items-center">
            <IconPhone /> +1 (555) 123-4567
          </p>
        </div>
      </div>

      <div className="mt-10 text-center">
        <div className="bg-[#adadad] w-full h-[1px]"></div>
        <p className="mt-8 text-[#adadad] text-sm">
          © 2024 ShopVibe. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
