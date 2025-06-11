import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FooterBar = styled(motion.footer)`
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  bottom: 0;
  background: #fff;
  color: #646cff;
  text-align: center;
  padding: 1.2rem 0;
  font-size: 1rem;
  letter-spacing: 0.5px;
  z-index: 100;
  @media (max-width: 600px) {
    padding: 0.8rem 0;
    font-size: 0.95rem;
  }
`;
const Link = styled.a`
  color: #646cff;
  text-decoration: none;
  margin-left: 0.5rem;
  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => (
  <FooterBar
    initial={{ y: 60, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.7, type: 'spring' }}
  >
    &copy; {new Date().getFullYear()} AI Report Analyzer by
   
      <strong> Asad Ali</strong>
    
  </FooterBar>
);

export default Footer; 