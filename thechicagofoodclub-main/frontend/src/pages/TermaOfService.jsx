import React from "react";

export default function TermsOfService() {
  return (
    <div className="p-8 px-6 md:px-16 py-8 max-w-4xl mx-auto bg-[#F9F7F3] shadow-md rounded-md">
      <h1 className="text-4xl text-[#212121] font-playfair font-bold mb-6">Terms of Service</h1>

      <p className="mb-4 text-sm text-[#404040] font-montserrat">
        These Terms of Service (“Terms”) govern your use of our website and services in the United States. By using our services, you agree to these Terms.
      </p>

      <h2 className="text-2xl text-[#212121] font-montserrat font-medium mt-6 mb-2">Use of Services</h2>
      <p className="mb-2 text-sm text-[#404040] font-montserrat">
        You may use our services only for lawful purposes and in accordance with these Terms. You agree not to:
      </p>
      <ul className="list-disc list-inside mb-4 text-sm text-[#404040] font-montserrat">
        <li>Engage in unlawful, fraudulent, or harmful activities.</li>
        <li>Interfere with or disrupt our services.</li>
        <li>Attempt to gain unauthorized access to our systems.</li>
      </ul>

      <h2 className="text-2xl text-[#212121] font-montserrat font-medium mt-6 mb-2">Account Responsibilities</h2>
      <p className="mb-4 text-sm text-[#404040] font-montserrat">
        If you create an account, you are responsible for maintaining its confidentiality and all activities under your account.
      </p>

      <h2 className="text-2xl text-[#212121] font-montserrat font-medium mt-6 mb-2">Limitation of Liability</h2>
      <p className="mb-4 text-sm text-[#404040] font-montserrat">
        We are not liable for any indirect, incidental, or consequential damages arising from your use of our services.
      </p>

      <h2 className="text-2xl text-[#212121] font-montserrat font-medium mt-6 mb-2">Termination</h2>
      <p className="mb-4 text-sm text-[#404040] font-montserrat">
        We may suspend or terminate your access for violating these Terms, without prior notice.
      </p>

      <h2 className="text-2xl text-[#212121] font-montserrat font-medium mt-6 mb-2">Governing Law</h2>
      <p className="mb-4 text-sm text-[#404040] font-montserrat">
        These Terms are governed by the laws of the United States and applicable state laws.
      </p>

      <h2 className="text-2xl text-[#212121] font-montserrat font-medium mt-6 mb-2">Contact Us</h2>
      <p>
        Questions regarding these Terms should be directed to <a href="mailto:info@thechicagofoodclub.com 
" className="text-[#C8A76F] font-montserrat hover:text-black/70">info@thechicagofoodclub.com 
</a>.
      </p>
    </div>
  );
}
