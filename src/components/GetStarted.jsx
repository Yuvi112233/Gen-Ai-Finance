import React, { Suspense } from "react";
import Particles from "./Particles";

// Dynamically import Spline to avoid errors if the package isn't found
const Spline = React.lazy(() => import("@splinetool/react-spline"));

const GetStarted = () => {
  return (
    <section className="bg-white lg:grid lg:h-screen lg:place-content-center relative overflow-hidden">
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
      <div className="mx-auto w-screen max-w-screen-2xl px-12 py-24 sm:px-16 sm:py-32 md:grid md:grid-cols-2 md:items-center md:gap-12 lg:px-20 lg:py-40">
        <div className="max-w-prose text-left relative z-10 ml-20">
          <h1 className="text-5xl font-bold text-gray-900 sm:text-6xl">
            Build smarter financial tools with
            <strong className="text-indigo-600"> AI </strong>
          </h1>
          <p className="mt-6 text-lg text-pretty text-gray-700 sm:text-xl/relaxed">
            Create powerful AI-driven finance solutions to track expenses, optimize budgets, and analyze investments—all with ease and precision.
          </p>
          <div className="mt-6 flex gap-6 sm:mt-8">
            <a
              className="inline-block rounded border border-indigo-600 bg-indigo-600 px-6 py-4 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
              href="/form"
            >
              Start Building
            </a>
            <a
              className="inline-block rounded border border-gray-200 px-6 py-4 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
              href="#"
            >
              Explore Features
            </a>
          </div>
        </div>
        <div className="mx-auto hidden md:block w-full max-w-xs lg:max-w-xs xl:max-w-sm">
          <Suspense fallback={<div>Loading Spline...</div>}>
            <Spline scene="https://prod.spline.design/xUHSvZEsYbtgQ7Za/scene.splinecode" className="w-full h-auto scale-[1.5]" />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;