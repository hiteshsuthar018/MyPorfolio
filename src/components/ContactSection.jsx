import React, { useState, useEffect } from "react";
import { FiGithub, FiLinkedin, FiMail, FiPhone } from "react-icons/fi";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            Get In Touch
          </span>
        </h2>
        
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-800 rounded-lg">
                  <FiMail className="text-purple-400 text-xl" />
                </div>
                <div>
                  <h4 className="text-gray-400">Email</h4>
                  <a href="mailto:hiteshsuthar1520@gmail.com" className="text-gray-200 hover:text-purple-400 transition-colors">
                    hiteshsuthar1520@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-800 rounded-lg">
                  <FiPhone className="text-purple-400 text-xl" />
                </div>
                <div>
                  <h4 className="text-gray-400">Phone</h4>
                  <a href="tel:+919079659450" className="text-gray-200 hover:text-purple-400 transition-colors">
                    +91 9079659450
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-800 rounded-lg">
                  <FiLinkedin className="text-purple-400 text-xl" />
                </div>
                <div>
                  <h4 className="text-gray-400">LinkedIn</h4>
                  <a 
                    href="https://linkedin.com/in/hiteshsuthar" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-200 hover:text-purple-400 transition-colors"
                  >
                    linkedin.com/in/hiteshsuthar
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-800 rounded-lg">
                  <FiGithub className="text-purple-400 text-xl" />
                </div>
                <div>
                  <h4 className="text-gray-400">GitHub</h4>
                  <a 
                    href="https://github.com/hiteshsuthar018" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-200 hover:text-purple-400 transition-colors"
                  >
                    github.com/hiteshsuthar018
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <form onSubmit={handleSubmit} className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-400 mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-400 mb-2">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-400 mb-2">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ContactSection;
