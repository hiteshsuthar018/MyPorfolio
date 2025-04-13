import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiGithub, FiLinkedin, FiMail, FiPhone } from "react-icons/fi";
import { Icon } from '@iconify/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text, useGLTF } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';
const AboutSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Floating Tech Icons for Background
  const FloatingIcons = () => {
    const group = useRef();
    
    useFrame(({ clock }) => {
      group.current.rotation.y = clock.getElapsedTime() * 0.1;
    });

    const icons = [
      { position: [0, 0, -5], size: 1.5, color: '#7e22ce' }, // Large purple
      { position: [3, 1, -4], size: 1, color: '#3b82f6' },   // Medium blue
      { position: [-2, -1, -3], size: 0.8, color: '#8b5cf6' }, // Small light purple
    ];

    return (
      <group ref={group}>
        {icons.map((icon, i) => (
          <mesh
            key={i}
            position={icon.position}
            scale={[icon.size, icon.size, icon.size]}
          >
            <torusGeometry args={[0.5, 0.2, 16, 32]} />
            <meshStandardMaterial 
              color={icon.color}
              emissive={icon.color}
              emissiveIntensity={0.3}
              metalness={0.7}
              roughness={0.2}
              transparent
              opacity={0.6}
            />
          </mesh>
        ))}
      </group>
    );
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const fadeLeftVariant = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0} },
  };

  const fadeRightVariant = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0} },
  };

  return (
    <section id="about" ref={ref} className="py-20 bg-gray-800/50 relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <FloatingIcons />
        </Canvas>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-900/10"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.h2 
          variants={fadeUpVariant}
          initial="hidden"
          animate={controls}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            About Me
          </span>
        </motion.h2>
        
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            variants={fadeLeftVariant}
            initial="hidden"
            animate={controls}
            className="md:w-1/2"
          >
            <div className="bg-gray-700/50 p-8 rounded-xl border border-gray-600/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 text-gray-100">Who I Am</h3>
              <p className="text-gray-300 mb-4">
                I'm a passionate Full Stack Developer with expertise in JavaScript, React, Node.js, and blockchain technologies. Currently pursuing my Bachelor's in Computer Science with a CGPA of 8.0.
              </p>
              <p className="text-gray-300">
                My journey in tech began with a fascination for problem-solving, which evolved into building complete web applications and exploring decentralized technologies.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            variants={fadeRightVariant}
            initial="hidden"
            animate={controls}
            className="md:w-1/2 grid grid-cols-2 gap-4"
          >
            {[
              { title: "Experience", value: "2+ Years", desc: "Professional Development", icon: "⏳" },
              { title: "Projects", value: "15+", desc: "Completed", icon: "🚀" },
              { title: "Blockchain", value: "Expertise", desc: "Solidity & Web3", icon: "⛓️" },
              { title: "Education", value: "B.Tech CSE", desc: "8.0 CGPA", icon: "🎓" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0 + index * 0.1 }}
                whileHover={{ 
                  y: -5,
                  borderColor: "#8b5cf6",
                  boxShadow: "0 10px 15px -3px rgba(139, 92, 246, 0.1)"
                }}
                className="bg-gray-700/50 p-4 rounded-lg border border-gray-600/50 backdrop-blur-sm transition-all duration-300"
              >
                <div className="flex items-center mb-2">
                  <span className="text-xl mr-2">{item.icon}</span>
                  <h4 className="text-purple-400 font-medium">{item.title}</h4>
                </div>
                <p className="text-2xl font-bold my-2 text-gray-100">{item.value}</p>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default AboutSection;