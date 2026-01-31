import React from "react";

export default function CookiePolicy() {
  return (
    <div className="p-8 px-6 md:px-16 py-8 max-w-4xl mx-auto bg-[#F9F7F3] shadow-md rounded-md">
      <h1 className="text-4xl text-[#212121] font-playfair font-bold mb-6">Cookie Policy</h1>

      <p className="mb-4 text-sm text-[#404040] font-montserrat">
        This Cookie Policy explains how our website uses cookies and similar technologies in accordance with U.S. standards.
      </p>

      <h2 className="text-2xl text-[#212121] font-montserrat font-medium mt-6 mb-2">What Are Cookies?</h2>
      <p className="mb-4 text-sm text-[#404040] font-montserrat">
        Cookies are small text files stored on your device that help websites remember your preferences and improve your experience.
      </p>

      <h2 className="text-2xl text-[#212121] font-montserrat font-medium mt-6 mb-2">How We Use Cookies</h2>
      <ul className="list-disc list-inside mb-4 text-sm text-[#404040] font-montserrat">
        <li>To provide and personalize services.</li>
        <li>To analyze website usage and performance.</li>
        <li>To remember login and preferences settings.</li>
      </ul>

      <h2 className="text-2xl text-[#212121] font-montserrat font-medium mt-6 mb-2">Your Choices</h2>
      <p className="mb-4 text-sm text-[#404040] font-montserrat">
        You can manage or disable cookies through your browser settings. Please note that disabling cookies may affect functionality.
      </p>

      <h2 className="text-2xl text-[#212121] font-montserrat font-medium mt-6 mb-2">Third-Party Cookies</h2>
      <p className="mb-4 text-sm text-[#404040] font-montserrat">
        Some third-party services may use cookies on our website for analytics or advertising purposes.
      </p>

      <h2 className="text-2xl text-[#212121] font-montserrat font-medium mt-6 mb-2">Contact Us</h2>
      <p>
        For questions about this Cookie Policy, contact us at <a href="mailto:info@thechicagofoodclub.com" className="text-[#C8A76F] font-montserrat hover:text-black/70">info@thechicagofoodclub.com</a>.
      </p>
    </div>
  );
}
