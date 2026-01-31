import AboutUs from "./AboutUs";
import Categories from "./Categories";
import Course from "./Course";
import EnrollNow from "./EnrollNow";
import Home from "./Home";
import Testimonial from "./Testimonial";
import WhyChooseUs from "./WhyChooseUs";

const Hero = () => {
  return (
   <>
    <Home />
    <Categories />
    <Course />
    <AboutUs />
    {/* <EnrollNow /> */}
    <WhyChooseUs />
    <Testimonial />
   </>
  );
};

export default Hero;
