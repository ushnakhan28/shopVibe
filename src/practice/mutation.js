import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const Add = () => {
  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [subject, setsubject] = useState("");
  const [message, setmessage] = useState("");
  const [error, seterror] = useState(false);
  const mutation = useMutation({
    mutationFn: (newPost) => {
      return axios.post("https://jsonplaceholder.typicode.com/posts", newPost);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullname || !email || !subject || !message) {
      seterror(true);
      return;
    }
    mutation.mutate(
      { fullname, email, subject, message },
      {
        onSuccess: () => {
          console.log(
            `This message sent by ${fullname} on subject "${subject}" and the message is "${message}"`
          );
          alert("Your message is submitted successfully!");
          seterror(false);
          setfullname("");
          setemail("");
          setsubject("");
          setmessage("");
        },
      }
    );
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="m-5">
        <h1 className="text-2xl font-bold">Fill the Form:</h1>
        <input
          type="text"
          value={fullname}
          onChange={(e) => setfullname(e.target.value)}
          placeholder="enter your full name"
          className={`border-1 border-black px-2 py-1 rounded-lg mt-4 pr-10 ${
            error && !fullname ? "border-red-500" : "border-black"
          }`}
        />
        <br />
        <input
          type="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          placeholder="enter your email"
          className={`border-1 border-black px-2 py-1 rounded-lg mt-4 pr-10 ${
            error && !email ? "border-red-500" : "border-black"
          }`}
        />
        <br />
        <input
          type="text"
          value={subject}
          onChange={(e) => setsubject(e.target.value)}
          placeholder="enter the subject"
          className={`border-1 border-black px-2 py-1 rounded-lg mt-4 pr-10 ${
            error && !subject ? "border-red-500" : "border-black"
          }`}
        />
        <br />
        <textarea
          value={message}
          placeholder="enter your feedback"
          onChange={(e) => setmessage(e.target.value)}
          className={`border-1 border-black px-2 py-1 rounded-lg mt-4 pr-15 ${
            error && !message ? "border-red-500" : "border-black"
          }`}
        />
      </div>
      <button
        type="submit"
        className="bg-black px-4 py-2 text-white rounded-lg mx-5 cursor-pointer">
        Send Message
      </button>
    </form>
  );
};

export default Add;
