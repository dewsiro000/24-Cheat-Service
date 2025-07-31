import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction: React.FC = () => (
  <section className="text-center font-mono py-13 bg-gray-200">
    <h2 className="text-2xl font-bold mb-5">Join the 24 Cheat Service Community</h2>
    <p className="text-md mb-7">
      Sign up now to start using the service and get access to even more features!
    </p>
    <Link
      to="/signup"
      className="bg-blue-600 font-mono text-white py-2 px-6 rounded-full text-lg hover:bg-blue-700"
    >
      Sign Up
    </Link>
  </section>
);

export default CallToAction;
