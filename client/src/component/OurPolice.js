import React from 'react';

function OurPolice() {
  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Our Policies
      </h2>
      <p className="text-lg text-gray-700 text-center mb-4">
        Learn more about our policies to ensure a seamless shopping experience.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Policy 1 */}
        <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Return Policy
          </h3>
          <p className="text-gray-600">
            We offer a 30-day return policy for unused and unopened items.
          </p>
        </div>
        {/* Policy 2 */}
        <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Shipping Policy
          </h3>
          <p className="text-gray-600">
            Enjoy fast and secure shipping to your doorstep within 3-5 business
            days.
          </p>
        </div>
        {/* Policy 3 */}
        <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Privacy Policy
          </h3>
          <p className="text-gray-600">
            Your data is safe with us. We ensure strict privacy measures for all
            customer information.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OurPolice;
