// import React from 'react';

// export default function AboutClub() {
//     return (
//         <section className="flex flex-col min-h-full md:flex-row items-center justify-center gap-2 bg-[#f9f8f5] px-6 py-12 md:px-16">
//             {/* Image */}
//             <div className="w-full w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
//                 <img
//                     src="/about-section.jpg"
//                     alt="Culinary Experience"
//                     className="shadow-lg rounded-md w-full max-w-md object-cover"
//                 />
//             </div>

//             {/* Text Content */}
//             <div className="w-full md:w-1/2 ">
//                 <p className="text-sm tracking-widest text-[#bfa268] font-semibold mb-6">
//                     OUR STORY
//                 </p>
//                 <h2 className="text-5xl font-serif font-bold mb-6">About the Club</h2>
//                 <p className="text-gray-800 leading-relaxed mb-4 font-sans w-6/7">
//                     The Chicago Food Club brings together food lovers from all walks of life - creative minds, passionate professionals, and culinary enthusiasts who share a love for exceptional dining experiences and meaningful connections.
//                 </p>
//                 <p className="text-gray-800 leading-relaxed mb-4  font-sans w-6/7">
//                     Our community is a warm gathering of cool people who appreciate great food, good company, and unforgettable moments around the table. Whether you're discovering hidden gems or savoring celebrated cuisine, you'll find your tribe here.
//                 </p>
//                 <p className="text-gray-800 leading-relaxed mb-12  font-sans w-6/7">
//                     Join us for intimate dinners, exclusive tastings, and culinary adventures that celebrate Chicago's incredible food scene while building lasting friendships over shared meals.
//                 </p>
//                 <button className="bg-[#bfa268] hover:bg-black text-white font-semibold px-6 py-3 rounded-md shadow">
//                     Join Our Community
//                 </button>
//             </div>
//         </section>
//     );
// };


import React from 'react';

export default function AboutClub() {
    const scrollToJoin = () => {
    if (window.location.pathname !== "/") {
      // If not on homepage, navigate and pass state
      navigate("/", { state: { scrollTo: "join" } });
    } else {
      // If already on homepage, smooth scroll
      const element = document.getElementById("join");
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section className="flex flex-col md:flex-row min-h-full items-center justify-center gap-6 bg-white px-6 py-12 md:px-16">

      {/* Image (desktop left, mobile middle) */}
      <div className="w-full md:w-1/2 order-2 md:order-1 flex justify-center my-6 md:my-0">
        <img
          src="/about-section.jpg"
          alt="Culinary Experience"
          className="shadow-lg rounded-md w-full max-w-md object-cover"
        />
      </div>

      {/* Right side container (Heading + Text) */}
      <div className="w-full md:w-1/2 order-1 md:order-2 text-center md:text-left flex flex-col items-center md:items-start">

        {/* Heading (always on top on mobile, on desktop grouped with text) */}
        <div className="mb-6">
          <p className="text-[#c8a76f] tracking-widest text-sm mb-4 font-montserrat mb-10">
            OUR STORY
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-playfair text-[#212121] font-bold mb-2">
            About the Club
          </h2>
        </div>

        {/* Text */}
        <div className="flex flex-col items-center md:items-start leading-relaxed">
          <p className="text-[#404040] leading-relaxed mb-4 max-w-lg font-montserrat">
            The Chicago Food Club brings together food lovers from all walks of life - creative minds, passionate professionals, and culinary enthusiasts who share a love for exceptional dining experiences and meaningful connections.
          </p>
          <p className="text-[#404040] leading-relaxed mb-4 max-w-lg font-montserrat">
            Our community is a warm gathering of cool people who appreciate great food, good company, and unforgettable moments around the table. Whether you're discovering hidden gems or savoring celebrated cuisine, you'll find your tribe here.
          </p>
          <p className="text-[#404040] leading-relaxed mb-4 max-w-lg font-montserrat">
            Join us for intimate dinners, exclusive tastings, and culinary adventures that celebrate Chicago's incredible food scene while building lasting friendships over shared meals.
          </p>
          <button
            onClick={scrollToJoin}
            className="bg-[#c8a76f] hover:bg-black font-montserrat text-white font-semibold px-6 py-3 shadow mt-4" style={{ letterSpacing: '0.025rem' }}>
            Join Our Community
          </button>
        </div>
      </div>
    </section>
  );
};

