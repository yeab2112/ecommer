import React from 'react';
import download from '../image/images.png';
import NewsLeterBox from '../component/NewsLeterBox';
import Title from '../component/Title';

function About() {
  return (
    <div className="about-container max-w-6xl mx-auto p-4">
      <Title title1="ABOUT" title2="US"/>    

      {/* About Section with Image and Description */}
      <div className="flex flex-col md:flex-row mt-8 mb-8">
        {/* Left - Image */}
        <div className="md:w-1/2 mb-4 md:mb-0">
          <img 
            src={download} 
            alt="About" 
            className="w-full h-72 object-cover rounded-md"
          />
        </div>
        {/* Right - Description */}
        <div className="md:w-1/2 pl-0 md:pl-8">
          <p className="text-lg mb-4">
            At Addis Zemmen Store, we are dedicated to bringing you the latest trends in fashion, especially designed for women and children. We strive to offer premium quality, stylish clothing that fits any occasion.
          </p>
          <p className="text-lg mb-4">
            Our goal is to make shopping easy, enjoyable, and accessible, ensuring that every customer finds something they love. Whether you're looking for the perfect outfit for a special event or trendy everyday wear, we've got you covered.
          </p>
          <p className="text-lg mb-4">
            Founded in 2024, we’re a team of passionate fashion lovers committed to curating a beautiful collection of clothing for women and children. We believe that style should be comfortable, affordable, and accessible for everyone.
          </p>
        </div>
      </div>

      {/* Our Mission Section */}
      <h1 className="text-center text-3xl font-semibold mt-8">Our Mission</h1>
      <div className="mt-4">
        <p className="text-lg">
          Our mission is to offer a seamless shopping experience, bringing you high-quality fashion pieces at affordable prices. We aim to make sure every customer leaves our store with confidence and style.
        </p>
      </div>

      {/* Key Pillars Section */}
      <h1 className="text-center text-3xl font-semibold mt-8">Our Key Pillars</h1>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* Quality Assurance */}
        <div className="flex flex-col items-center justify-start border-l-2 border-gray-300 pl-4">
          <h4 className="text-xl font-medium mb-2 text-gray-500">Quality Assurance</h4>
          <p className="text-lg text-gray-500 text-center">
            We ensure that every item we offer is made from high-quality materials that promise durability and comfort.
          </p>
        </div>
        
        {/* Convenience */}
        <div className="flex flex-col items-center justify-start border-l-2 border-gray-300 pl-4">
          <h4 className="text-xl font-medium mb-2 text-gray-500">Convenience</h4>
          <p className="text-lg text-gray-500 text-center">
            Shopping at Addis Zemmen is easy and convenient with fast shipping, secure payments, and a user-friendly website.
          </p>
        </div>
        
        {/* Exceptional Customer Service */}
        <div className="flex flex-col items-center justify-start border-l-2 border-gray-300 pl-4">
          <h4 className="text-xl font-medium mb-2 text-gray-500">Exceptional Customer Service</h4>
          <p className="text-lg text-gray-500 text-center">
            Our dedicated customer service team is always available to assist you with any inquiries, ensuring that your shopping experience is seamless and enjoyable.
          </p>
        </div>
      </div>

      <h4 className="text-center text-xl mt-8 text-gray-500">
        Thank you for choosing Addis Zemmen Store. We look forward to serving you with the best in fashion!
      </h4>

      {/* Newsletter Box */}
      <NewsLeterBox/>
    </div>
  );
}

export default About;
