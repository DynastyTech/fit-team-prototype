import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Leaf, Zap } from 'lucide-react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about-page">
      <motion.div
        className="about-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Our Story</h1>
        <p>Transforming Lives Through Health & Fitness</p>
      </motion.div>

      <div className="container">
        <motion.section
          className="mission-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>About FITTEAM</h2>
          <p>
            FITTEAM is a health and fitness company that offers various products and programs to support 
            individuals in achieving their goals. We focus on promoting a healthy and active lifestyle.
          </p>
        </motion.section>

        <motion.section
          className="what-we-offer-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>What We Offer</h2>
          <p>
            Our nutritional supplements are designed to enhance physical performance, support weight management 
            and provide overall wellness benefits.
          </p>
          <p>
            We provide coaching and support to individuals looking to make positive lifestyle changes. We offer 
            workout programs, meal plans, and guidance on exercise routine.
          </p>
          <p>
            We aim to inspire and empower individuals to prioritize their health and well-being through our 
            products, programs and community.
          </p>
        </motion.section>

        <div className="values-grid">
          <motion.div
            className="value-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <Award size={48} />
            <h3>Premium Quality</h3>
            <p>All our products are lab-tested and certified to meet the highest industry standards.</p>
          </motion.div>

          <motion.div
            className="value-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Leaf size={48} />
            <h3>Natural Ingredients</h3>
            <p>We use only natural, sustainably-sourced ingredients with no artificial additives.</p>
          </motion.div>

          <motion.div
            className="value-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Zap size={48} />
            <h3>Proven Results</h3>
            <p>Our formulas are backed by scientific research and proven to deliver real results.</p>
          </motion.div>

          <motion.div
            className="value-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Users size={48} />
            <h3>Community First</h3>
            <p>Join thousands of satisfied customers who trust FitTeam for their fitness needs.</p>
          </motion.div>
        </div>

        <motion.section
          className="story-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>FITTEAM Provides You The Opportunity To Transform Life</h2>
          <p>
            We believe there's nothing quite as powerful as a community of individuals who are all striving to 
            be the best versions of themselves. When you surround yourself with people who are constantly pushing 
            themselves to grow, learn, and achieve, it can be incredibly inspiring and motivating. In our community, 
            there's a sense of shared purpose and support. Everyone is here to help each other, to cheer each other 
            on, and to hold each other accountable.
          </p>
        </motion.section>

        <motion.section
          className="together-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Together We Can Achieve Greatness</h2>
          <div className="ceo-quote">
            <p className="quote-text">
              "As a global lifestyle brand, we want to create a community where people are thriving and not just 
              surviving. At FITTEAM everyone has the ability to transform their lives and live their dreams."
            </p>
            <p className="quote-author">– Christopher Hummel</p>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;

