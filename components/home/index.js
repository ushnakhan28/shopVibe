"use client";

import { motion } from "framer-motion";
import Banner from "../../components/home/banner";
import Category from "../../components/home/category";
import Services from "../../components/home/services";
import Header from "../../components/home/header";
import Footer from "./footer";
import Product from "./product";
import NewsLetter from "./newsLetter";

const fadeUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 1 },
  viewport: { once: true },
};

const Home = () => {
  return (
    <div>
      <Header />
      <Banner />

      <motion.div {...fadeUp}>
        <Category />
      </motion.div>

      <motion.div {...fadeUp}>
        <Product />
      </motion.div>

      <motion.div {...fadeUp}>
        <Services />
      </motion.div>

      <motion.div {...fadeUp}>
        <NewsLetter />
      </motion.div>

      <motion.div {...fadeUp}>
        <Footer />
      </motion.div>
    </div>
  );
};

export default Home;
