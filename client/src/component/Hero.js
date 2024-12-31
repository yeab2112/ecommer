import React from "react";
import { assets } from "../asset/asset.js";

function Hero() {
  return (
    <div className="flex flex-col md:flex-row  border-2 items-center justify-between m-4 py-12 px-6 md:px-16 lg:px-24">
      {/* Left Side */}
      <div className="flex flex-col space-y-4 md:space-y-6 text-center md:text-left">
        <div>
          <p className="text-sm uppercase text-gray-500">Our Bestsellers</p>
          <p className="text-3xl font-bold text-gray-800 md:text-4xl lg:text-5xl">
            Latest Arrival
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-4">
          <button className="bg-blue-500 text-white py-2 px-6 rounded-full shadow-md hover:bg-blue-600 transition duration-300">
            Shop Now
          </button>
        </div>
      </div>

      {/* Right Side */}
      <div className="mt-6 md:mt-0 w-full md:w-auto">
        <img
          src={assets.hero}
          alt="Hero Section"
          className="min-w-96 h-80 max-w-md object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}

export default Hero;
