import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { assets } from '../asset/asset';

function Footer() {
  return (
    <footer className="footer p-8 text-black bg-transparent flex flex-col justify-between">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Company Section (Centered) */}
        <div className="text-center md:text-left px-8 md:px-0">
          <div className="footer-logo flex items-center gap-3 mb-4 justify-center md:justify-start">
            <img
              src={assets.logo}
              alt="Logo"
              className="w-12 h-12 object-cover"
            />
          </div>
          <p className="text-gray-600 text-sm mb-4 text-start">
            Your trusted eCommerce partner.<br/> Delivering quality products and<br/> exceptional service to your doorstep.
          </p>
        </div>

        {/* Get in Touch Section (Aligned Padding) */}
        <div className="text-center md:text-left px-8 md:px-0">
          <h3 className="text-lg font-semibold mb-2 ">Get in Touch</h3>
          <ul className="space-y-2">
            <li className="flex justify-center md:justify-start items-center gap-2 text-gray-600">
              <FontAwesomeIcon icon={faEnvelope} />
              <span>ecommerce@gmail.com</span>
            </li>
            <li className="flex justify-center md:justify-start items-center gap-2 text-gray-600">
              <FontAwesomeIcon icon={faPhone} />
              <span>+123-456-7890</span>
            </li>
            <li className="flex justify-center md:justify-start items-center gap-2 text-gray-600">
              <FontAwesomeIcon icon={faPhone} />
              <span>Address: 123 Main Street, City, Country</span>
            </li>
          </ul>
        </div>

        {/* Company Section */}
        <div className="text-center md:text-left px-8 md:px-0">
          <h3 className="text-lg font-semibold mb-3">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link to="#" className="text-gray-600 hover:text-black transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="#" className="text-gray-600 hover:text-black transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="#" className="text-gray-600 hover:text-black transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/#" className="text-gray-600 hover:text-black transition">
                Delivery Information
              </Link>
            </li>
          </ul>
        </div>
        
      </div>

      {/* Copyright Section */}
      <div className="container mx-auto text-center mt-8 px-8">
        <p className="text-sm text-center text-gray-600">
          © Copy right 2023. All Rights Reserved.
        </p>
      </div>
      
    </footer>
  );
}

export default Footer;
