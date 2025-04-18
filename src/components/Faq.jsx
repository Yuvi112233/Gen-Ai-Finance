import React from "react";
import Particles from "./Particles";

const Faq = () => {
  return (
    <div id="faq" className="relative p-8 bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800 min-h-screen overflow-hidden">
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
      {/* Decorative SVGs */}
      <div className="absolute top-0 -right-1/4 z-0 opacity-20 transform rotate-12">
        <svg
          width="800px"
          height="800px"
          viewBox="0 0 24 24"
          className="w-96 h-full object-fill fill-blue-400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 6C12 5.44772 11.5523 5 11 5C10.4477 5 10 5.44772 10 6V16C10 16.5523 10.4477 17 11 17C11.5523 17 12 16.5523 12 16V6ZM9 9C9 8.44772 8.55228 8 8 8C7.44772 8 7 8.44772 7 9V16C7 16.5523 7.44772 17 8 17C8.55228 17 9 16.5523 9 16V9ZM15 9C15 8.44772 14.5523 8 14 8C13.4477 8 13 8.44772 13 9V16C13 16.5523 13.4477 17 14 17C14.5523 17 15 16.5523 15 16V9ZM18 13C18 12.4477 17.5523 12 17 12C16.4477 12 16 12.4477 16 13V16C16 16.5523 16.4477 17 17 17C17.5523 17 18 16.5523 18 16V13ZM6 15C6 14.4477 5.55228 14 5 14C4.44772 14 4 14.4477 4 15V16C4 16.5523 4.44772 17 5 17C5.55228 17 6 16.5523 6 16V15ZM21 15C21 14.4477 20.5523 14 20 14C19.4477 14 19 14.4477 19 15V16C19 16.5523 19.4477 17 20 17C20.5523 17 21 16.5523 21 16V15ZM4 18C3.44772 18 3 18.4477 3 19C3 19.5523 3.44772 20 4 20H21C21.5523 20 22 19.5523 22 19C22 18.4477 21.5523 18 21 18H4Z"
          />
        </svg>
      </div>
      <div className="absolute -bottom-0 -left-1/4 z-0 opacity-20 transform -rotate-90">
        <svg
          width="800px"
          height="800px"
          viewBox="0 0 256 256"
          xmlns="http://www.w3.org/2000/svg"
          className="w-48 h-full object-fill fill-pink-400"
        >
          <path
            d="M32 225h12.993A4.004 4.004 0 0 0 49 220.997V138.01c0-4.976.724-5.04 1.614-.16l12.167 66.708c.397 2.177 2.516 3.942 4.713 3.942h8.512a3.937 3.937 0 0 0 3.947-4S79 127.5 80 129s14.488 52.67 14.488 52.67c.559 2.115 2.8 3.83 5.008 3.83h8.008a3.993 3.993 0 0 0 3.996-3.995v-43.506c0-4.97 1.82-5.412 4.079-.965l10.608 20.895c1.001 1.972 3.604 3.571 5.806 3.571h9.514a3.999 3.999 0 0 0 3.993-4.001v-19.49c0-4.975 2.751-6.074 6.155-2.443l6.111 6.518c1.51 1.61 4.528 2.916 6.734 2.916h7c2.21 0 5.567-.855 7.52-1.92l9.46-5.16c1.944-1.06 5.309-1.92 7.524-1.92h23.992a4.002 4.002 0 0 0 4.004-3.992v-7.516a3.996 3.996 0 0 0-4.004-3.992h-23.992c-2.211 0-5.601.823-7.564 1.834l-4.932 2.54c-4.423 2.279-12.028 3.858-16.993 3.527l2.97.198c-4.962-.33-10.942-4.12-13.356-8.467l-11.19-20.14c-1.07-1.929-3.733-3.492-5.939-3.492h-7c-2.21 0-4 1.794-4 4.001v19.49c0 4.975-1.14 5.138-2.542.382l-12.827-43.535c-.625-2.12-2.92-3.838-5.127-3.838h-8.008c-2.207 0-3.916 1.784-3.817 4.005l1.92 42.998c.221 4.969-.489 5.068-1.585.224l-15.13-66.825c-.488-2.155-2.681-3.902-4.878-3.902h-8.512a3.937 3.937 0 0 0-3.947 4s.953 77-.047 75.5-13.937-92.072-13.937-92.072C49.252 34.758 47.21 33 45 33H31.999"
            fillRule="evenodd"
          />
        </svg>
      </div>

      {/* Glassmorphic Blur Background */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl z-0 opacity-80"></div>

      {/* FAQ Content */}
      <div className="relative z-10 bg-gray-800/80 backdrop-blur-md rounded-lg shadow-xl py-12 mt-12 max-w-5xl mx-auto text-white">
        {/* Title */}
        <div className="max-w-xl mx-auto text-center mb-12">
          <div className="inline-flex px-6 py-2 mx-auto rounded-full bg-indigo-600/20 border border-indigo-500/50 animate-pulse">
            <h4 className="text-4xl md:text-5xl font-extrabold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-500 animate-fade-in">
              FAQ
            </h4>
          </div>
          <p className="mt-4 text-lg leading-relaxed text-gray-300 animate-slide-in">
            Got questions about our AI-Powered Finance Tracker? Here are the answers you need!
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-12 px-4 md:px-16 mt-12">
          {/* FAQ Item 1 */}
          <div className="flex group hover:bg-indigo-600/20 rounded-lg p-4 transition-all duration-300 border border-gray-700/50">
            <div>
              <div className="flex items-center h-16 border-l-4 border-indigo-500">
                <span className="text-4xl text-indigo-400 px-4 font-bold group-hover:text-white">Q.</span>
              </div>
              <div className="flex items-center h-16 border-l-4 border-gray-600">
                <span className="text-4xl text-gray-400 px-4 font-bold group-hover:text-white">A.</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center h-16">
                <span className="text-lg text-indigo-400 font-bold group-hover:text-white transition-colors duration-300">
                  What is the AI-Powered Finance Tracker?
                </span>
              </div>
              <div className="flex items-center py-2">
                <span className="text-gray-300 text-base group-hover:text-gray-100">
                  The AI-Powered Finance Tracker is an intelligent tool that helps you monitor, manage, and optimize your finances. It uses advanced AI to provide personalized insights, track expenses, and predict future trends to keep you on top of your financial goals.
                </span>
              </div>
            </div>
          </div>

          {/* FAQ Item 2 */}
          <div className="flex group hover:bg-indigo-600/20 rounded-lg p-4 transition-all duration-300 border border-gray-700/50">
            <div>
              <div className="flex items-center h-16 border-l-4 border-indigo-500">
                <span className="text-4xl text-indigo-400 px-4 font-bold group-hover:text-white">Q.</span>
              </div>
              <div className="flex items-center h-16 border-l-4 border-gray-600">
                <span className="text-4xl text-gray-400 px-4 font-bold group-hover:text-white">A.</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center h-16">
                <span className="text-lg text-indigo-400 font-bold group-hover:text-white transition-colors duration-300">
                  How does the AI improve my budgeting?
                </span>
              </div>
              <div className="flex items-center py-2">
                <span className="text-gray-300 text-base group-hover:text-gray-100">
                  Our AI analyzes your spending patterns, categorizes expenses automatically, and suggests budget adjustments tailored to your lifestyle. It learns from your habits to offer smarter, proactive recommendations over time.
                </span>
              </div>
            </div>
          </div>

          {/* FAQ Item 3 */}
          <div className="flex group hover:bg-indigo-600/20 rounded-lg p-4 transition-all duration-300 border border-gray-700/50">
            <div>
              <div className="flex items-center h-16 border-l-4 border-indigo-500">
                <span className="text-4xl text-indigo-400 px-4 font-bold group-hover:text-white">Q.</span>
              </div>
              <div className="flex items-center h-16 border-l-4 border-gray-600">
                <span className="text-4xl text-gray-400 px-4 font-bold group-hover:text-white">A.</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center h-16">
                <span className="text-lg text-indigo-400 font-bold group-hover:text-white transition-colors duration-300">
                  Can the Finance Tracker predict my future expenses?
                </span>
              </div>
              <div className="flex items-center py-2">
                <span className="text-gray-300 text-base group-hover:text-gray-100">
                  Yes! The AI-Powered Finance Tracker uses predictive analytics to forecast your upcoming expenses based on historical data, helping you plan ahead and avoid financial surprises.
                </span>
              </div>
            </div>
          </div>

          {/* FAQ Item 4 */}
          <div className="flex group hover:bg-indigo-600/20 rounded-lg p-4 transition-all duration-300 border border-gray-700/50">
            <div>
              <div className="flex items-center h-16 border-l-4 border-indigo-500">
                <span className="text-4xl text-indigo-400 px-4 font-bold group-hover:text-white">Q.</span>
              </div>
              <div className="flex items-center h-16 border-l-4 border-gray-600">
                <span className="text-4xl text-gray-400 px-4 font-bold group-hover:text-white">A.</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center h-16">
                <span className="text-lg text-indigo-400 font-bold group-hover:text-white transition-colors duration-300">
                  Is my financial data secure with the AI Tracker?
                </span>
              </div>
              <div className="flex items-center py-2">
                <span className="text-gray-300 text-base group-hover:text-gray-100">
                  Absolutely. We use state-of-the-art encryption and security protocols to protect your data. The AI processes information securely, ensuring your privacy is never compromised.
                </span>
              </div>
            </div>
          </div>

          {/* FAQ Item 5 */}
          <div className="flex group hover:bg-indigo-600/20 rounded-lg p-4 transition-all duration-300 border border-gray-700/50">
            <div>
              <div className="flex items-center h-16 border-l-4 border-indigo-500">
                <span className="text-4xl text-indigo-400 px-4 font-bold group-hover:text-white">Q.</span>
              </div>
              <div className="flex items-center h-16 border-l-4 border-gray-600">
                <span className="text-4xl text-gray-400 px-4 font-bold group-hover:text-white">A.</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center h-16">
                <span className="text-lg text-indigo-400 font-bold group-hover:text-white transition-colors duration-300">
                  How do I get started with the Finance Tracker?
                </span>
              </div>
              <div className="flex items-center py-2">
                <span className="text-gray-300 text-base group-hover:text-gray-100">
                  Simply sign up, connect your accounts, and let the AI do the rest. It’ll start analyzing your finances immediately and provide actionable insights within minutes.
                </span>
              </div>
            </div>
          </div>

          {/* FAQ Item 6 */}
          <div className="flex group hover:bg-indigo-600/20 rounded-lg p-4 transition-all duration-300 border border-gray-700/50">
            <div>
              <div className="flex items-center h-16 border-l-4 border-indigo-500">
                <span className="text-4xl text-indigo-400 px-4 font-bold group-hover:text-white">Q.</span>
              </div>
              <div className="flex items-center h-16 border-l-4 border-gray-600">
                <span className="text-4xl text-gray-400 px-4 font-bold group-hover:text-white">A.</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center h-16">
                <span className="text-lg text-indigo-400 font-bold group-hover:text-white transition-colors duration-300">
                  Does the Finance Tracker integrate with other tools?
                </span>
              </div>
              <div className="flex items-center py-2">
                <span className="text-gray-300 text-base group-hover:text-gray-100">
                  Yes, it seamlessly integrates with popular banking apps, payment platforms, and even our AI-Powered Website Builder to give you a holistic view of your financial and business performance.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;