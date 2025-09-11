import { useEffect, useState } from "react";
import Header from "../../components/home/header";
import Wishlist from "./wishlist";
import WithOutLogin from "../../components/home/withoutLogin";
import { IconHeart } from "@tabler/icons-react";

const HeaderWishlist = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setisLoggedIn(true);
    } else {
      setisLoggedIn(false);
    }
  }, []);
  return (
    <div>
      <Header />
      {isLoggedIn ? (
        <div>
          <Wishlist />
        </div>
      ) : (
        <div>
          <WithOutLogin
            icon={<IconHeart size={60} color="#7e22ce" />}
            type="Sign In to View Your Wishlist"
            para="Create an account or sign in to save your favorite items and access
            them from any device."
            btn1="Sign In"
            btn2="Create Account"
            btn1path="/loginForm"
            btn2path="/accountForm"
          />
        </div>
      )}
    </div>
  );
};

export default HeaderWishlist;
