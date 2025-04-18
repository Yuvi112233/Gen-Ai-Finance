import React from 'react';
import Particles from './Particles';

const AboutUs = () => {
  return (
    <div id='about' className="max-w-lg px-4 mx-auto text-left md:max-w-none md:text-center">
      <h2 className="text-3xl font-bold mb-8 md:text-4xl">About Us</h2>
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

      <div className="sm:mx-72 sm:mt-20 mt-8">
        {/* Section 1: BudgetWise */}
        <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 sm:border-0 rounded-xl sm:rounded-0 border">
          <div className="flex flex-col items-center justify-between w-full lg:flex-row">
            <img
              className="hidden sm:block"
              alt="BudgetWise Logo"
              width="230"
              height="230"
              src="https://i.pinimg.com/564x/3a/4c/78/3a4c78091217ef8ee5f852d4129b5433.jpg"
            />
            <div className="lg:mb-0 lg:max-w-lg lg:pr-5">
              <div className="max-w-xl mb-6">
                <h2 className="text-left text-xl sm:mt-0 mt-6 font-semibold tracking-tight sm:text-2xl sm:leading-none max-w-lg mb-6">
                  Gen AI Finance
                </h2>
                <div className="text-left text-base md:text-lg">
                  <p>
                    Gen-AI Finance is your ultimate finance tracker, designed to help you take control of your money. We
                    simplify budgeting, track your expenses, and set savings goals to ensure you achieve financial
                    freedom with ease.
                  </p>
                  <div className="text-sky-600 mt-4">
                    <a
                      href="https://budgetwise.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-neutral-200 text-lg px-4 py-1.5 rounded-md inline-block"
                    >
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  */}
        <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-12 sm:border-0 rounded-xl sm:rounded-0 border sm:mt-0 mt-8">
          <div className="flex flex-col items-center justify-between w-full lg:flex-row">
            <div className="lg:mb-0 lg:max-w-lg lg:pr-5">
              <div className="max-w-xl mb-6">
                <h2 className="text-left text-xl font-semibold tracking-tight sm:pt-0 pt-5 sm:text-2xl sm:leading-none max-w-lg mb-6">
                  GenAI Finance
                </h2>
                <div className="text-left text-base md:text-lg">
                  <p>
                    GEN-AI Finance empowers you with smart financial insights. From tracking daily expenses to planning for
                    the future, our tools help you stay on top of your finances and make informed decisions effortlessly.
                  </p>
                  <div className="text-sky-600 mt-4">
                    <a
                      href="https://moneymind.tech"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-neutral-200 text-lg px-4 py-1.5 rounded-md inline-block"
                    >
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3"></div>
            </div>
            <img
              className="hidden sm:block"
              alt="MoneyMind Logo"
              width="230"
              height="230"
              src="https://i.pinimg.com/564x/3a/4c/78/3a4c78091217ef8ee5f852d4129b5433.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;