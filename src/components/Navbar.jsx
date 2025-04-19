import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all ${scrolled ? "py-3 bg-gray-800/90 backdrop-blur-md shadow-xl" : "py-5 bg-transparent"}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.a 
          href="#"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent"
        >
          Hitesh Suthar
        </motion.a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              {item}
            </a>
          ))}
        </div>
        
        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden text-xl text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? '✕' : '☰'}
        </button>
        
        {/* Mobile Menu */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-gray-800/95 backdrop-blur-md shadow-lg py-4 px-6"
          >
            <div className="flex flex-col space-y-4">
              {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-white transition-colors font-medium py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;