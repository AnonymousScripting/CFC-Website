import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "../componenets/HeroSection";
import AboutClub from "../componenets/AboutClub";
import ContactSection from "../componenets/ContactSection";
import JoinForm from "../componenets/JoinForm";
import Footer from "../componenets/Footer";
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

      <section id="about">
        <AboutClub />
      </section>

      <section id="benefits">
        <MembershipPrivileges />
      </section>

      <section id="join">
        <JoinForm />
      </section>

        <section id="contact">
        <ContactSection />
      </section>

      <Footer />
    </>
  );
}
