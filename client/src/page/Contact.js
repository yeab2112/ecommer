import React from 'react';
import NewsLeterBox from '../component/NewsLeterBox';  // Importing NewsLeterBox component
import Title from '../component/Title';  // Importing Title component
import contact from '../image/contact.png';

const Contact = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Title Section */}
      <Title title1="CONTACT" title2="US" />

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center">
        {/* Left - Image */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <img
            src={contact}  // Using the imported image
            alt="Contact Us"
            className="w-full h-64 object-cover rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105"
          />
        </div>

        {/* Right - Static Contact Information */}
        <div className="md:w-1/2 pl-0 md:pl-8">
          <h2 className="text-3xl font-semibold mb-6 text-blue-700">Our Store</h2>

          {/* Static Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <i className="bi bi-phone-fill text-blue-600 text-2xl"></i>
              <span className="text-lg text-gray-700 font-medium">Phone: <strong>0923547840</strong></span>
            </div>

            <div className="flex items-center space-x-4">
              <i className="bi bi-envelope-fill text-blue-600 text-2xl"></i>
              <span className="text-lg text-gray-700 font-medium">Email: <strong>yeabsiraaychiluhim2112@gmail.com</strong></span>
            </div>

            <div className="flex items-center space-x-4">
              <i className="bi bi-geo-alt-fill text-blue-600 text-2xl"></i>
              <span className="text-lg text-gray-700 font-medium">Location: <strong>Addis Ababa</strong></span>
            </div>

            {/* Business Hours */}
            <div className="flex items-center space-x-4">
              <i className="bi bi-clock-fill text-blue-600 text-2xl"></i>
              <span className="text-lg text-gray-700 font-medium">Business Hours: <strong>Mon - Fri: 9 AM - 6 PM</strong></span>
            </div>

            {/* Explore Button */}
            <div className="mt-4">
              <button className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300">
                Explore Jobs
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Static Map Section (Optional) */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-blue-700 mb-4">Find Us On The Map</h3>
        <div className="relative w-full h-64">
          {/* Google Maps Embed with title for accessibility */}
          <iframe
            title="Google Map showing our store location"  // Added title for accessibility
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3941.4891325496587!2d38.74047197413468!3d8.926992790579199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8334bbe244d1%3A0x19fa020258e33bb5!2zSGFuYSBtYXJpeWFtIC0g4YiQ4YqTIOGIm-GIreGLq-GInSDhiaThibDhiq3hiK3hiLXhibLhi6vhipU!5e0!3m2!1sen!2set!4v1741565993310!5m2!1sen!2set"
            width="100%"  // Make the map responsive
            height="270"  // Adjusted height for map
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Newsletter Box */}
      <div className="mt-8">
        <NewsLeterBox />
      </div>
    </div>
  );
};

export default Contact;
