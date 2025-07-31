import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useIsMdOrLarger from "../../hooks/useIsMdOrLarger";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isMdOrLarger = useIsMdOrLarger();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 }
    );

    const target = document.querySelector(".hero-section");
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  const content = (
    <>
      <h2 className="text-3xl font-mono font-bold mb-4">
        Get Instant Solutions for Game 24
      </h2>
      <p className="text-lg mb-6">
        Easily calculate the possible solutions for the 24 game using any 4
        numbers.
      </p>
      <div className="flex justify-center items-center">
      <Link
        to="/get-answers"
        className="bg-yellow-500 font-mono hover:bg-yellow-400/80 text-white py-2 px-6  rounded-full text-lg "
      >
        Try it Now
      </Link>
      </div>
    </>
  );

  return (
    <>
      {isMdOrLarger ? (
        <section className="hero-section">
          <div
            className={`bg-blue-200 bg-opacity-50 p-6 rounded-lg border-4 border-blue-400 max-w-2xl mx-auto w-full  ${
              isVisible ? "animate-fade-in" : ""
            }`}
          >
            <motion.div
              className="max-w-2xl mx-auto w-full "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {content}
            </motion.div>
          </div>
        </section>
      ) : (
        <section className="bg-blue-200 bg-opacity-50 p-6 rounded-lg border-4 border-blue-400 max-w-2xl mx-auto w-full">
          {content}
        </section>
      )}
    </>
  );
};

export default HeroSection;
