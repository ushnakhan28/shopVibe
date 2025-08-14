import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

const movies = () => {
  const categoriesdata = [
    { content: "Drama" },
    { content: "Action" },
    { content: "Comedy" },
    { content: "Thriller" },
    { content: "Romance" },
  ];
  const [selectedshow, setselectedshow] = useState(null);
  const fetchData = async () => {
    const res = await fetch("https://api.tvmaze.com/shows");
    return res.json();
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories", selectedshow],
    queryFn: fetchData,
    enabled: !!selectedshow,
  });
  const filteredShows = selectedshow
    ? data?.filter((show) => show.genres.includes(selectedshow)) ///////////
    : [];

  return (
    <>
      <div>
        <Link href="/" className="text-center text-2xl block mt-5 underline">
          back
        </Link>
        <div className="mt-5">
          <p className="text-3xl text-center font-bold text-black">
            Pick a Show
          </p>
          <p className="text-lg text-center text-gray-500 mt-2">
            Comedy, romance, action — explore shows that match your mood.
          </p>
          <div className="flex justify-center mx-auto gap-8 mt-5">
            {categoriesdata.map((item, index) => (
              <button
                key={index}
                onClick={() => setselectedshow(item.content)}
                className={`px-5 py-2 border-2 border-black rounded-xl cursor-pointer ${
                  selectedshow === item.content
                    ? "bg-black text-white transition duration-[0.5s]"
                    : "bg-white text-black transition duration-[0.5s]"
                }`}>
                {item.content}
              </button>
            ))}
          </div>
        </div>
        <div>
          {isLoading && <p className="text-center mt-10">Loading...</p>}
          {error && <p>ERROR!!!</p>}

          <div className="grid md:grid-cols-3 gap-8 mt-10 justify-items-center">
            {filteredShows?.slice(0, 18).map((show) => (
              <div className="border-2 border-black px-8 py-5 w-[300px]">
                <img
                  className="h-40 mx-auto"
                  src={show.image?.medium}
                  alt={show.name}
                />
                <h1 className="text-[18px] font-bold mt-2">{show.name}</h1>
                <p className="text-lg mt-1">Language: {show.language}</p>
                <p className="text-md mt-1">
                  Rating: {show.rating?.average || "N/A"}
                </p>
                <button className="mt-3 px-5 py-2 bg-black rounded-xl cursor-pointer text-white">
                  view
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default movies;
