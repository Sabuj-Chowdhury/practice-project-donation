import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from "../assets/logo/logo.jpeg";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-100 to-blue-200 text-gray-700 py-8">
      <div className="max-w-7xl mx-auto px-5">
        {/* Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Logo and Slogan */}
          <div className="flex flex-col items-center md:items-start">
            <img
              src={logo}
              alt="openEdu Logo"
              className="h-16 rounded-full mb-3"
            />
            <p className="text-center md:text-left text-blue-800 font-semibold text-lg">
              Empowering Education, Empowering Lives.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900 text-2xl"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900 text-2xl"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900 text-2xl"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900 text-2xl"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Copyright Information */}
        <div className="mt-6 border-t border-blue-300 pt-4 text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} openEdu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
