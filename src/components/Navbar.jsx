
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        
        <button className="md:hidden text-xl">☰</button>
      </div>
    </nav>
  );
};

export default Navbar;