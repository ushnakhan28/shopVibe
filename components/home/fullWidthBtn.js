import { IconLoader2 } from "@tabler/icons-react";

const FullWidthBtn = ({
  text,
  loading,
  onClick,
  icon,
  type = "submit",
  className = "",
}) => {
  return (
    <div className={`tracking-wide text-lg ${className}`}>
      <button
        type={type}
        onClick={onClick}
        className="flex gap-x-2 justify-center items-center cursor-pointer text-white w-full mt-4 px-4 py-2 rounded-lg bg-purple-700 disabled:opacity-70">
        {loading ? (
          <IconLoader2 className="animate-spin" size={22} />
        ) : (
          icon && icon
        )}
        {text}
      </button>
    </div>
  );
};

export default FullWidthBtn;
