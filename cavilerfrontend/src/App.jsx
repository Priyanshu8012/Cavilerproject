import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import OurFreeServives from "../src/components/OurFreeServives";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Exams from "./pages/Exams";
import Teachers from "./pages/Teachers";
import Gallery from "./pages/Gallery";
// import Aboutus from "./pages/Aboutus";
import Jee from "./pages/courses/Jee";
import Neet from "./pages/courses/Neet";
import Offline from "./pages/courses/Offline";
import Olympiad from "./pages/courses/Olympiad";
import Earlylearning from "./pages/courses/Earlylearning";
import Onetoone from "./pages/courses/Onetoone";
import Footer from "./components/Footer";
import StudyMaterial from "./components/StudyMaterial";
import VidyarjanStore from "./pages/VidyarjanStore";
import Benefits from "./pages/Benefits";
import ContactUs from "./pages/ContactUs";
import ComputerScience from "./pages/ComputerScience";
import EngineeringBlogs from "./pages/EngineeringBlogs";
import FindCourse from "./pages/FindCourse";
import VidyarjanBlog from "./pages/VidyarjanBlog";
import ChildSafety from "./pages/ChildSafety";
import OurResults from "./pages/OurResults";
import HelpIndiaLearn from "./pages/HelpIndiaLearn";
import EnglishSuperstar from "./pages/EnglishSuperstar";
import WhyVidyarjan from "./pages/WhyVidyarjan";
import AboutUs from "./pages/About";
import Resources from "./pages/Resources";
import CourseList from "./components/CourseList";
import AuthPage from "./pages/AuthPage"
import OurOfferingsEbook from "./pages/OurOfferingsEbook";
// import AllCourses from "./components/AllCourses";
import EnrolForm from "./components/EnrolForm";
import TeachingWithUs from "./components/TeachingWithUs";
import TeacherJobForm from "./components/TeacherJobForm";
//Admin import
import Login from "../src/admin/Component/Login";
import Dashboard from "../src/admin/Component/Dashboard";
import Site from "../src/admin/pages/Site-Custom";

import Banner from "../src/admin/pages/Banner"
import PopularCourses from "../src/admin/pages/Popular";
import ExploreCourses from "../src/admin/pages/Explore";
import BookFreeDemo from "../src/admin/pages/Book";
import NewOnVidyarjan from "../src/admin/pages/New";
import BestSellingProducts from "../src/admin/pages/Best";
import OurStudents from "../src/admin/pages/Story";
import StoriesThatInspire from "../src/admin/pages/Inspire";
import Live from "../src/admin/pages/Live";
import CourseUpdate from "../src/admin/pages/CourseUpdate";
import AssignmentsPage from "../src/admin/pages/Assigment";
import AnnouncementPage from "../src/admin/pages/AnnouncementPage";
import Setting from "../src/admin/pages/Setting"
import MessageForm from "../src/admin/pages/Message";
import ReportPage from "../src/admin/pages/Report";
import SignupDetailsPage from "../src/admin/pages/Students";
import LearningPathPage from "../src/admin/pages/Learning";
import PaymentPage from "../src/admin/pages/Payment";
import StudyMaterialUpdate from "../src/admin/pages/Studymaterial";
import Updateaddress from "../src/admin/pages/Updateaddress"
import UpdateBanner from "../src/admin/pages/UpdateBanner";
import TitleUpdate from "../src/admin/pages/Updatetitle";
import Updateprice from "../src/admin/pages/Updateprice";
import Popularproduct from "../src/admin/pages/Popularproduct";
import NEET from "../src/admin/pages/Neetpage";
import Offlinepage from "../src/admin/pages/Offline";
import Olampiad from "../src/admin/pages/Olampiad";
import NeetBannerUpdate from "../src/admin/pages/Neetpagebanner";
import Neetaddress from "../src/admin/pages/Neetaddress";
import Neettitle from "../src/admin/pages/Neettitle";
import NeetUpdateprice from "../src/admin/pages/Neetupdateprice";
import Student from "../src/admin/pages/Olampiadupdatestudemt";
import Olampiadcourse from "../src/admin/pages/OlampiadCourse";
import Olampiadoffer from "../src/admin/pages/Olampiadoffer";
import Olamiadtestinomial from "../src/admin/pages/Olampiadtestinomial";
import TimeTableUpdate from "../src/admin/pages/Timetable";
import Blog from "../src/admin/pages/Blog";
import UpdateBlogBanner from "../src/admin/pages/Updateblogbanner";
import LatestBlogs from "../src/admin/pages/Latestblog";
import Teacher from "../src/admin/pages/Teacher"
import TestimonialUpdate from "../src/admin/pages/Testinomial";
import ChatbotToggle from "./pages/ChatbotToggle";
import OurPublication from "./pages/OurPublication";
import ReceivedMessages from "./admin/pages/ReceptionPage";
import IITJEEPapers from "./pages/IITJEEPapers";
import ResourcesUpdate from "./admin/pages/ResourcesUpdate";
import UploadPreviousPapers from "./admin/pages/UploadPreviousPapers";
import NEETPapers from "./pages/NEETOaoer";
import BoardPapers from "./pages/BoardPapers";
import ImportantQuestions from "./admin/pages/ImportantQuestions";
import ImportantQuestion from "./pages/ImportantQuestions";
import Boardimportquestion from "./pages/Boardimportquestion";
import NCRTsolutions from "./pages/Ncrtsolutionfoundation";
import Updatencrtsolution from "./admin/pages/Updatencrtsolution";
import Boardncrtsolution from "./pages/Boardncrtsolution";
import Mhtncrtsolution from "./pages/Mhtncrtsolution";
import SamplePaperUpload from "./admin/pages/Samplepaperupdate";
import NCRTBookUpdate from "./admin/pages/Ncrtbookupdate";
import Revisionupdate from "./admin/pages/Revisionupdate"
import General from "./admin/pages/Generalknowledegeupdate"
import Sample from "./pages/Samplepaper";
import Ncrtbook from "./pages/Ncrtbook";
import Revision from "./pages/Revisionpage";
import BoardSample from "./pages/BoardSample";
import Ncertbook from "./pages/Ncertbook"
import Boardrevision from "./pages/Boardrevision"
import MeetOurCounceller from "./admin/pages/MeetOurCounceller";
import PublicationsSectionupdaet from "./admin/pages/PublicationsSection";
function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const location = useLocation();
  const adminRoutes = [
    "/admin",
    "/daaasshboard5296",
    "/site-customization",
    "/update-banner",
    "/testimonial-update",
    "/popular-courses",
    "/JEE",
    "/NEET",
    "/OFFLINE-CENTER",
    "/OLAMPIAD",
    "/explore-courses",
    "/book-free-demo",
    "/best-selling-products",
    "/our-students",
    "/stories-that-inspire",
    "/new-on-vidyarjan",
    "/live-classes",
    "/courses-update",
    "/assignmentss",
    "/announcements",
    "/settings",
    "/messages",
    "/reports",
    "/users",
    "/learning-paths",
    "/payment",
    "/study-materail-update",
    "/Update-Address-Details",
    "/Update-Banner-1",
    "/Title-update",
    "/teacher-Update",
    "/Price-Update",
    "/Teacher-job-Forms",
    "/neetpageupdatebanner",
    "/Neet-Update-Address-Details",
    "/Neet-Title-update",
    "/Time-table-update",
    "/Neet-Price-Update",
    "/Top-student",
    "/Olampiad-Courses-Update",
    "/Olampiad-offer",
    "/Olampiad-testinomial",
    "/Testinomial-Update",
    "/blog-Update",
    "/Update-Banner-Blog",
    "/Update-Latestblog",
    "/resources-update",
    "/our-offerings/resources/iit-jee",
    "/our-offerings/resources/foundation",
    "/our-offerings/resources/neet",
    "/our-offerings/resources/board",
    "/our-offerings/resources/mht-cet",
    "/our-offerings/resources/revisonnotes",
    "/our-offerings/resources/generalknowledge",
    "/Exam-update",
    "/study-material-update"
  ];

  const isAdminRoute = adminRoutes.some(route =>
    location.pathname.toLowerCase().startsWith(route.toLowerCase())
  );


  return (
    <div className="min-h-screen bg-cavalier-bg text-white font-sans selection:bg-cavalier-brand selection:text-cavalier-header-bg">
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/Our-publications" element={<OurPublication />} />
        <Route path="/our-free-services" element={<OurFreeServives />} />

        <Route path="/exams" element={<Exams />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/courses/jee" element={<Jee />} />
        <Route path="/courses/neet" element={<Neet />} />
        <Route path="/courses/offline" element={<Offline />} />
        <Route path="/courses/olympiad" element={<Olympiad />} />
        <Route path="/courses/early-learning" element={<Earlylearning />} />
        <Route path="/courses/one-to-one" element={<Onetoone />} />
        <Route path="/studymaterial" element={<StudyMaterial />} />
        <Route path="/store" element={<VidyarjanStore />} />
        <Route path="/benefits" element={<Benefits />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/computer-science" element={<ComputerScience />} />
        <Route path="/engineering-blog" element={<EngineeringBlogs />} />
        <Route path="/find-course" element={<FindCourse />} />
        <Route path="/blog" element={<VidyarjanBlog />} />
        <Route path="/safety" element={<ChildSafety />} />
        <Route path="/our-results" element={<OurResults />} />
        <Route path="/help-india" element={<HelpIndiaLearn />} />
        <Route path="/english-superstar-for-kids" element={<EnglishSuperstar />} />
        <Route path="/why-us" element={<WhyVidyarjan />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/courselist" element={<CourseList />} />
        <Route path="/authpage" element={<AuthPage />} />
        <Route path="/our-offerings/:title" element={<OurOfferingsEbook />} />
        <Route path="/enroll-now" element={<EnrolForm />} />
        <Route path="/teaching-with-us" element={<TeachingWithUs />} />
        <Route path="/jobform" element={<TeacherJobForm />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/cbse-tuitions" element={<FindCourse />} />
        <Route path="/icse-tuitions" element={<FindCourse />} />
        <Route path="/jee" element={<FindCourse />} />
        <Route path="/neet" element={<FindCourse />} />
        <Route path="/our-offerings/previous-year-papers/iit-jee" element={<IITJEEPapers />} />
        <Route path="/our-offerings/previous-year-papers/neet" element={<NEETPapers />} />
        <Route path="/our-offerings/previous-year-papers/board" element={<BoardPapers />} />
        <Route path="/our-offerings/important-questions/neet" element={<ImportantQuestion />} />
        <Route path="/our-offerings/important-questions/board" element={<Boardimportquestion />} />
        <Route path="/our-offerings/ncert-solutions/mht-cet" element={<Mhtncrtsolution />} />
        <Route path="/our-offerings/ncert-solutions/foundation" element={<NCRTsolutions />} />
        <Route path="/our-offerings/ncert-solutions/board" element={<Boardncrtsolution />} />
        <Route path="/our-offerings/sample-papers/foundation" element={<Sample />} />
        <Route path="/our-offerings/ncert-books/foundation" element={<Ncrtbook />} />
        <Route path="/our-offerings/revision-notes/foundation" element={<Revision />} />
        <Route path="/our-offerings/sample-papers/board" element={<BoardSample />} />
        <Route path="/our-offerings/ncert-books/board" element={<Ncertbook />} />
        <Route path="/our-offerings/revision-notes/board" element={<Boardrevision />} />


        {/* Admin Routes */}
        <Route path="/admin" element={<Login />} />
        <Route path="/daaasshboard5296" element={<Dashboard />} />
        <Route path="/assignmentss" element={<PublicationsSectionupdaet />} />
        <Route path="/study-material-update" element={<MeetOurCounceller />} />
        <Route path="/site-customization" element={<Site />} />
        <Route path="/update-banner" element={<Banner />} />
        <Route path="/popular-courses" element={<Popularproduct />} />
        <Route path="/JEE" element={<PopularCourses />} />
        <Route path="/NEET" element={<NEET />} />
        <Route path="/OFFLINE-CENTER" element={<Offlinepage />} />
        <Route path="/OLAMPIAD" element={<Olampiad />} />
        <Route path="/explore-courses" element={<ExploreCourses />} />
        <Route path="/book-free-demo" element={<BookFreeDemo />} />
        <Route path="/best-selling-products" element={<BestSellingProducts />} />
        <Route path="/our-students" element={<OurStudents />} />
        <Route path="/stories-that-inspire" element={<StoriesThatInspire />} />
        <Route path="/new-on-vidyarjan" element={<NewOnVidyarjan />} />
        <Route path="/live-classes" element={<Live />} />
        <Route path="/courses-update" element={<CourseUpdate />} />
        <Route path="/Exam-update" element={<AssignmentsPage />} />
        <Route path="/announcements" element={<AnnouncementPage />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/messages" element={<MessageForm />} />
        <Route path="/reports" element={<ReportPage />} />
        <Route path="/users" element={<SignupDetailsPage />} />
        <Route path="/learning-paths" element={<LearningPathPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/study-materail-update" element={<StudyMaterialUpdate />} />
        <Route path="/Update-Address-Details" element={<Updateaddress />} />
        <Route path="/Update-Banner-1" element={<UpdateBanner />} />
        <Route path="/Title-update" element={<TitleUpdate />} />
        <Route path="/Price-Update" element={<Updateprice />} />
        <Route path="/teacher-Update" element={<Teacher />} />
        <Route path="/neetpageupdatebanner" element={<NeetBannerUpdate />} />
        <Route path="/Neet-Update-Address-Details" element={<Neetaddress />} />
        <Route path="/Neet-Title-update" element={<Neettitle />} />
        <Route path="/Time-table-update" element={<TimeTableUpdate />} />
        <Route path="/Neet-Price-Update" element={<NeetUpdateprice />} />
        <Route path="/Top-student" element={<Student />} />
        <Route path="/Olampiad-Courses-Update" element={<Olampiadcourse />} />
        <Route path="/Olampiad-offer" element={<Olampiadoffer />} />
        <Route path="/Olampiad-testinomial" element={<Olamiadtestinomial />} />
        <Route path="/testimonial-update" element={<TestimonialUpdate />} />
        <Route path="/blog-Update" element={<Blog />} />
        <Route path="/Update-Banner-Blog" element={<UpdateBlogBanner />} />
        <Route path="/Update-Latestblog" element={<LatestBlogs />} />
        <Route path="/Teacher-job-Forms" element={<ReceivedMessages />} />
        <Route path="/resources-update" element={<ResourcesUpdate />} />
        <Route path="/our-offerings/resources/iit-jee" element={<UploadPreviousPapers />} />
        <Route path="/our-offerings/resources/neet" element={<ImportantQuestions />} />
        <Route path="/our-offerings/resources/foundation" element={<Updatencrtsolution />} />
        <Route path="/our-offerings/resources/board" element={<SamplePaperUpload />} />
        <Route path="/our-offerings/resources/mht-cet" element={< NCRTBookUpdate />} />
        <Route path="/our-offerings/resources/revisonnotes" element={<Revisionupdate />} />
        {/* <Route path="/our-offerings/resources/generalknowledge" element={<General/>}/>*/}
      </Routes>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
