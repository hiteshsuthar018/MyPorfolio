import React, { useRef } from "react";
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

const FloatingTechIcons = () => {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  const techIcons = [
    { name: "React", color: "#61DAFB", position: [0, 0, 0], size: 1.5 },
    { name: "Node", color: "#68A063", position: [4, 2, -1], size: 1.5 },
    { name: "Next", color: "#000000", position: [-2.5, 1.5, 1], size: 1.45 },
    { name: "Tailwind", color: "#38B2AC", position: [6, -1, 1.5], size: 1.4 },
    { name: "JS", color: "#F7DF1E", position: [-4, -0.5, -1], size: 1.4 },
    { name: "TS", color: "#3178C6", position: [0, 2, -2], size: 1.4 },
    { name: "Solidity", color: "#363636", position: [5.5, -1.5, 0], size: 1.35 }
  ];

  return (
    <group ref={groupRef}>
      {techIcons.map((tech, i) => (
        <mesh key={i} position={tech.position}>
          <boxGeometry args={[tech.size, tech.size, tech.size]} />
          <meshStandardMaterial 
            color={tech.color} 
            transparent
            opacity={0.6}
            emissive={tech.color}
            emissiveIntensity={0.3}
          />
          <Text
            position={[0, 0, tech.size/2 + 0.05]}
            fontSize={tech.size * 0.5}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {tech.name}
          </Text>
        </mesh>
      ))}
    </group>
  );
};

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Three.js Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#7e22ce" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
          <FloatingTechIcons />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.5} 
          />
        </Canvas>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-blue-900/30"></div>
      </div>

      <div className="container mx-auto px-6 z-10 flex flex-col-reverse md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Hi, I'm <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">Hitesh</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-300 mb-6">
            Full Stack Developer & Blockchain Enthusiast
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-lg">
            Building innovative web solutions with modern technologies and blockchain integration.
          </p>
          <div className="flex space-x-4 justify-center md:justify-start">
            <a
              href="#contact"
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all"
            >
              Contact Me
            </a>
            <a
              href="#projects"
              className="px-6 py-3 border border-gray-600 rounded-lg font-medium hover:bg-gray-800/50 transition-all"
            >
              View Projects
            </a>
          </div>
        </div>
        
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-purple-500/30">
            <img 
              src="/images/developer-image.jpeg" 
              alt="Developer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;