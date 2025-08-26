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
            icon={<IconHeart size={60} color="#9333EA" />}
            type="WishList"
          />
        </div>
      )}
    </div>
  );
};

export default HeaderWishlist;
