import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiGithub, FiLinkedin, FiMail, FiPhone } from "react-icons/fi";
import { Icon } from '@iconify/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text, useGLTF } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';
const HeroSection = () => {
    // Floating Tech Icons Component (no external models needed)
    const TechSpheres = () => {
      const group = useRef();
      
      useFrame(({ clock }) => {
        group.current.rotation.y = clock.getElapsedTime() * 0.1;
      });
  
      const spheres = [
        { color: '#7e22ce', position: [2, 0, 0], size: 0.6 }, // Purple
        { color: '#3b82f6', position: [-2, 0, 0], size: 0.6 }, // Blue
        { color: '#8b5cf6', position: [0, 2, 0], size: 0.5 }, // Light purple
        { color: '#60a5fa', position: [0, -2, 0], size: 0.5 }, // Light blue
      ];
  
      return (
        <group ref={group}>
          {spheres.map((sphere, i) => (
            <mesh
              key={i}
              position={sphere.position}
              scale={[sphere.size, sphere.size, sphere.size]}
            >
              <sphereGeometry args={[1, 32, 32]} />
              <meshStandardMaterial 
                color={sphere.color}
                emissive={sphere.color}
                emissiveIntensity={0.3}
                metalness={0.7}
                roughness={0.2}
              />
            </mesh>
          ))}
        </group>
      );
    };
  
    // Floating Particles Background
    const Particles = () => {
      const particles = useRef();
      const count = 500;
      
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 10;
      }
  
      useFrame(() => {
        if (particles.current) {
          particles.current.rotation.x += 0.0005;
          particles.current.rotation.y += 0.001;
        }
      });
  
      return (
        <points ref={particles}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={positions.length / 3}
              array={positions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.03}
            color="#a78bfa" // Light purple
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
          />
        </points>
      );
    };
  
    return (
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* Three.js Canvas Background */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} color="#7e22ce" intensity={1} />
            <pointLight position={[-10, -10, -10]} color="#3b82f6" intensity={0.5} />
            
            <TechSpheres />
            <Particles />
            <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
            
            <OrbitControls 
              enableZoom={false} 
              autoRotate 
              autoRotateSpeed={0.5}
              enablePan={false}
            />
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-blue-900/30"></div>
        </div>
  
        <div className="container mx-auto px-6 z-10 flex flex-col md:flex-row items-center">
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