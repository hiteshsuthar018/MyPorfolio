import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiGithub, FiLinkedin, FiMail, FiPhone } from "react-icons/fi";
import { Icon } from '@iconify/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text, useGLTF } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';
const EducationSection = () => {
  return (
    <section className="py-20 bg-gray-800/50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            Education
          </span>
        </h2>
        
        <div className="max-w-3xl mx-auto bg-gray-700/50 p-6 rounded-xl border border-gray-600/50">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold">Bachelor of Technology in Computer Science</h3>
              <p className="text-purple-400">Sir Padampat Singhania University</p>
            </div>
            <span className="px-3 py-1 bg-gray-600 rounded-full text-sm">
              CGPA: 8.00/10.00
            </span>
          </div>
          
          <p className="text-gray-300 mb-4">
            Key Skills: Data Structures and Algorithms, Full Stack Development, Blockchain, System Design
          </p>
          
          <h4 className="font-medium text-gray-200 mb-2">Academic Project:</h4>
          <p className="text-gray-400">
            Decentralized Freelancing Platform – Built a blockchain-based freelancing marketplace using Ethereum, Solidity, and Next.js with milestone-based payments via smart contracts.
          </p>
        </div>
      </div>
    </section>
  );
};
export default EducationSection;