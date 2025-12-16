function Hero() {
  return (
    <main className="bg-[#1E73E8] py-24 text-white">
      <div className="max-w-3xl mx-auto text-center px-6">

        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
          The Conversion Platform<br />
          for Marketers
        </h2>

        <p className="mt-6 text-lg text-blue-100">
          Build landing pages, popups, and sticky bars that convert more visitors
          into customers — without a developer.
        </p>

        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <button className="bg-white text-[#1E73E8] px-7 py-3 rounded-md font-semibold shadow">
            Get Started
          </button>

          <button className="border border-white px-7 py-3 rounded-md font-semibold">
            Learn More
          </button>
        </div>

      </div>
    </main>
  );
}

export default Hero;
