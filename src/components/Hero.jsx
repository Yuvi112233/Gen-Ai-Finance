import React from "react";
import Particles from "./Particles";

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center px-6 md:px-20 py-16 bg-white min-h-screen overflow-hidden">
      
    <div className="absolute inset-0 z-0">
    <Particles
      particleColors={['#ffffff', '#ffffff']}
      particleCount={200}
      particleSpread={10}
      speed={0.1}
      particleBaseSize={100}
      moveParticlesOnHover={false}
      alphaParticles={false}
      disableRotation={false}
    />
  </div>

      {/* Main Content */}
      <div className="relative z-10 text-center text-black max-w-4xl">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight animate-fade-in">
  Smart Finance, <br />
  powered by <span className="text-green-600">AI intelligence</span>.
</h1>


        {/* Subtext with Icon */}
        <div className="mt-8 flex justify-center items-center animate-slide-in">
          <div className="flex items-center bg-white/80 backdrop-blur-md rounded-lg p-4 shadow-lg border border-gray-200/50">
            <svg
              className="w-6 h-6 text-red-500 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <p className="text-lg text-gray-600">
  Take control of your finances with AI-powered insights, smart investments, and real-time analytics.
</p>

          </div>
        </div>

        {/* Decorative Graphic (Overlapping Circles) */}
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-0 opacity-30">
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="100" cy="100" r="80" fill="#d8b4fe" fillOpacity="0.4" />
            <circle cx="140" cy="100" r="80" fill="#a78bfa" fillOpacity="0.4" />
            <circle cx="60" cy="100" r="80" fill="#c084fc" fillOpacity="0.4" />
          </svg>
        </div>
      </div>

      {/* Glassmorphic Blur Background */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm z-0"></div>
    </section>
  );
};

export default Hero;