import AboutUs from '@/components/AboutUs'
import Blog from '@/components/Blog'
import CategoriesSection from '@/components/Categories'
import ChooseYourCareer from '@/components/ChooseYourCareer'
import Course from '@/components/Course' 
import Home from '@/components/Home'
import Instructor from '@/components/Instructor'
import Layout from '@/components/Layout'
import Newsletter from '@/components/Newsletter'
import Testimonial from '@/components/Testimonial'
import WhyChooseUs from '@/components/WhyChooseUs' 

const Page = () => {
  return (
    <Layout>
      <Home />
      <CategoriesSection />
      <Course />
      <AboutUs />
      {/* <EnrollNow /> */}
      <WhyChooseUs />
      <Testimonial />
      <Instructor />
      <ChooseYourCareer />
      <Blog />
      <Newsletter />
    </Layout>
  )
}

export default Page
