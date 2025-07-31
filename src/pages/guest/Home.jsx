import React from "react";
import Hero from "../../components/Hero";
import DoctorCarousel from "../../components/guest/DoctorCarousel";
import FeedbackCarousel from "../../components/guest/FeedbackCarousel";
import AIChatbotIcon from "../../components/AIChatbotIcon";

export default function Home() {
  return (
    <div>
      <main>
        <Hero />
        <section style={{ marginTop: "2rem", marginBottom: "2rem" }}>
          <DoctorCarousel />
        </section>
        <section style={{ marginTop: "2rem", marginBottom: "2rem" }}>
          <FeedbackCarousel />
        </section>
      </main>
      <AIChatbotIcon />
    </div>
  );
}
