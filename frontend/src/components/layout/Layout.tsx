import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HowItWorks from "./HowItWorks";
import CallToAction from "./CallToAction";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <main>{children}</main>
      <HowItWorks />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Layout;
