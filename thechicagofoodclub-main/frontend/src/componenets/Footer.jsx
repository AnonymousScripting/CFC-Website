import React from "react";
import { Facebook, Twitter, Mail, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SiTiktok, SiInstagram } from "react-icons/si";

const Footer = () => {
  const navigate = useNavigate();

  const handleScroll = (sectionId) => {
    navigate("/", { state: { scrollTo: sectionId } });
  };

  return (
    <footer className="bg-[#1A1A1A] text-[#B1B1B1] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto md:mx-20">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Title and Description */}
          <div className="w-full md:w-1/3 mb-6 ">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <h2 className="font-playfair text-2xl text-white font-bold xs:mb-0">
                Chicago Food Club
              </h2>
            </div>

            <p className="mb-6 mt-2 text-white/70 font-montserrat max-w-md text-center md:text-left">
              An exclusive community of culinary enthusiasts and professionals
              united by a shared passion for exceptional dining experiences and
              meaningful connections.
            </p>
            {/* Social Media Icons */}
            <div className="flex text-white items-center justify-center md:justify-start space-x-4">
              <a
                href="https://www.tiktok.com/@thechicagofoodclub"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#c7a462] transition"
              >
                <SiTiktok size={24} />
              </a>
              <a
                href="https://www.instagram.com/chicagofoodclub/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#c7a462] transition"
              >
                <SiInstagram size={24} />
              </a>
            </div>
          </div>

          {/* Links and Contact */}
          <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-center md:text-left">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg text-white font-semibold font-playfair mb-3">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleScroll("about")}
                    className="text-white/70 font-montserrat cursor-pointer hover:text-[#c7a462]  transition"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleScroll("contact")}
                    className="text-white/70 font-montserrat cursor-pointer hover:text-[#c7a462] transition"
                  >
                    Contact
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleScroll("benefits")}
                    className="text-white/70 font-montserrat cursor-pointer hover:text-[#c7a462] transition"
                  >
                    Member Benefits
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleScroll("join")}
                    className="text-white/70 font-montserrat cursor-pointer hover:text-[#c7a462] transition"
                  >
                    Join Now
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg text-white font-semibold font-playfair mb-3">
                Contact Information
              </h3>
              <ul className="space-y-3 ">
                <li className="flex items-center justify-center md:justify-start">
                  <MapPin className="mr-2 h-5 w-5 text-[#c7a462]" />
                  <span className="text-white/70 font-montserrat">Chicago, IL</span>
                </li>
                <li className="flex items-center justify-center md:justify-start">
                  <Mail className="mr-2 h-5 w-5 text-[#c7a462]" />
                  <a
                    href="mailto:info@thechicagofoodclub.com"
                    className="text-white/70 hover:text-[#c7a462] font-montserrat transition-colors"
                  >
                    info@thechicagofoodclub.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-center gap-4 items-center">
          <p className="mb-4 md:mb-0 text-sm font-montserrat">
            © 2025 Chicago Food Club. All rights reserved.
          </p>
          <div className="flex space-x-4 font-montserrat text-sm">
            <a href="/privacy" className="hover:text-[#c7a462] transition">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-[#c7a462] font-montserrat transition">
              Terms of Service
            </a>
            <a href="/cookies" className="hover:text-[#c7a462] font-montserrat transition">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// import React from "react";
// import { Facebook, Instagram, Twitter, Mail, MapPin } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const Footer = () => {
//   const navigate = useNavigate();

//   const handleScroll = (sectionId) => {
//     navigate("/", { state: { scrollTo: sectionId } });
//   };

//   return (
//     <footer className="bg-[#1A1A1A] text-[#B1B1B1] py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-8xl mx-auto">
//         {/* Top Section */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
//           {/* Left: Logo + About */}
//           <div className="flex flex-col items-center md:items-start">
//             <h2 className="font-playfair text-2xl text-white font-bold mb-2">
//               Chicago Food Club
//             </h2>
//             <p className="mb-6 mt-2 text-white/70 max-w-sm">
//               An exclusive community of culinary enthusiasts and professionals
//               united by a shared passion for exceptional dining experiences and
//               meaningful connections.
//             </p>
//             {/* Social Media Icons */}
//             <div className="flex text-white space-x-4 justify-center md:justify-start">
//               <a href="#" className="hover:text-[#c7a462] transition">
//                 <Facebook size={24} />
//               </a>
//               <a href="#" className="hover:text-[#c7a462] transition">
//                 <Instagram size={24} />
//               </a>
//               <a href="#" className="hover:text-[#c7a462] transition">
//                 <Twitter size={24} />
//               </a>
//             </div>
//           </div>

//           {/* Middle: Quick Links */}
//           <div className="flex flex-col items-center md:items-start">
//             <h3 className="text-lg text-white font-semibold mb-4">
//               Quick Links
//             </h3>
//             <ul className="space-y-2">
//               <li>
//                 <button
//                   onClick={() => handleScroll("about")}
//                   className="text-white/70 hover:text-[#c7a462] transition"
//                 >
//                   About Us
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => handleScroll("contact")}
//                   className="text-white/70 hover:text-[#c7a462] transition"
//                 >
//                   Contact
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => handleScroll("benefits")}
//                   className="text-white/70 hover:text-[#c7a462] transition"
//                 >
//                   Membership Benefits
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => handleScroll("gallery")}
//                   className="text-white/70 hover:text-[#c7a462] transition"
//                 >
//                   Gallery
//                 </button>
//               </li>
//             </ul>
//           </div>

//           {/* Right: Contact Info */}
//           <div className="flex flex-col items-center md:items-start">
//             <h3 className="text-lg text-white font-semibold mb-4">
//               Contact Information
//             </h3>
//             <ul className="space-y-3">
//               <li className="flex items-center justify-center md:justify-start">
//                 <MapPin className="mr-2 h-5 w-5 text-[#c7a462]" />
//                 <span className="text-white/70">Chicago, IL</span>
//               </li>
//               <li className="flex items-center justify-center md:justify-start">
//                 <Mail className="mr-2 h-5 w-5 text-[#c7a462]" />
//                 <a
//                   href="mailto:chicagofoodclub@gmail.com"
//                   className="text-white/70 hover:text-[#c7a462] transition-colors"
//                 >
//                   chicagofoodclub@gmail.com
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Section */}
//         <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-center md:justify-between items-center text-sm text-center">
//           <p className="mb-4 md:mb-0">
//             © 2025 Chicago Food Club. All rights reserved.
//           </p>
//           <div className="flex space-x-6">
//             <a href="/privacy" className="hover:text-[#c7a462] transition">
//               Privacy Policy
//             </a>
//             <a href="/terms" className="hover:text-[#c7a462] transition">
//               Terms of Service
//             </a>
//             <a href="/cookies" className="hover:text-[#c7a462] transition">
//               Cookie Policy
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
