import React from 'react';
import Hero from '../components/Hero';
import ProductCarousel from '../components/ProductCarousel';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home">
      <Hero />
      <ProductCarousel />
    </div>
  );
};

export default Home;

