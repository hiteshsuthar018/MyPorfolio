import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiGithub, FiLinkedin, FiMail, FiPhone } from "react-icons/fi";
import { Icon } from '@iconify/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text, useGLTF } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';
const SkillsSection = () => {
  // Skill icons mapping
  const skillIcons = {
    "JavaScript": "logos:javascript",
    "TypeScript": "logos:typescript-icon",
    "C++": "logos:c-plusplus",
    "React.js": "logos:react",
    "Next.js": "logos:nextjs-icon",
    "Redux": "logos:redux",
    "Tailwind CSS": "logos:tailwindcss-icon",
    "Node.js": "logos:nodejs-icon",
    "Express.js": "simple-icons:express",
    "REST API": "carbon:api",
    "MongoDB": "logos:mongodb-icon",
    "Solidity": "logos:solidity",
    "Ethereum": "logos:ethereum",
    "Smart Contracts": "material-symbols:contract",
    "Git": "logos:git-icon",
    "GitHub": "logos:github-icon",
    "VS Code": "logos:visual-studio-code"
  };

  const skills = {
    "Programming": ["JavaScript", "TypeScript", "C++"],
    "Frontend": ["React.js", "Next.js", "Redux", "Tailwind CSS"],
    "Backend": ["Node.js", "Express.js", "REST API", "MongoDB"],
    "Blockchain": ["Solidity", "Ethereum", "Smart Contracts"],
    "Tools": ["Git", "GitHub", "VS Code"]
  };

  // 3D Floating Skill Orbs Background
  const SkillOrbs = () => {
    const group = useRef();
    
    useFrame(({ clock }) => {
      group.current.rotation.y = clock.getElapsedTime() * 0.1;
    });

    const orbs = [
      { position: [0, 0, -10], size: 2, color: '#7e22ce' }, // Large purple
      { position: [5, 2, -8], size: 1.5, color: '#3b82f6' }, // Medium blue
      { position: [-4, -1, -6], size: 1, color: '#8b5cf6' }, // Small light purple
    ];

    return (
      <group ref={group}>
        {orbs.map((orb, i) => (
          <mesh
            key={i}
            position={orb.position}
            scale={[orb.size, orb.size, orb.size]}
          >
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial 
              color={orb.color}
              emissive={orb.color}
              emissiveIntensity={0.2}
              metalness={0.8}
              roughness={0.2}
              transparent
              opacity={0.15}
            />
          </mesh>
        ))}
      </group>
    );
  };

  return (
    <section id="skills" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <SkillOrbs />
        </Canvas>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-900/10"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            My Skills
          </span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, items], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -8,
                boxShadow: "0 20px 25px -5px rgba(139, 92, 246, 0.1), 0 10px 10px -5px rgba(139, 92, 246, 0.04)"
              }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                hover: { duration: 0.3 }
              }}
              viewport={{ once: true }}
              className="bg-gray-800/70 p-6 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="flex items-center mb-4">
                <motion.div 
                  className="w-2 h-8 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full mr-3"
                  whileHover={{ scaleY: 1.2 }}
                  transition={{ duration: 0 }}
                />
                <h3 className="text-xl font-semibold text-gray-100">{category}</h3>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {items.map((skill) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: 'rgba(55, 65, 81, 0.5)'
                    }}
                    transition={{ 
                      duration: 0,
                      delay: 0 + (index * 0.05)
                    }}
                    viewport={{ once: true }}
                    className="flex items-center px-3 py-2 bg-gray-700/50 rounded-lg text-sm hover:bg-gray-600/50 transition-all duration-200 group"
                  >
                    {skillIcons[skill] && (
                      <span className="w-5 h-5 mr-2 text-blue-400 group-hover:text-purple-400 transition-colors">
                        <Icon icon={skillIcons[skill]} />
                      </span>
                    )}
                    <span className="text-gray-200 group-hover:text-white transition-colors">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default SkillsSection;