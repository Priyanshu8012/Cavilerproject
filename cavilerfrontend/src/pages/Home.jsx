import React from "react";
// import BestSellingProducts from "../components/BestSellingProducts"
import Carousel from "../components/Carousel"
import ExploreOfferings from "../components/ExploreOfferings"
// import FreeDemoSection from "../components/FreeDemoSection"
// import HelpSection from "../components/HelpSection"
import ImpactSection from "../components/ImpactSection"
import InspiringStories from "../components/InspiringStories"
import NewAtCavalier from "../components/NewOnVidyarjan"
import PopularCourses from "../components/PopularCourses"
import TeachersSection from "../components/TeachersSection"
// import Testimonials from "../components/Testimonials"
// import ExploreCourses from "./ExploreCourses"
import Course from "../pages/Course";
import WhyChooseUs from "./why"
import Test from "./Test"
import Our from "./OurToper"
// import CourseList from "../components/CourseList"

const Home = () => {
  return (
    <div>
        <Carousel/>
        <PopularCourses/>
     {/* <ExploreCourses/>*/}   
        <Course/>
        {/* <FreeDemoSection/> */}
        {/* <CourseList/> */}
        <NewAtCavalier/>
        {/* <ExploreOfferings/> */}
        {/* <BestSellingProducts/>*/}
        <Test/>
        
        
        <InspiringStories/>
        <TeachersSection/>
        {/** <Testimonials/> */}
       
        <Our/>
        <ImpactSection/>
       {/* <HelpSection/>*/ } 
        <WhyChooseUs/>
    </div>
  )
}

export default Home
