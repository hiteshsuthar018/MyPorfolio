import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Float } from "@react-three/drei";

// Sample project videos (random tech-related videos from Pexels)
const projectVideos = [
  "https://videos.pexels.com/video-files/3176015/3176015-sd_640_360_25fps.mp4",
];

// Sample code snippets (random tech code examples)
const codeSnippets = [

  `// Node.js server example
const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
  `// Solidity smart contract example
  mapping(address => uint256[]) private clientJobs;
    mapping(uint256 => Job) public jobs;
    mapping(uint256 => uint256[]) private bidsByJobId;
    mapping(uint256 => Bid) public bids;
    mapping(uint256 => Milestone[]) public jobMilestones;
    mapping(address => uint256) public freelancerBalances;
    mapping(uint256 => Dispute) public disputes;
    mapping(uint256 => uint256[]) private disputesByJobId;
    
    uint256 private jobCounter = 1;
    uint256 private bidCounter = 1;
    uint256 private disputeCounter = 1;`,

  `// MongoDB query example
db.users.find({
  age: { $gt: 18 },
  status: "active"
}).sort({ name: 1 });`
];

const ProjectCube = ({ position, color, projectName }) => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} />
        <Text
          position={[0, 0, 0.6]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {projectName}
        </Text>
      </mesh>
    </Float>
  );
};

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef();

  const githubUsername = 'hiteshsuthar018';

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${githubUsername}/repos?sort=updated&direction=desc`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }

        const data = await response.json();
        const filteredProjects = data.filter(project => !project.fork);

        const formattedProjects = filteredProjects.map((project, index) => ({
          title: project.name,
          description: project.description || 'No description provided',
          tech: project.language ? [project.language] : [],
          features: [
            `Created: ${new Date(project.created_at).toLocaleDateString()}`,
            `Last updated: ${new Date(project.updated_at).toLocaleDateString()}`,
            `Stars: ${project.stargazers_count}`
          ],
          githubUrl: project.html_url,
          homepage: project.homepage,
          topics: project.topics || [],
          videoUrl: projectVideos[index % projectVideos.length],
          codeSnippet: codeSnippets[index % codeSnippets.length]
        }));

        setProjects(formattedProjects);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProjects();
  }, [githubUsername]);

  if (loading) {
    return (
      <section id="projects" className="relative py-20 bg-gray-900 min-h-screen">
        <div className="absolute inset-0 z-0 opacity-10">
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <p className="text-gray-400">Loading projects...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="relative py-20 bg-gray-900 min-h-screen">
        <div className="relative z-10 container mx-auto px-6 text-center">
          <p className="text-red-400">Error: {error}</p>
        </div>
      </section>
    );
  }

  const featuredProjects = projects.slice(0, 3);
  const scrollableProjects = projects.slice(3);

  return (
    <section id="projects" className="relative py-20 bg-gray-900 overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          {featuredProjects.map((project, i) => (
            <ProjectCube
              key={i}
              position={[
                (i - 1) * 3,
                Math.sin(i * 2) * 1.5,
                -5
              ]}
              color={i % 2 === 0 ? "#6366f1" : "#8b5cf6"}
              projectName={project.title}
            />
          ))}
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      <div className="relative z-10 container mx-auto px-6" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              My Projects
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A showcase of my work with interactive 3D elements
          </p>
        </motion.div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 h-full shadow-lg hover:shadow-purple-500/10 group"
              whileHover={{ y: -5 }}
            >
              <div className="h-48 bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center relative overflow-hidden">
                {project.videoUrl ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                  >
                    <source src={project.videoUrl} type="video/mp4" />
                  </video>
                ) : (
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                    <Canvas>
                      <ambientLight intensity={0.5} />
                      <pointLight position={[10, 10, 10]} />
                      <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
                        <boxGeometry args={[2, 2, 2]} />
                        <meshStandardMaterial color={index % 2 === 0 ? "#6366f1" : "#8b5cf6"} wireframe />
                      </mesh>
                    </Canvas>
                  </div>
                )}
                <svg className="w-16 h-16 text-gray-600 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>

                {/* Code Snippet Preview */}
                <div className="bg-gray-900 rounded-md p-3 mb-4 overflow-x-auto no-scrollbar">
                  <pre className="text-xs text-green-400 font-mono">
                    {project.codeSnippet}
                  </pre>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.8 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      className="px-2 py-1 bg-gray-700 rounded-full text-xs"
                    >
                      {tech}
                    </motion.span>
                  ))}
                  {project.topics.slice(0, 3).map((topic, i) => (
                    <motion.span
                      key={`topic-${i}`}
                      initial={{ scale: 0.8 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      className="px-2 py-1 bg-purple-900/50 rounded-full text-xs"
                    >
                      {topic}
                    </motion.span>
                  ))}
                </div>

                <ul className="space-y-2 mb-4">
                  {project.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start"
                    >
                      <span className="text-purple-400 mr-2">•</span>
                      <span className="text-gray-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-6 flex space-x-3">
                  {project.homepage && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-sm hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-500/20"
                    >
                      View Demo
                    </motion.a>
                  )}
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-gray-600 rounded-lg text-sm hover:bg-gray-700/50 transition-all"
                  >
                    Source Code
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Horizontal Scroller for Additional Projects */}
        {scrollableProjects.length > 0 && (
          <div className="mt-16">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-2xl font-semibold mb-6 text-center"
            >
              <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                More Projects
              </span>
            </motion.h3>

            <div className="relative group">
              <div className="overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-gray-600 no-scrollbar scrollbar-track-gray-800">
                <div className="flex space-x-5 px-2">
                  {scrollableProjects.map((project, index) => (
                    <motion.div
                      key={index + 3}
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-gray-800/70 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 flex-shrink-0 w-64 shadow-lg hover:shadow-purple-500/10"
                      whileHover={{ y: -5 }}
                    >
                      <div className="h-32 bg-gradient-to-br from-purple-500/10 to-blue-500/10 flex items-center justify-center relative overflow-hidden">
                        {project.videoUrl ? (
                          <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover opacity-70"
                          >
                            <source src={project.videoUrl} type="video/mp4" />
                          </video>
                        ) : (
                          <div className="absolute inset-0 opacity-10">
                            <Canvas>
                              <ambientLight intensity={0.5} />
                              <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
                                <boxGeometry args={[1.5, 1.5, 1.5]} />
                                <meshStandardMaterial color="#6366f1" wireframe />
                              </mesh>
                            </Canvas>
                          </div>
                        )}
                        <svg className="w-10 h-10 text-gray-500 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                      </div>

                      <div className="p-4">
                        <h3 className="text-md font-semibold mb-1 text-gray-100 line-clamp-1">{project.title}</h3>
                        <p className="text-gray-400 text-xs mb-2 line-clamp-2">{project.description}</p>

                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {project.tech.slice(0, 2).map((tech, i) => (
                            <span key={i} className="px-2 py-0.5 bg-gray-700/80 rounded-full text-xs text-gray-300">
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="mt-3 flex justify-end">
                          <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 text-xs bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600 rounded-md transition-colors flex items-center"
                          >
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                            View Code
                          </motion.a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Gradient fade effects on sides */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-gray-900 to-transparent"></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-gray-900 to-transparent"></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;