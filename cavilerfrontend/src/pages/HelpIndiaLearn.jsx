import React, { useEffect, useState } from "react";

function PartnerWithUs() {
    const partners = [
      {
        title: "Post School",
        description:
          "Help children with after school learning support from Grade 6th - Grade 10th and competitive exam preparation for JEE & NEET, by giving out scholarships up to 100 percent.",
      },
      {
        title: "Financial Aid to Support Continuation of School",
        description:
          "Support children, with school fees, including but not limited to tuition fees. We also help with any other charges of the school expenses on books, uniform, and academic-related supplies.",
      },
      {
        title: "Sponsoring Digital Devices",
        description:
          "Support children who are unable to take online classes due to the unavailability of a smart device, by providing a Mobile/Tablet to enable online learning.",
      },
      {
        title: "Content Learning Partner",
        description:
          "Collaborate with Schools or Not-for-profit organizations to enable institutes/schools with our learning content for their online classes. Keeping in mind, a lot of these institutes are struggling with quality content, Vidyarjan can help such bodies with the specially designed content.",
      },
      {
        title: "Partnership to use Vidyarjan's Interactive Learning Platform (WAVE)",
        description:
          "Collaborate with Schools or Not-for-profit organizations to enable institutes/school online learning by giving temporary license to use our LIVE interactive technology. For the institutes struggling with the online setup, WAVE can be used to make the online classes interactive and seamless.",
      },
    ];
  
    return (
      <div className="bg-green-700 text-white py-12 px-4 md:px-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Partner with us</h2>
          <p className="mt-2 text-lg md:text-xl">
            You have the power to ensure India's education won’t stop. You can
            partner with us in the following ways:
          </p>
        </div>
  
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner, index) => (
            <div key={index} className="bg-white text-black p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">{partner.title}</h3>
              <p className="mt-2 text-gray-700">{partner.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
   function SupportHelpIndiaLearn() {
    return (
      <div className="py-12 px-4 md:px-16 bg-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold">
          You can also support{' '}
          <span className="text-orange-600">'Help India Learn'</span> Initiative
          by joining the cause
        </h2>
  
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Organisation Support Card */}
          <div className="bg-white shadow-lg rounded-lg p-4">
            <img
              src="https://d9hhrg4mnvzow.cloudfront.net/www.helpindialearn.in/03b96ad1-organisation_10dz07s0dw07s00100001o.jpg"
              alt="Organisation Support"
              className="rounded-lg w-full"
            />
            <p className="mt-4 text-gray-700">
              Are you{' '}
              <span className="font-semibold">an organisation</span> which is
              working with children affected by the pandemic?
            </p>
            <button className="mt-4 px-6 py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-600 hover:text-white transition">
              Partner with us
            </button>
          </div>
  
          {/* Individual Support Card */}
          <div className="bg-white shadow-lg rounded-lg p-4">
            <img
              src="https://d9hhrg4mnvzow.cloudfront.net/www.helpindialearn.in/fac80d53-individual_10e007s0dw07s00200001o.jpg"
              alt="Individual Support"
              className="rounded-lg w-full"
            />
            <p className="mt-4 text-gray-700">
              Are you{' '}
              <span className="font-semibold">someone who knows</span> about a{' '}
              <span className="font-semibold">child</span> who has been affected
              by the pandemic?
            </p>
            <button className="mt-4 px-6 py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-600 hover:text-white transition">
              Reach out to us
            </button>
          </div>
        </div>
      </div>
    );
  }
  
   function OrganisationStandingWithUs() {
    const organisations = [
      {
        id: 1,
        name: "Parliamentarians with Innovators for India (PIIndia.org)",
        description:
          "PIIndia.org is a bi-partisan national-level action group comprising of 15 Members of...",
        image:
          "https://d9hhrg4mnvzow.cloudfront.net/www.helpindialearn.in/4bc92ca3-pi-india_10000000i80a000000001o.jpg",
      },
      {
        id: 2,
        name: "DBM INDIA (DBM)",
        description:
          "DBM INDIA (DBM) is a humanitarian organization working to create lasting change in the lives of children, families and communities...",
        image:
          "https://d9hhrg4mnvzow.cloudfront.net/www.helpindialearn.in/2641fd3c-dbm_10000000i80a000000201o.jpg",
      },
      {
        id: 3,
        name: "The Delhi Commission for Protection of Child Rights",
        description:
          "The Delhi Commission for Protection of Child Rights (DCPCR) is a statutory body established under the Commission for Protection of...",
        image:
          "https://d9hhrg4mnvzow.cloudfront.net/www.helpindialearn.in/c913d84c-dcpcr_10000000i80a000000001o.jpg",
      },
    ];
  
    return (
      <div className="py-12 px-4 md:px-16 bg-gray-100 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Organisations who are standing with us
        </h2>
  
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {organisations.map((org) => (
            <div key={org.id} className="bg-white shadow-lg rounded-lg p-4">
              <img
                src={org.image}
                alt={org.name}
                className="rounded-lg w-full h-40 object-contain"
              />
              <p className="mt-4 text-gray-900 font-semibold">{org.name}</p>
              <p className="mt-2 text-gray-700 text-sm">{org.description}</p>
              <button className="mt-4 px-4 py-2 text-orange-600 border border-orange-600 rounded-lg hover:bg-orange-600 hover:text-white transition">
                Read more
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
   function Footer() {
    return (
      <footer className="bg-orange-500 text-white py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-semibold">Vidyarjan</h2>
            <p className="text-sm">Learn LIVE Online</p>
          </div>
  
          {/* Terms & Contact Section */}
          <div className="mt-4 md:mt-0">
            <p className="text-sm">© Terms and conditions applied*</p>
            <p className="text-sm">
              write to us -{" "}
              <a
                href="mailto:helpindialearn@Vidyarjan.com"
                className="underline hover:text-gray-200"
              >
                helpindialearn@vidyarjan.com
              </a>
            </p>
          </div>
        </div>
      </footer>
    );
  }
  const Header = () => {
    return (
      <header className="flex items-center justify-between px-4 md:px-10 py-3 shadow-md">
        {/* Left Section: Logo */}
        <div className="flex items-center space-x-4">
          <img
            src="https://d9hhrg4mnvzow.cloudfront.net/www.helpindialearn.in/c701547d-helpindialearn-logo_107802l07802k000000028.png"
            alt="Help India Learn"
            className="h-10 md:h-12"
          />
          <span className="text-orange-500 text-2xl md:text-3xl font-semibold">
            Vidyarjan
          </span>
        </div>
  
        {/* Right Section: Join Us Button */}
        <button className="border border-orange-500 text-orange-500 px-4 py-2 rounded-md hover:bg-orange-500 hover:text-white transition">
          Join Us
        </button>
      </header>
    );
  };
  
  
  

const HelpIndiaLearn = () => {
  return (
    <div className="font-sans relative ">
        <Header/>
        <div className="fixed -z-10 h-screen w-screen ">
            <img className="h-full w-full" src="https://d9hhrg4mnvzow.cloudfront.net/www.helpindialearn.in/218f9725-partner_100000000000000000001o.jpg"/>
        </div>
      {/* Hero Section */}
      <div className="relative bg-gray-200 w-full h-[400px] md:h-[500px]">
        <img
          src="https://d9hhrg4mnvzow.cloudfront.net/www.helpindialearn.in/36a5280c-helpindialearn-bg_10sp0dh0sp0dg00000001o.jpg"
          alt="Help India Learn"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-10  flex flex-col justify-end items-center bg-black/20 bg-opacity text-white text-center px-4">
          <h1 className="text-3xl md:text-7xl  lg:text-8xl  font-bold">Help India Learn</h1>
          <p className="text-lg mt-2">Initiative by <span className="text-orange-400">Vidyarjan</span></p>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="w-full bg-gray-200">

      
      <div className="max-w-4xl mx-auto bg-gray- py-10 px-6 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Be part of the initiative to help the future of our children, by helping them today.</h2>
        <p className="text-gray-700">We at Vidyarjan, in our quest to help numerous children who have been adversely affected by the pandemic, have come up with a simple initiative - Help India Learn. We have launched this initiative to generate an effort in making the precious hope of education a silver lining in their post-pandemic era.</p>
      </div>
      
      {/* Priority Section */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 px-6">
        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-gray-900">Our immediate priority is to <span className="italic">help children who have lost one or both of their parents</span> in the pandemic. Our ❤️ heart goes out to them and we are committed to help them to the best of our abilities.</h3>
          <p className="text-gray-700 mt-2">Under this initiative,Vidyarjan will not only support the identified affected children with immediate needs of food and medical support, but will work as a long term academic mentor by adopting these children academically to ensure their continual growth.</p>
        </div>
        <img 
          src="https://d9hhrg4mnvzow.cloudfront.net/www.helpindialearn.in/e392af70-immediate_10bh0ad0bh09h00000g01o.jpg" 
          alt="Children Studying" 
          className="w-full rounded-lg"
        />
      </div>
      
      {/* Pledge Section */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 px-6 py-10">
        <img 
          src="https://d9hhrg4mnvzow.cloudfront.net/www.helpindialearn.in/925e79eb-pledges_10cw0bb0bk0bb00o00001o.jpg" 
          alt="Vedantu Pledge" 
          className="w-full rounded-lg"
        />
        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-gray-900">Vidyarjan pledges <span className="text-orange-500">₹15 Crore</span> towards securing the future of 12,000 children impacted by the pandemic by ensuring their educational and academic needs are met.</h3>
          <p className="text-gray-700 mt-2">A part of funds will be disbursed through the partner organizations to help with the immediate needs of the affected children namely: food, shelter, devices for continued education, and school fees.

We will support these children with completely free education for multiple years on Vidyarjan. We are also committed to transparently showcase the academic progress and learning outcomes of the affected children whom Vidyarjan academically adopts. </p>
        </div>
      </div>
      </div>
      
      {/* Call to Action */}
      <div className="bg-orange-500/0  text-white py-20 text-center">
        <h2 className="text-2xl md:text-3xl font-bold">Be a part of Help India Learn</h2>
        <button className="mt-4 bg-white text-orange-500 font-bold px-6 py-2 rounded-lg text-lg hover:bg-gray-200">Join us for the cause</button>
      </div>
      <PartnerWithUs/>
      <SupportHelpIndiaLearn/>
      <OrganisationStandingWithUs/>
      <Footer/>
    </div>
  );
};

export default HelpIndiaLearn;

