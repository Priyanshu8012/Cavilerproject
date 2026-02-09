import React from "react";

const ContactForm = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="w-full max-w-lg p-8 shadow-lg border rounded-2xl bg-white">
        <h2 className="text-center text-3xl font-extrabold text-blue-900">Talk to our expert</h2>
        <button className="w-full bg-blue-600 text-white py-3 mt-4 rounded-xl font-semibold flex items-center justify-center shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105">
          📞 Call now for free
        </button>
        <p className="text-center text-gray-600 mt-3 font-medium">or</p>
        <h3 className="text-center text-xl font-bold text-blue-900">Request call back</h3>
        <form className="mt-6 space-y-5">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Mobile No."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
            <button className="bg-blue-500 text-white px-5 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105">
              Send OTP
            </button>
          </div>
          <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm">
            <option>Class & Stream</option>
          </select>
          <div className="flex space-x-2">
            <input
              type="text"
              value="Patna"
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 shadow-sm"
            />
            <input
              type="text"
              placeholder="800001"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>
          <div className="flex items-start space-x-2">
            <input type="checkbox" id="terms" className="mt-1 h-5 w-5 text-blue-600" />
            <label htmlFor="terms" className="text-sm text-gray-600 leading-tight">
              By submitting this form, I agree to receive all the WhatsApp communication on my registered number and agreeing to Aakash's
              <a href="#" className="text-blue-600 font-medium"> terms of use </a> and <a href="#" className="text-blue-600 font-medium"> privacy policy</a>.
            </label>
          </div>
          <button className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-orange-600 transition-transform transform hover:scale-105">
            Submit Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
