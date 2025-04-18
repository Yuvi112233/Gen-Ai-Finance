import React from 'react';
import Particles from './Particles';

const Footer = () => {
  return (
    <footer className="relative pt-12 pb-8 bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800 text-white">
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-wrap justify-between">
          <div className="w-full lg:w-6/12 mb-6 lg:mb-0">
            <h4 className="text-3xl font-semibold">Stay Connected</h4>
            <p className="mt-2 text-gray-300">
              Follow us on social media for the latest updates and insights.
            </p>
            <div className="mt-4 flex gap-3">
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-full">
                <i className="fab fa-twitter"></i>
              </button>
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-full">
                <i className="fab fa-facebook-square"></i>
              </button>
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-full">
                <i className="fab fa-dribbble"></i>
              </button>
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-full">
                <i className="fab fa-github"></i>
              </button>
            </div>
          </div>
          <div className="w-full lg:w-6/12 grid grid-cols-2 gap-6">
            <div>
              <h5 className="text-lg font-semibold">Quick Links</h5>
              <ul className="mt-2 text-gray-300">
                <li><a className="hover:text-white" href="#">About Us</a></li>
                <li><a className="hover:text-white" href="#">Blog</a></li>
                <li><a className="hover:text-white" href="#">Github</a></li>
                <li><a className="hover:text-white" href="#">Resources</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold">Support</h5>
              <ul className="mt-2 text-gray-300">
                <li><a className="hover:text-white" href="#">Privacy Policy</a></li>
                <li><a className="hover:text-white" href="#">Terms & Conditions</a></li>
                <li><a className="hover:text-white" href="#">Contact Us</a></li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-500" />
        <div className="text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} GenAI Finance. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
