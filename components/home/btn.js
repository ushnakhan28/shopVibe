const Btn = (button) => {
  return (
    <div>
      <button
        onClick={button.click}
        type="submit"
        className="bg-white px-3 py-2 flex gap-x-2 rounded-xl text cursor-pointer hover:bg-[#e9e9e9]">
        <i className="text">{button.icon1}</i> {button.text}
        <i className="text">{button.icon2}</i>
      </button>
    </div>
  );
};

export default Btn;
