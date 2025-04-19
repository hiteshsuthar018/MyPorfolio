import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiGithub, FiLinkedin, FiMail, FiPhone } from "react-icons/fi";
import { Icon } from '@iconify/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text, useGLTF } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';
const Footer = () => {
  return (
    <footer className="py-8 bg-gray-800/50 border-t border-gray-700">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} Hitesh Suthar. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a 
              href="https://github.com/hiteshsuthar018" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FiGithub className="text-xl" />
            </a>
            <a 
              href="https://linkedin.com/in/hitesh-suthar-09302526b" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FiLinkedin className="text-xl" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;