import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaKey, FaLock } from 'react-icons/fa';

const PaymentPage = () => {
  const [apiKey, setApiKey] = useState('');
  const [secretKey, setSecretKey] = useState('');

  const handlePayment = async () => {
    if (!apiKey || !secretKey) {
      alert('Please enter your Razorpay API Key and Secret Key');
      return;
    }

    const options = {
      key: apiKey,
      amount: 50000,
      currency: 'INR',
      name: 'Vidyarajan',
      description: 'Course Payment',
      image: '/logo.png',
      handler: function (response) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: 'Admin User',
        email: 'admin@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#f97316',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gradient-to-br from-blue-900 via-purple-800 to-black text-white">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="p-12 bg-white bg-opacity-10 backdrop-blur-xl rounded-3xl shadow-2xl text-center w-full max-w-2xl border border-orange-400"
      >
        <h2 className="text-5xl font-extrabold mb-6 text-orange-400">Payment Portal</h2>
        <p className="text-lg mb-8 text-gray-300">Securely complete your payment using Razorpay.</p>
        <div className="mb-6 space-y-4">
          <div className="flex items-center bg-gray-800 rounded-lg border border-gray-600 p-4">
            <FaKey className="text-orange-400 mr-3" />
            <input
              type="text"
              placeholder="Enter Razorpay API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full bg-transparent text-white placeholder-gray-400 outline-none"
            />
          </div>
          <div className="flex items-center bg-gray-800 rounded-lg border border-gray-600 p-4">
            <FaLock className="text-orange-400 mr-3" />
            <input
              type="text"
              placeholder="Enter Razorpay Secret Key"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              className="w-full bg-transparent text-white placeholder-gray-400 outline-none"
            />
          </div>
        </div>
        <motion.button
          onClick={handlePayment}
          whileHover={{ scale: 1.05 }}
          className="bg-orange-500 hover:bg-orange-600 text-white py-4 px-10 rounded-xl text-lg w-full shadow-md"
        >
          Proceed to Pay
        </motion.button>
      </motion.div>
    </div>
  );
};

export default PaymentPage;

