import React, { useRef } from "react";
import { Canvas, useFrame, extend, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';

// Extend Three.js with custom elements
extend({ Group: THREE.Group });

const TechIcon = ({ iconSvg, startPosition, color, size = 0.15, rotationSpeed = 0.1 }) => {
  const group = useRef();
  const svg = useLoader(SVGLoader, iconSvg);
  const timeOffset = React.useRef(Math.random() * 100);
  
  // Create shapes from SVG
  const shapes = React.useMemo(() => {
    const shapes = [];
    svg.paths.forEach((path) => {
      path.toShapes(true).forEach((shape) => {
        shapes.push(shape);
      });
    });
    return shapes;
  }, [svg]);

  // Individual animation for each icon
  useFrame(({ clock }) => {
    if (group.current) {
      const time = clock.getElapsedTime() + timeOffset.current;
      
      // Independent floating animation in all directions
      group.current.position.x = startPosition[0] + Math.sin(time * rotationSpeed) * 3;
      group.current.position.y = startPosition[1] + Math.cos(time * rotationSpeed * 0.8) * 2;
      group.current.position.z = startPosition[2] + Math.sin(time * rotationSpeed * 0.6) * 2;
      
      // Gentle rotation
      group.current.rotation.z = time * rotationSpeed * 0.1;
    }
  });

  return (
    <group ref={group} position={startPosition} scale={[size, size, size]}>
      {shapes.map((shape, i) => (
        <mesh key={i}>
          <shapeGeometry args={[shape]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={0.4}  // More visible
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
};

const TechIcons = () => {
  // Positions spread out in a sphere pattern
  const icons = [
    { 
      name: 'nodejs', 
      svg: '/icons/nodejs.svg', 
      position: [8, 2, -4], 
      color: '#68A063', 
      size: 0.15,
      rotationSpeed: 0.05
    },
    { 
      name: 'react', 
      svg: '/icons/react.svg', 
      position: [-8, 3, 3], 
      color: '#61DAFB', 
      size: 0.18,
      rotationSpeed: 0.06
    },
    { 
      name: 'nextjs', 
      svg: '/icons/nextjs.svg', 
      position: [6, -5, 2], 
      color: '#000000', 
      size: 0.12,
      rotationSpeed: 0.04
    },
    { 
      name: 'tailwindcss', 
      svg: '/icons/tailwindcss.svg', 
      position: [-6, 5, -3], 
      color: '#38B2AC', 
      size: 0.13,
      rotationSpeed: 0.05
    },
    { 
      name: 'solidity', 
      svg: '/icons/solidity.svg', 
      position: [0, 8, 3], 
      color: '#363636', 
      size: 0.1,
      rotationSpeed: 0.03
    },
    { 
      name: 'javascript', 
      svg: '/icons/javascript.svg', 
      position: [5, -7, 4], 
      color: '#F7DF1E', 
      size: 0.15,
      rotationSpeed: 0.05
    },
    { 
      name: 'typescript', 
      svg: '/icons/typescript.svg', 
      position: [-5, 0, 8], 
      color: '#3178C6', 
      size: 0.15,
      rotationSpeed: 0.05
    }
  ];

  return (
    <>
      {icons.map((icon, i) => (
        <TechIcon
          key={i}
          iconSvg={icon.svg}
          startPosition={icon.position}
          color={icon.color}
          size={icon.size}
          rotationSpeed={icon.rotationSpeed}
        />
      ))}
    </>
  );
};

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Three.js Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[15, 15, 15]} color="#7e22ce" intensity={1} />
          <pointLight position={[-15, -15, -15]} color="#3b82f6" intensity={0.5} />
          
          <TechIcons />
          
          <OrbitControls 
            enableZoom={false} 
            autoRotate 
            autoRotateSpeed={0.15}  // Slower rotation
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
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
              src="/icons/developer-image.jpeg" 
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