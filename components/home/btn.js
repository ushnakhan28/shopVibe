const Btn = (button) => {
  return (
    <div className="font-semibold">
      <button
        onClick={button.click}
        type="submit"
        className="bg-white px-3 py-2 flex gap-x-2 rounded-lg text-purple-700 cursor-pointer hover:bg-[#e9e9e9]">
        <i className="text-purple-700">{button.icon1}</i> {button.text}
        <i className="text-purple-700">{button.icon2}</i>
      </button>
    </div>
  );
};

export default Btn;
