import { assets } from "../assets/assets";

const AppDownload = () => {
  return (
    <div className="container px-4 2xl:px-20 mx-auto my-20">
      <section className="relative py-12 bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white rounded-3xl shadow-2xl p-12 sm:p-24 lg:p-32 overflow-hidden">
        
        {/* Content Section */}
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-6 leading-snug">
            Unlock Your Career <br />
            Anywhere, Anytime!
          </h1>
          <p className="text-lg opacity-80 mb-8">
            Download the app and never miss an opportunity again.
          </p>

          {/* App Store Buttons */}
          <div className="flex gap-4">
            <a href="#" className="inline-block">
              <img
                className="h-14 hover:scale-105 transition-transform duration-300"
                src={assets.play_store}
                alt="Google Play"
              />
            </a>
            <a href="#" className="inline-block">
              <img
                className="h-14 hover:scale-105 transition-transform duration-300"
                src={assets.app_store}
                alt="App Store"
              />
            </a>
          </div>
        </div>

        {/* Floating App Image */}
        <img
          className="absolute w-65 lg:w-105 right-0 bottom-0 translate-x-12 translate-y-6 drop-shadow-lg max-lg:hidden"
          src={assets.app_main_img}
          alt="App Showcase"
        />

      </section>
    </div>
  );
};

export default AppDownload;
