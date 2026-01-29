import { useState, useEffect } from "react";

export default function HeroSection() {
  const [headerHeight, setHeaderHeight] = useState(0);
  useEffect(() => {
    const header = document.querySelector("header");
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }

    const handleResize = () => {
      const header = document.querySelector("header");
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //  const scrollToSection = (id) => {
  //   if (window.location.pathname !== "/") {
  //     navigate("/", { state: { scrollTo: id } });
  //   } else {
  //     const element = document.getElementById(id);
  //     if (element) element.scrollIntoView({ behavior: "smooth" });
  //   }
  // };
  const scrollToSection = (id) => {
  const element = document.getElementById(id);
  const header = document.querySelector("header");

  if (element && header) {
    const yOffset = -header.offsetHeight; // push content below navbar
    const y =
      element.getBoundingClientRect().top + window.scrollY + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  }
};


  return (
    <section
      className="relative bg-black text-white min-h-full flex flex-col items-center justify-center text-center px-4"
      style={{
        
        backgroundImage: "url('/hero-pic2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `100dvh`,
        // marginTop: headerHeight,
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative mt-20 z-10 min-h-2xl max-w-4xl">
        {/* Top tagline */}
        <p className="text-[#C8A76F] tracking-widest uppercase text-lg sm:text-sm mb-4 font-montserrat max-w-full"
        style={{ letterSpacing: "0.1rem" }}>
          Chicago's Exclusive Culinary Society
        </p>

        {/* Main heading */}
        <h1 className="text-2xl sm:text-5xl md:text-6xl font-playfair leading-tight mb-4">
          Exceptional Dining &<br /> Distinguished Company
        </h1>

        {/* Sub text */}
        <p className="text-white/66 text-sm sm:text-lg max-w-3xl mx-auto mb-6 font-montserrat">
          An invitation-only community for professionals and food enthusiasts
          seeking remarkable culinary experiences and meaningful connections.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-12">
          <button
            onClick={() => scrollToSection("join")}
            className="bg-[#c8a76f] font-montserrat hover:bg-black text-white text-lg sm:text-base px-4 sm:px-8 py-2 sm:py-3 font-semibold">
            Become a Member
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="border font-montserrat border-white text-lg sm:text-base px-4 sm:px-8 py-2 sm:py-3 font-semibold hover:bg-white hover:text-black">
            Discover More
          </button>
        </div>

        {/* Scroll to explore */}
        <div className="flex flex-col items-center">
          <span className="text-sm sm:text-sm font-semibold font-montserrat text-white/70 mb-3">
            Scroll to explore
          </span>
          <span className="block w-[2px] h-10 waterfall-line"></span>
        </div>
      </div>
    </section>
  );
}
