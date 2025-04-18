import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Navbar = () => {
  const linkStyles = "transition duration-300 ease-in-out hover:text-yellow-400 hover:scale-110";

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-purple-600 text-white py-4 px-6 shadow-lg relative z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-3xl font-extrabold cursor-pointer transition duration-300 hover:scale-105 hover:text-yellow-400">
          <a href="/">Gen-Ai </a> <span className="text-yellow-400"> <a href="">Finance</a></span>
        </h1>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-8">
          <li>
            <Link to="/" className={linkStyles}>
              Home
            </Link>
          </li>
          <li>
            <a href="#features" className={linkStyles}>
              Features
            </a>
          </li>
          <li>
            <a href="#faq" className={linkStyles}>
              FAQ
            </a>
          </li>
          <li>
            <a href="#pricing" className={linkStyles}>
              Pricing
            </a>
          </li>
          <li>
            <a href="#about" className={linkStyles}>
              About Us
            </a>
          </li>
        </ul>

        {/* Button */}
        <Link
          to="/form"
          className="px-5 py-2 bg-yellow-400 text-black font-semibold rounded-lg shadow-md transition-all duration-300 hover:bg-yellow-500 hover:shadow-xl"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
