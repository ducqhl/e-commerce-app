import Annoucement from "../components/Annoucement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Newsletters from "../components/Newsletters";
import Products from "../components/Products";
import Slider from "../components/Slider";

const Home = () => {
  return (
    <div>
      <Annoucement />
      <NavBar />
      <Slider />
      <Categories />
      <Products />
      <Newsletters />
      <Footer />
    </div>
  );
};

export default Home;
