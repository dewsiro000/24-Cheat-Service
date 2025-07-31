import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";
import ProfileMenu from "../ui/ProfileMenu";
import PlusIcon from "../../assets/icons/PlusIcon";
import Hamburger from "../../assets/icons/Hamburger";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHambergerMenuOpen, setIsHambergerMenuOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleHambergerMenu = () =>
    setIsHambergerMenuOpen(!isHambergerMenuOpen);

  const commonLinks = [{ to: "/get-answers", label: "Get Answers" }];
  const authenticatedLinks = [...commonLinks];
  const unauthenticatedLinks = [
    { to: "/signup", label: "Signup" },
    { to: "/login", label: "Signin" },
    ...commonLinks,
  ];

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/login");
  };

  const linksToRender = isAuthenticated
    ? authenticatedLinks
    : unauthenticatedLinks;

  const menuLinks = (links: { to: string; label: string }[]) =>
    links.map((link) => (
      <Link
        key={link.to}
        to={link.to}
        className="text-white font-mono text-lg py-2 px-6 bg-blue-600 rounded-md transition-all duration-300
                   hover:text-yellow-400 focus:text-yellow-400"
      >
        {link.label}
      </Link>
    ));

  const ProfileUser = () =>
    isAuthenticated && (
      <ProfileMenu
        user={user}
        handleLogout={handleLogout}
        toggleMenu={toggleMenu}
        isMenuOpen={isMenuOpen}
      />
    );

  return (
    <header className="bg-blue-600 p-2 md:p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-bold flex items-center space-x-2">
          <PlusIcon />
          <Link to="/" className="hover:text-yellow-400 font-mono">
            24 Cheat Service
          </Link>
        </h1>

        {/* Desktop Menu */}
        <nav className="space-x-6 hidden md:flex">
          {menuLinks(linksToRender)}
          {ProfileUser()}
        </nav>

        {/* Hamburger Menu */}
        <div className="md:hidden flex items-center ">
          {ProfileUser()}
          <button
            onClick={toggleHambergerMenu}
            className="text-white focus:outline-none pl-4  md:pl-0"
            aria-label="Toggle Navigation"
          >
            <Hamburger />
          </button>
        </div>
      </div>

      <div
        className={`md:hidden ${
          isHambergerMenuOpen ? "block" : "hidden"
        } transition-all ease-in-out`}
      >
        <nav className="space-y-4 pt-4 flex flex-col">
          {menuLinks(linksToRender)}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
