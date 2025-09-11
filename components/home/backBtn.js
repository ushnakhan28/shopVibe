import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";

const BackBtn = () => {
  return (
    <div className="relative lg:-top-28 -top-38">
      <Link
        href="/"
        className="lg:mt-15 mt-26 absolute top-4 text-white bg-purple-700 text-md px-3 py-1 rounded-xl hover:shadow-lg hover:scale-105 transition transform">
        <div className="flex items-center gap-x-2">
          <IconArrowLeft size={20} />{" "}
          <span className="hidden sm:block">Back to Home</span>
        </div>
      </Link>
    </div>
  );
};

export default BackBtn;
