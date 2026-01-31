import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "../componenets/HeroSection";
import AboutClub from "../componenets/AboutClub";
import ContactSection from "../componenets/ContactSection";
import JoinForm from "../componenets/JoinForm";
import MembershipPrivileges from "../componenets/MembershipPrivileges";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.state]);
  return (
    <>
      <section id="home">
        <HeroSection />
      </section>

      {/* Seamless content wrapper - overlaps Hero to prevent dark gaps */}
      <div className="bg-[#FBF3E4] -mt-1 relative z-10">
        <section id="about" className="scroll-mt-20 -mt-px">
          <AboutClub />
        </section>

        <section id="benefits" className="scroll-mt-20 -mt-px">
          <MembershipPrivileges />
        </section>

        <section id="join" className="scroll-mt-20 -mt-px">
          <JoinForm />
        </section>

        <section id="contact" className="scroll-mt-20 -mt-px">
          <ContactSection />
        </section>
      </div>
    </>
  );
}
