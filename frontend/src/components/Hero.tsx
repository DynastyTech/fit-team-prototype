import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { Link } from 'react-router-dom';
import './Hero.css';

const AnimatedSphere = () => {
  const meshRef = useRef<any>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Sphere args={[1, 100, 100]} ref={meshRef}>
      <MeshDistortMaterial
        color="#ff6b35"
        attach="material"
        distort={0.5}
        speed={2}
        roughness={0.2}
      />
    </Sphere>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Transform Your Body,
            <span className="highlight"> Elevate Your Life</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Premium fitness supplements designed to help you reach your peak performance.
            Scientifically formulated, naturally powered.
          </motion.p>
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link to="/products" className="btn btn-primary">Shop Now</Link>
            <Link to="/about" className="btn btn-secondary">Learn More</Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-3d"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <AnimatedSphere />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
          </Canvas>
        </motion.div>
      </div>

      <div className="hero-features">
        <motion.div
          className="feature"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h3>Premium Quality</h3>
          <p>Lab-tested ingredients</p>
        </motion.div>
        <motion.div
          className="feature"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <h3>Fast Results</h3>
          <p>See changes in weeks</p>
        </motion.div>
        <motion.div
          className="feature"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <h3>Natural Formula</h3>
          <p>No artificial additives</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

