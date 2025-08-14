import Banner from "../../components/home/banner";
import Category from "../../components/home/category";
import Services from "../../components/home/services";
import Header from "../../components/home/header";
import Footer from "./footer";
import Product from "./product";
import NewsLetter from "./newsLetter";
const Home = () => {
  return (
    <div>
      <Header />
      <Banner />
      <Category />
      <Product />
      <Services />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Home;
