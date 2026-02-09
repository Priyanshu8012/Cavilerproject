import React, { useState } from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const features = [
  {
    title: "Profanity filter",
    description:
      "Automatically checks and removes any inappropriate texts, pictures, and recordings before anyone sees them.",
    imgSrc: "https://img.icons8.com/?size=100&id=DSgRVnjV5gKx&format=png&color=000000",
   
    
  },
  {
    title: "Teacher-moderated classrooms",
    description:
      "Class teachers closely observe the chat and block anyone posting inappropriate texts or pictures.",
    imgSrc: "https://img.icons8.com/ios/50/teacher.png",
  },
  {
    title: "Child Safety team",
    description:
      "Works to verify, investigate, and provide timely solutions for incidents.",
    imgSrc: "https://img.icons8.com/ios/50/lifebuoy.png",
  },
  {
    title: "Child Psychologist",
    description:
      "Our psychologist reaches out to any to offer support and a way forward.",
    imgSrc: "https://img.icons8.com/ios/50/psychology.png",
  },
  {
    title: "Policymaking",
    description:
      "Our Data Privacy and Child Safety policy reflect our promise and always protect the student’s interest.",
    imgSrc: "https://img.icons8.com/ios/50/policy-document.png",
  },
];




const guidelines = [
  "Be friendly and nice to other students and teachers.",
  "Regularly share your online learning experience with family members.",
  "Consult with your parents or guardians before opening a social media account.",
  "Immediately inform the teacher or family if something makes you uncomfortable.",
  "Report incidents of bad online behaviour that you see or face within the platform.",
  "Consult with your parents or guardians before sharing any personal information with anyone.",
];

const SafeLearning = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-start  gap-x-20 bg-gray-100">
      {/* Left Section */}
      <div className="md:w-1/2 mb-6 md:mb-0">
        <h2 className="text-3xl font-bold text-gray-900">
          Keeping it safe and fun for everyone.
        </h2>
        <p className="mt-2 text-gray-600">
          We pride ourselves on being a place for students to learn and grow.
          Our community guidelines are a reflection of that.
        </p>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Community Guidelines
        </h3>
        <ul className="space-y-4">
          {guidelines.map((guideline, index) => (
            <li key={index} className="flex items-start">
              <img
                src="https://img.icons8.com/?size=100&id=11658&format=png&color=000000"
                alt="check"
                className="w-6 h-6 mr-3"
              />
              <span className="text-gray-700">{guideline}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};




const faqs = [
  { title: "How to report an incident", content: "Detailed steps on how to report an incident." },
  { title: "You can also report an incident as it happens", content: "Ways to report an incident in real time." },
  { title: "What happens after you report an incident", content: "Information on what follows after reporting." },
];

const IncidentReport = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-100 w-full  ">
      {/* Header Section */}
      <h2 className="text-3xl font-bold text-gray-900">Reporting an incident</h2>
      <p className="text-lg font-semibold text-gray-800 mt-2">
        Here to help. Here to assist. Always available at your fingertips.
      </p>
      <p className="mt-2 text-gray-600">
        There may be times when someone acts in a way that can make a student uncomfortable. If you see or face any inappropriate content or harassment, please report it immediately.
      </p>
      <p className="mt-2 text-gray-600">
        Add details of the class, screenshots of the incident (if possible), and reason for discomfort. We will take it from there.
      </p>

      {/* FAQ Section */}
      <div className="mt-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-t border-gray-300">
            <button
              className="w-full text-left py-4 flex justify-between items-center font-semibold text-gray-900 focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              {faq.title}
              <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <p className="text-gray-700 pb-4">{faq.content}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};



const Footer = () => {
  return (
    <footer className="bg-[#03131D] text-white py-4 px-6 md:px-16 flex flex-col md:flex-row justify-between items-center w-full">
      <div className="flex items-center gap-4">
        <span className="text-sm md:text-base">Connect with us:</span>
        <div className="flex gap-3">
          <a
            href="#"
            className="bg-orange-500 p-2 rounded-md text-white hover:bg-orange-600"
          >
            <FaFacebookF size={16} />
          </a>
          <a
            href="#"
            className="bg-orange-500 p-2 rounded-md text-white hover:bg-orange-600"
          >
            <FaLinkedinIn size={16} />
          </a>
          <a
            href="#"
            className="bg-orange-500 p-2 rounded-md text-white hover:bg-orange-600"
          >
            <FaTwitter size={16} />
          </a>
        </div>
      </div>
      <div className="text-sm md:text-base mt-3 md:mt-0">
        &copy; 2025. Vidyarjan.com. All rights reserved
      </div>
    </footer>
  );
};

const ChildSafetySection = () => {
    return (
      <section className="bg-yellow-300 p-8 md:p-16 flex flex-col md:flex-row items-center mb-8">
        {/* Left Text Section */}
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-4xl font-bold text-black">All equal.<br />All welcome.</h1>
          <p className="text-black text-lg">
            Vidyarjan is a safe space for anyone and everyone to learn, grow, and better themselves.
            That is reflected in an overwhelming majority of our students who conduct themselves responsibly.
          </p>
          <p className="text-black text-lg">
            We are committed to keeping Vidyarjan safe for every student and pioneering online safety.
          </p>
          
          <div className="bg-purple-100 p-4 rounded-lg">
            <h2 className="text-xl font-bold text-purple-600 flex items-center gap-2">
              <span className="bg-purple-600 text-white p-2 rounded-full">🔒</span>
              Child Safety Promise
            </h2>
            <ul className="text-black mt-2 space-y-2">
              <li><strong>Training:</strong> Child Safety training sessions for students, parents, and teachers.</li>
              <li><strong>Policy:</strong> Regular updates to policies for necessary interventions.</li>
              <li><strong>Technology:</strong> Building features to keep Vidyarjan a safe space.</li>
              <li><strong>Remedy:</strong> Addressing incidents in a timely and serious manner.</li>
            </ul>
          </div>
        </div>
        
        {/* Right Image Section */}
        <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
          <img 
            src="https://growth-fe.vedantu.com/cdn/images/child-safety/child-safety-top.png" 
            alt="Child Safety" 
            className="max-w-full h-auto"
          />
        </div>
      </section>
    );
  };
  
 
  


const HelpCounselling = () => {
  return (
    <div className="bg-purple-600 text-white px-6 md:px-12 py-10 flex flex-col md:flex-row items-center w-full mx-auto">
      {/* Left: Image Section */}
      <div className="relative md:w-1/3">
        <img
          src="/assets/Teachers/Satij.jpg" 
          alt="Counselling Support"
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Right: Text Content */}
      <div className="md:w-2/3 mt-6 md:mt-0 md:pl-10">
        <h2 className="text-3xl font-bold">Help and counselling</h2>
        <p className="mt-2 text-lg font-semibold">Care, beyond just a report. At times, we all need something to lean on.</p>
        <p className="mt-2">
          Facing bad online behaviour may cause fear, anxiety, or distress. If unchecked, it may affect academic progress and social interactions as well.
        </p>
        <p className="mt-2">
          Counselling can help one cope and overcome these feelings such as anger, guilt, and fear.
        </p>
        <p className="mt-2">
          Needless to say, these conversations remain private between you and the counsellor. No one can listen in.
        </p>
      </div>
    </div>
  );
};





const ChildSafety = () => {
  return (<div className="bg-gray-100">
    <ChildSafetySection />
    <div className="px-6 md:px-32 lg:px-64 flex flex-col gap-y-20 bg-gray-100">

    <div className="  bg-gray-100 flex flex-col md:flex-row  md:items-start gap-x-20">
      <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
        <h2 className="text-3xl font-bold text-gray-900">
          Our values and technology come together to create a safe environment
        </h2>
        <p className="text-gray-600 mt-4">
          We make constant improvements to our policies and features so that learning continues uninterrupted.
        </p>
      </div>
      <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-1 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-4">
            <img src={feature.imgSrc} alt={feature.title} className="w-10 h-10" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
      <SafeLearning />
      <div className="w-fit md:w-full flex flex-col md:flex-row flex-wrap  items-center justify-between md:items-end    bg-green-600  rounded-lg">
        <div className="flex order-2 justify-between ">

        <img className="order-2 rounded-md" src="/assets/Teachers/Jagtap.jpg"></img>
        </div>
        <div className=" order-1 md:w-1/2 shrink-0  relative">

        <h1 className="  font-bold text-xl sm:text-2xl md:text-3xl p-3  text-white ">Our teachers are
        well-equipped in handling incidents of bad online behaviour during a class.</h1>
        </div>
      </div>
      <IncidentReport />
    </div>
      <HelpCounselling />
      <Footer/>
    </div>
  );
};

export default ChildSafety;

