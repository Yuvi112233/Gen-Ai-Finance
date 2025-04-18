import React from 'react';
import Particles from './Particles';

const Features = () => {
  return (
    <>
      <section id="features" className="relative bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800 text-white overflow-hidden">
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
        <div className="py-10 sm:py-16 lg:py-24 relative bg-opacity-50 z-40">
          <div className="relative mx-auto h-full px-4 pb-20 md:pb-10 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
            {/* Background SVGs with Opacity */}
            <div className="absolute top-0 -right-1/4 z-0 opacity-20 transform rotate-12">
              <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 6C12 5.44772 11.5523 5 11 5C10.4477 5 10 5.44772 10 6V16C10 16.5523 10.4477 17 11 17C11.5523 17 12 16.5523 12 16V6ZM9 9C9 8.44772 8.55228 8 8 8C7.44772 8 7 8.44772 7 9V16C7 16.5523 7.44772 17 8 17C8.55228 17 9 16.5523 9 16V9ZM15 9C15 8.44772 14.5523 8 14 8C13.4477 8 13 8.44772 13 9V16C13 16.5523 13.4477 17 14 17C14.5523 17 15 16.5523 15 16V9ZM18 13C18 12.4477 17.5523 12 17 12C16.4477 12 16 12.4477 16 13V16C16 16.5523 16.4477 17 17 17C17.5523 17 18 16.5523 18 16V13ZM6 15C6 14.4477 5.55228 14 5 14C4.44772 14 4 14.4477 4 15V16C4 16.5523 4.44772 17 5 17C5.55228 17 6 16.5523 6 16V15ZM21 15C21 14.4477 20.5523 14 20 14C19.4477 14 19 14.4477 19 15V16C19 16.5523 19.4477 17 20 17C20.5523 17 21 16.5523 21 16V15ZM4 18C3.44772 18 3 18.4477 3 19C3 19.5523 3.44772 20 4 20H21C21.5523 20 22 19.5523 22 19C22 18.4477 21.5523 18 21 18H4Z"/>
              </svg>
            </div>
            <div className="absolute -bottom-0 -left-1/4 z-0 opacity-20 transform -rotate-90">
              <svg width="800px" height="800px" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" className="w-48 h-full object-fill fill-pink-400">
                <path d="M32 225h12.993A4.004 4.004 0 0 0 49 220.997V138.01c0-4.976.724-5.04 1.614-.16l12.167 66.708c.397 2.177 2.516 3.942 4.713 3.942h8.512a3.937 3.937 0 0 0 3.947-4S79 127.5 80 129s14.488 52.67 14.488 52.67c.559 2.115 2.8 3.83 5.008 3.83h8.008a3.993 3.993 0 0 0 3.996-3.995v-43.506c0-4.97 1.82-5.412 4.079-.965l10.608 20.895c1.001 1.972 3.604 3.571 5.806 3.571h9.514a3.999 3.999 0 0 0 3.993-4.001v-19.49c0-4.975 2.751-6.074 6.155-2.443l6.111 6.518c1.51 1.61 4.528 2.916 6.734 2.916h7c2.21 0 5.567-.855 7.52-1.92l9.46-5.16c1.944-1.06 5.309-1.92 7.524-1.92h23.992a4.002 4.002 0 0 0 4.004-3.992v-7.516a3.996 3.996 0 0 0-4.004-3.992h-23.992c-2.211 0-5.601.823-7.564 1.834l-4.932 2.54c-4.423 2.279-12.028 3.858-16.993 3.527l2.97.198c-4.962-.33-10.942-4.12-13.356-8.467l-11.19-20.14c-1.07-1.929-3.733-3.492-5.939-3.492h-7c-2.21 0-4 1.794-4 4.001v19.49c0 4.975-1.14 5.138-2.542.382l-12.827-43.535c-.625-2.12-2.92-3.838-5.127-3.838h-8.008c-2.207 0-3.916 1.784-3.817 4.005l1.92 42.998c.221 4.969-.489 5.068-1.585.224l-15.13-66.825c-.488-2.155-2.681-3.902-4.878-3.902h-8.512a3.937 3.937 0 0 0-3.947 4s.953 77-.047 75.5-13.937-92.072-13.937-92.072C49.252 34.758 47.21 33 45 33H31.999" fillRule="evenodd"/>
              </svg>
            </div>

            {/* Content */}
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative">
              <div className="max-w-xl mx-auto text-center mb-12">
                <div className="inline-flex px-6 py-2 mx-auto rounded-full bg-indigo-600/20 border border-indigo-500/50 animate-pulse">
                  <p className="text-4xl font-bold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-500">Features</p>
                </div>
                <p className="mt-4 text-lg leading-relaxed text-gray-300">
                  Discover the power of our innovative tools designed to transform your digital presence and streamline your business operations.
                </p>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {/* Smart Tracking Feature */}
                <a href="#" className="transition-all duration-500 bg-gray-800/80 backdrop-blur-md rounded-xl p-6 hover:bg-indigo-600/90 hover:shadow-2xl hover:scale-105 border border-gray-700/50 group relative z-40">
                  <div className="absolute top-0 left-0 w-1/3 h-1 bg-gradient-to-r from-indigo-500 to-transparent rounded-tl-xl transition-all duration-300 group-hover:w-2/3 group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-indigo-400"></div>
                  <div className="py-2 px-9 relative">
                    <svg className="w-16 h-16 fill-gray-400 group-hover:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                    </svg>
                    <h3 className="mt-8 text-xl font-semibold text-white group-hover:text-white">Smart Tracking</h3>
                    <p className="mt-4 text-base text-gray-400 group-hover:text-gray-100">
                      Easily monitor your income, expenses, and spending habits in real time. Our intuitive dashboard categorizes your transactions automatically. Stay informed and in control of your financial health effortlessly.
                    </p>
                  </div>
                </a>

                {/* Goal Planning Feature */}
                <a href="#" className="transition-all duration-500 bg-gray-800/80 backdrop-blur-md rounded-xl p-6 hover:bg-indigo-600/90 hover:shadow-2xl hover:scale-105 border border-gray-700/50 group relative z-40">
                  <div className="absolute top-0 left-0 w-1/3 h-1 bg-gradient-to-r from-indigo-500 to-transparent rounded-tl-xl transition-all duration-300 group-hover:w-2/3 group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-indigo-400"></div>
                  <div className="py-2 px-9 relative">
                    <svg className="w-16 h-16 fill-gray-400 group-hover:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h-3v-2h3v-2H8V9h3V7h2v2h3v3h-3v2h3v2h-2z"/>
                    </svg>
                    <h3 className="mt-8 text-xl font-semibold text-white group-hover:text-white">Goal Planning</h3>
                    <p className="mt-4 text-base text-gray-400 group-hover:text-gray-100">
                      Set personalized savings and budgeting goals that fit your lifestyle. Track your progress with detailed insights and make adjustments as needed. Achieve financial stability by staying committed to your targets.
                    </p>
                  </div>
                </a>

                {/* AI Insights Feature */}
                <a href="#" className="transition-all duration-500 bg-gray-800/80 backdrop-blur-md rounded-xl p-6 hover:bg-indigo-600/90 hover:shadow-2xl hover:scale-105 border border-gray-700/50 group relative z-40">
                  <div className="absolute top-0 left-0 w-1/3 h-1 bg-gradient-to-r from-indigo-500 to-transparent rounded-tl-xl transition-all duration-300 group-hover:w-2/3 group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-indigo-400"></div>
                  <div className="py-2 px-9 relative">
                    <svg className="w-16 h-16 fill-gray-400 group-hover:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1z"/>
                    </svg>
                    <h3 className="mt-8 text-xl font-semibold text-white group-hover:text-white">AI Insights</h3>
                    <p className="mt-4 text-base text-gray-400 group-hover:text-gray-100">
                      Get personalized financial advice powered by AI to optimize your money management. Receive smart suggestions on where to save, invest, and cut unnecessary expenses.
                    </p>
                  </div>
                </a>

                {/* Bill Alerts Feature */}
                <a href="#" className="transition-all duration-500 bg-gray-800/80 backdrop-blur-md rounded-xl p-6 hover:bg-indigo-600/90 hover:shadow-2xl hover:scale-105 border border-gray-700/50 group relative z-40">
                  <div className="absolute top-0 left-0 w-1/3 h-1 bg-gradient-to-r from-indigo-500 to-transparent rounded-tl-xl transition-all duration-300 group-hover:w-2/3 group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-indigo-400"></div>
                  <div className="py-2 px-9 relative">
                    <svg className="w-16 h-16 fill-gray-400 group-hover:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                    </svg>
                    <h3 className="mt-8 text-xl font-semibold text-white group-hover:text-white">Bill Alerts</h3>
                    <p className="mt-4 text-base text-gray-400 group-hover:text-gray-100">
                      Never miss a due date again with timely bill reminders. Get notifications for upcoming payments to avoid late fees and maintain a good credit score.
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;