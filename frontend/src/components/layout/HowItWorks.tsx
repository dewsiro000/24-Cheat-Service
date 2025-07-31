import React from 'react';

const HowItWorks: React.FC = () => (
  <section className="container mx-auto p-12 text-center">
    <h2 className="text-2xl font-serif  font-bold mb-6">How It Works</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-xl font-serif font-semibold mb-4">Enter 4 Numbers</h3>
        <p>Simply input 4 numbers in any order, and we'll calculate the solutions.</p>
      </div>
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-xl font-mono  font-semibold mb-4">Get Instant Results</h3>
        <p>Our system will provide possible solutions to achieve 24 using the numbers you've entered.</p>
      </div>
      <div className="bg-white  p-6 shadow-lg rounded-lg">
        <h3 className="text-xl font-serif font-semibold mb-4">Game Rules</h3>
        <p>You cannot use duplicate numbers in the game. Each number must be unique!</p>
      </div>
    </div>
  </section>
);

export default HowItWorks;
