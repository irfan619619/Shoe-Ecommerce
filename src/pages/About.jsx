import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-blue-950 text-white min-h-screen p-6">
        <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>

        <div className="max-w-4xl mx-auto">
          <section className="mb-8">
            <h2 className="text-3xl font-semibold mb-4">Who We Are</h2>
            <p className="text-lg">
              At Kicks Vibe, we believe in offering the best and most trendy shoes that match your unique style and comfort needs. Our mission is to provide high-quality footwear that brings both fashion and functionality to your feet. From running shoes to formal styles, we've got something for everyone.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
            <p className="text-lg">
              Kicks Vibe was founded in 2025 by a group of passionate footwear enthusiasts. After years of searching for a one-stop shop that offered both style and comfort, we decided to create it ourselves. What started as a small project quickly grew into a brand that represents quality, affordability, and trendsetting designs.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
            <p className="text-lg">
              Our vision is to become the leading destination for shoe lovers everywhere. We aim to continuously offer new styles, unbeatable quality, and a seamless shopping experience, all while fostering a community that shares our love for footwear.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
