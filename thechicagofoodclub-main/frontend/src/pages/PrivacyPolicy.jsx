import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="p-8 px-6 md:px-16 py-8 max-w-4xl mx-auto bg-[#F9F7F3] shadow-md rounded-md">
      <h1 className="text-4xl text-[#212121] font-playfair font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4 text-sm text-[#404040] font-montserrat">
        Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information in accordance with U.S. laws.
      </p>

      <h2 className="text-2xl text-[#212121] font-montserrat font-medium mt-6 mb-2">Information We Collect</h2>
      <ul className="list-disc list-inside mb-4 text-sm text-[#404040] font-montserrat">
        <li>Personal information you provide directly (name, email, phone number).</li>
        <li>Information collected automatically (IP address, browser type, cookies).</li>
        <li>Information from third-party services, if integrated.</li>
      </ul>

      <h2 className="text-2xl text-[#212121] font-montserrat font-medium mt-6 mb-2">How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-4 text-sm text-[#404040] font-montserrat">
        <li>To provide and improve our services.</li>
        <li>To communicate with you about updates, offers, and support.</li>
        <li>To comply with legal obligations and prevent fraud.</li>
      </ul>

      <h2 className="text-2xl text-[#212121] font-montserrat font-medium mt-6 mb-2">Sharing Your Information</h2>
      <p className="mb-4 text-sm text-[#404040] font-montserrat">
        We do not sell your personal information. We may share data with trusted service providers, business partners, or if required by law.
      </p>

      <h2 className="text-2xl text-[#212121] font-montserrat font-medium mt-6 mb-2">Security</h2>
      <p className="mb-4 text-sm text-[#404040] font-montserrat">
        We implement reasonable administrative, technical, and physical measures to protect your information.
      </p>

      <h2 className="text-2xl text-[#212121] font-montserrat font-medium mt-6 mb-2">Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy, please contact us at <a href="mailto:info@thechicagofoodclub.com " className="text-[#C8A76F] font-montserrat hover:text-black/70">info@thechicagofoodclub.com </a>.
      </p>
    </div>
  );
}
