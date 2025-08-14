const Title = (item) => {
  return (
    <div className="mt-5 mx-3">
      <h1 className="text-center text-2xl md:text-4xl font-bold">
        {item.head}
      </h1>
      <p className="text-center text-sm md:text-lg mt-1 md:mt-5 text-[#797979]">
        {item.para}
      </p>
    </div>
  );
};

export default Title;
