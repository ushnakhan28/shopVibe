import { IconShoppingCart } from "@tabler/icons-react";
import BackBtn from "../../components/home/backBtn";
import Header from "../../components/home/header";

const AddToCart = () => {
  return (
    <div>
      <Header />
      <section className="mt-40 lg:mt-30 lg:mx-9 md:mx-4 sm:mx-5 mx-4">
        <div className="flex flex-col gap-y-6">
          <BackBtn />
          <h1 className="flex gap-x-3 text-2xl font-bold items-center">
            <IconShoppingCart color="#9333EA" /> Add To Cart
          </h1>
        </div>
      </section>
    </div>
  );
};

export default AddToCart;
