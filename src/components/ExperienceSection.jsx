import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiGithub, FiLinkedin, FiMail, FiPhone } from "react-icons/fi";
import { Icon } from '@iconify/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text, useGLTF } from '@react-three/drei';
import { Suspense, useRef } from 'react';
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
      { name: "React", color: "#61DAFB", position: [0, 0, 0] },
      { name: "Node", color: "#68A063", position: [2, 1, -1] },
      { name: "Mongo", color: "#4DB33D", position: [-1.5, 1.5, 1] },
      { name: "Express", color: "#000000", position: [1, -1, 1.5] },
      { name: "JS", color: "#F7DF1E", position: [-2, -0.5, -1] }
    ];
  
    return (
      <group ref={groupRef}>
        {techIcons.map((tech, i) => (
          <mesh key={i} position={tech.position}>
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <meshStandardMaterial color={tech.color} />
            <Text
              position={[0, 0, 0.41]}
              fontSize={0.4}
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

const ExperienceSection = () => {
  const experiences = [
    {
      role: "MERN Stack Developer",
      company: "Stellanova Global Tech",
      duration: "2023 - Present",
      points: [
        "Developed RESTful APIs using Node.js, Express, and MongoDB",
        "Built interactive React dashboards with Tailwind CSS",
        "Integrated third-party APIs to enhance functionality",
        "Implemented JWT authentication for secure user sessions",
        "Optimized application performance by 40% through code splitting"
      ],
      techStack: ["React", "Node.js", "MongoDB", "Express", "TailwindCSS"]
    },
    {
      role: "Frontend Developer",
      company: "TechNova Solutions",
      duration: "2021 - 2023",
      points: [
        "Created responsive UIs with React and Material UI",
        "Reduced bundle size by 30% through optimization",
        "Collaborated with UX team to implement designs",
        "Mentored junior developers in React best practices"
      ],
      techStack: ["React", "Redux", "Material UI", "GraphQL"]
    }
  ];

  return (
    <section id="experience" className="relative py-20 bg-gray-900 overflow-hidden">
      {/* Three.js Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <FloatingTechIcons />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Professional Journey
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My career path and the technologies I've mastered along the way
          </p>
        </motion.div>
        
        <div className="space-y-8 max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-gray-800/70 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-all shadow-lg hover:shadow-purple-500/10"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-2xl font-semibold text-white">{exp.role}</h3>
                  <p className="text-purple-400 text-lg">{exp.company}</p>
                </div>
                <span className="px-4 py-2 bg-gray-700/50 rounded-full text-sm font-medium border border-gray-600/50">
                  {exp.duration}
                </span>
              </div>
              
              <ul className="mt-6 space-y-3 pl-5">
                {exp.points.map((point, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + (i * 0.1) }}
                    viewport={{ once: true }}
                    className="text-gray-300 list-disc marker:text-purple-400"
                  >
                    {point}
                  </motion.li>
                ))}
              </ul>
              
              {exp.techStack && (
                <div className="mt-6 pt-6 border-t border-gray-700/50">
                  <h4 className="text-sm font-medium text-gray-400 mb-3">TECH STACK</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.techStack.map((tech, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.4 + (i * 0.05) }}
                        viewport={{ once: true }}
                        className="px-3 py-1 bg-gray-700/50 rounded-full text-xs font-medium border border-gray-600/50"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* 3D Timeline Connector */}
        <div className="hidden md:block absolute left-1/2 top-40 bottom-40 w-px bg-gradient-to-b from-transparent via-purple-500/30 to-transparent -translate-x-1/2 z-0"></div>
      </div>
    </section>
  );
};
export default ExperienceSection;
