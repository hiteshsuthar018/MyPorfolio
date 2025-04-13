
import React from "react";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import HeroSection from "./components/HeroSection";
import SkillsSection from "./components/SkillsSection";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import EducationSection from "./components/EducationSection";
import Footer from "./components/Footer";
const App = () => {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen scroll-smooth">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <EducationSection />
      <ContactSection />
      <Footer />
    </div>
  );
};


export default App;






// import React, { useEffect, useRef } from "react";
// import * as THREE from "three";
// import { motion } from "framer-motion";
// import Navbar from "./components/Navbar";
// import HeroSection from "./components/HeroSection";
// import AboutSection from "./components/AboutSection";
// import SkillsSection from "./components/SkillsSection";
// import ExperienceSection from "./components/ExperienceSection";
// import ProjectsSection from "./components/ProjectsSection";
// import EducationSection from "./components/EducationSection";
// import ContactSection from "./components/ContactSection";
// import Footer from "./components/Footer";

// const App = () => {
//   const floatingCanvasRef = useRef(null);
//   const sectionObserverRef = useRef(null);
//   const currentShapeRef = useRef(null);

//   useEffect(() => {
//     // Setup floating canvas
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     camera.position.z = 5;

//     const renderer = new THREE.WebGLRenderer({ 
//       alpha: true,
//       antialias: true 
//     });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setPixelRatio(window.devicePixelRatio);
//     floatingCanvasRef.current.appendChild(renderer.domElement);

//     // Add lights
//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//     scene.add(ambientLight);

//     const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
//     directionalLight.position.set(1, 1, 1);
//     scene.add(directionalLight);

//     // Create shapes for each section
//     const shapes = {
//       hero: createRocketShape(),
//       about: createPersonShape(),
//       skills: createChipShape(),
//       experience: createBriefcaseShape(),
//       projects: createCodeBracketShape(),
//       education: createGraduationCapShape(),
//       contact: createEmailShape()
//     };

//     // Add all shapes to scene but hide them initially
//     Object.values(shapes).forEach(shape => {
//       shape.visible = false;
//       scene.add(shape);
//     });

//     // Show hero shape initially
//     shapes.hero.visible = true;
//     currentShapeRef.current = shapes.hero;

//     // Add floating tech icons
//     const techIcons = createTechIcons();
//     techIcons.forEach(icon => scene.add(icon));

//     // Animation loop
//     const animate = () => {
//       requestAnimationFrame(animate);

//       // Rotate current shape
//       if (currentShapeRef.current) {
//         currentShapeRef.current.rotation.y += 0.005;
//       }

//       // Animate tech icons
//       techIcons.forEach(icon => {
//         if (icon.userData) {
//           icon.userData.angle += 0.01 * icon.userData.speed;
//           icon.position.x = Math.cos(icon.userData.angle) * icon.userData.radius;
//           icon.position.z = Math.sin(icon.userData.angle) * icon.userData.radius;
//           icon.position.y = Math.sin(Date.now() * 0.001 + icon.userData.angle) * 0.5;
//         }
//       });

//       renderer.render(scene, camera);
//     };
//     animate();

//     // Intersection Observer for section changes
//     sectionObserverRef.current = new IntersectionObserver(
//       (entries) => {
//         entries.forEach(entry => {
//           if (entry.isIntersecting) {
//             const sectionId = entry.target.id;
//             const shapeKey = sectionId.replace("section-", "");
            
//             if (shapes[shapeKey] && currentShapeRef.current !== shapes[shapeKey]) {
//               // Hide current shape
//               if (currentShapeRef.current) {
//                 currentShapeRef.current.visible = false;
//               }
              
//               // Show new shape
//               shapes[shapeKey].visible = true;
//               shapes[shapeKey].rotation.y = 0;
//               currentShapeRef.current = shapes[shapeKey];
//             }
//           }
//         });
//       },
//       { threshold: 0.5 }
//     );

//     // Observe all sections
//     Object.keys(shapes).forEach(key => {
//       const element = document.getElementById(`section-${key}`);
//       if (element) {
//         sectionObserverRef.current.observe(element);
//       }
//     });

//     // Handle resize
//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };

//     window.addEventListener("resize", handleResize);

//     // Cleanup
//     return () => {
//       window.removeEventListener("resize", handleResize);
//       if (sectionObserverRef.current) {
//         sectionObserverRef.current.disconnect();
//       }
//       floatingCanvasRef.current.removeChild(renderer.domElement);
//     };
//   }, []);

//   // Shape creation functions
//   const createRocketShape = () => {
//     const group = new THREE.Group();
    
//     // Rocket body (cone)
//     const bodyGeometry = new THREE.ConeGeometry(0.3, 1, 32);
//     const bodyMaterial = new THREE.MeshPhongMaterial({ 
//       color: 0xff5555,
//       emissive: 0xff0000,
//       emissiveIntensity: 0.2
//     });
//     const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
//     body.rotation.x = Math.PI;
//     body.position.y = 0.5;
//     group.add(body);
    
//     // Rocket fins
//     const finGeometry = new THREE.BoxGeometry(0.4, 0.1, 0.6);
//     const finMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });
    
//     for (let i = 0; i < 3; i++) {
//       const fin = new THREE.Mesh(finGeometry, finMaterial);
//       fin.position.y = 0.2;
//       fin.rotation.y = (i / 3) * Math.PI * 2;
//       fin.rotation.z = Math.PI / 4;
//       group.add(fin);
//     }
    
//     // Flame
//     const flameGeometry = new THREE.ConeGeometry(0.2, 0.5, 32);
//     const flameMaterial = new THREE.MeshPhongMaterial({ 
//       color: 0xffaa00,
//       transparent: true,
//       opacity: 0.7
//     });
//     const flame = new THREE.Mesh(flameGeometry, flameMaterial);
//     flame.position.y = -0.5;
//     flame.rotation.x = Math.PI;
//     group.add(flame);
    
//     return group;
//   };

//   const createPersonShape = () => {
//     const group = new THREE.Group();
    
//     // Head
//     const headGeometry = new THREE.SphereGeometry(0.3, 32, 32);
//     const headMaterial = new THREE.MeshPhongMaterial({ color: 0xffddbb });
//     const head = new THREE.Mesh(headGeometry, headMaterial);
//     head.position.y = 0.7;
//     group.add(head);
    
//     // Body
//     const bodyGeometry = new THREE.CylinderGeometry(0.2, 0.3, 0.6, 32);
//     const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x4477ff });
//     const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
//     group.add(body);
    
//     return group;
//   };

//   const createTechIcons = () => {
//     const icons = [];
//     const techData = [
//       { name: "react", color: 0x61dafb, radius: 2.2 },
//       { name: "node", color: 0x68a063, radius: 2.0 },
//       { name: "js", color: 0xf7df1e, radius: 1.8 },
//       { name: "html", color: 0xe34f26, radius: 2.3 },
//       { name: "css", color: 0x264de4, radius: 2.1 },
//       { name: "python", color: 0x3776ab, radius: 1.9 }
//     ];
    
//     techData.forEach((tech, i) => {
//       let geometry;
      
//       // Different shapes for different techs
//       switch(tech.name) {
//         case "react":
//           geometry = new THREE.TorusGeometry(0.15, 0.05, 16, 32);
//           break;
//         case "node":
//           geometry = new THREE.OctahedronGeometry(0.15);
//           break;
//         default:
//           geometry = new THREE.IcosahedronGeometry(0.15);
//       }
      
//       const material = new THREE.MeshPhongMaterial({ 
//         color: tech.color,
//         emissive: tech.color,
//         emissiveIntensity: 0.2
//       });
      
//       const icon = new THREE.Mesh(geometry, material);
      
//       const angle = (i / techData.length) * Math.PI * 2;
//       icon.position.x = Math.cos(angle) * tech.radius;
//       icon.position.z = Math.sin(angle) * tech.radius;
      
//       icon.userData = {
//         angle: angle,
//         speed: 0.5 + Math.random() * 0.5,
//         radius: tech.radius
//       };
      
//       icons.push(icon);
//     });
    
//     return icons;
//   };
//   const createChipShape = () => {
//     const group = new THREE.Group();
  
//     // Main chip body
//     const bodyGeometry = new THREE.BoxGeometry(1, 0.2, 1);
//     const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x00ffcc });
//     const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
//     group.add(body);
  
//     // Pins
//     const pinGeometry = new THREE.BoxGeometry(0.1, 0.05, 0.1);
//     const pinMaterial = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
  
//     for (let i = -0.45; i <= 0.45; i += 0.3) {
//       for (let j = -0.45; j <= 0.45; j += 0.3) {
//         const pin = new THREE.Mesh(pinGeometry, pinMaterial);
//         pin.position.set(i, -0.15, j);
//         group.add(pin);
//       }
//     }
  
//     return group;
//   };
  
//   const createBriefcaseShape = () => {
//     const group = new THREE.Group();
  
//     const caseGeometry = new THREE.BoxGeometry(0.8, 0.5, 0.2);
//     const caseMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
//     const briefcase = new THREE.Mesh(caseGeometry, caseMaterial);
//     group.add(briefcase);
  
//     const handleGeometry = new THREE.TorusGeometry(0.1, 0.03, 16, 100, Math.PI);
//     const handleMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
//     const handle = new THREE.Mesh(handleGeometry, handleMaterial);
//     handle.rotation.z = Math.PI / 2;
//     handle.position.y = 0.3;
//     group.add(handle);
  
//     return group;
//   };
  
//   const createCodeBracketShape = () => {
//     const group = new THREE.Group();
  
//     const material = new THREE.MeshPhongMaterial({ color: 0x61dafb });
  
//     const leftBracketGeometry = new THREE.TorusGeometry(0.3, 0.05, 16, 100, Math.PI / 2);
//     const leftBracket = new THREE.Mesh(leftBracketGeometry, material);
//     leftBracket.rotation.z = Math.PI;
//     leftBracket.position.x = -0.4;
  
//     const rightBracketGeometry = new THREE.TorusGeometry(0.3, 0.05, 16, 100, Math.PI / 2);
//     const rightBracket = new THREE.Mesh(rightBracketGeometry, material);
//     rightBracket.position.x = 0.4;
  
//     group.add(leftBracket, rightBracket);
  
//     return group;
//   };
  
//   const createGraduationCapShape = () => {
//     const group = new THREE.Group();
  
//     const capGeometry = new THREE.BoxGeometry(1.2, 0.05, 1.2);
//     const capMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
//     const cap = new THREE.Mesh(capGeometry, capMaterial);
//     group.add(cap);
  
//     const headbandGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 32);
//     const headbandMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
//     const headband = new THREE.Mesh(headbandGeometry, headbandMaterial);
//     headband.position.y = -0.15;
//     group.add(headband);
  
//     const tasselGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.4, 8);
//     const tasselMaterial = new THREE.MeshPhongMaterial({ color: 0xffd700 });
//     const tassel = new THREE.Mesh(tasselGeometry, tasselMaterial);
//     tassel.position.set(0.5, -0.05, 0);
//     group.add(tassel);
  
//     return group;
//   };
  
//   const createEmailShape = () => {
//     const group = new THREE.Group();
  
//     const envelopeGeometry = new THREE.BoxGeometry(1, 0.6, 0.1);
//     const envelopeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
//     const envelope = new THREE.Mesh(envelopeGeometry, envelopeMaterial);
//     group.add(envelope);
  
//     const flapGeometry = new THREE.ConeGeometry(0.6, 0.2, 3);
//     const flapMaterial = new THREE.MeshPhongMaterial({ color: 0xdddddd });
//     const flap = new THREE.Mesh(flapGeometry, flapMaterial);
//     flap.rotation.z = Math.PI;
//     flap.position.set(0, 0.2, 0.06);
//     group.add(flap);
  
//     return group;
//   };
  
//   // Similar functions for other shapes (createChipShape, createBriefcaseShape, etc.)
//   // ... (implement these following the same pattern)

//   return (
//     <div className="relative bg-gray-900 text-gray-100 min-h-screen scroll-smooth">
//       {/* Floating 3D Canvas - positioned fixed on top */}
//       <div 
//         ref={floatingCanvasRef} 
//         className="fixed top-0 left-0 w-full h-full pointer-events-none z-20"
//         style={{ mixBlendMode: 'lighten', opacity: 0.8 }}
//       />
      
//       {/* Content Sections */}
//       <div className="relative z-10">
//         <Navbar />
        
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           <section id="section-hero" className="min-h-screen">
//             <HeroSection />
//           </section>
          
//           <section id="section-about" className="min-h-screen py-20">
//             <AboutSection />
//           </section>
          
//           <section id="section-skills" className="min-h-screen py-20">
//             <SkillsSection />
//           </section>
          
//           <section id="section-experience" className="min-h-screen py-20">
//             <ExperienceSection/>
//           </section>
          
//           <section id="section-projects" className="min-h-screen py-20">
//             <ProjectsSection/>
//           </section>
          
//           <section id="section-education" className="min-h-screen py-20">
//             <EducationSection/>
//           </section>
          
//           <section id="section-contact" className="min-h-screen py-20">
//             <ContactSection/>
//           </section>
//         </motion.div>
        
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default App;