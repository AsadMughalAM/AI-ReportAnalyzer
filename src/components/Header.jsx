import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import logo from '../assets/react.svg';

const HeaderBar = styled(motion.header)`
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  color: #646cff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.2rem 2.5rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  z-index: 100;
  @media (max-width: 600px) {
    padding: 0.8rem 1rem;
  }
`;
const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const LogoImg = styled.img`
  height: 2.5rem;
  @media (max-width: 600px) {
    height: 2rem;
  }
`;
const AppName = styled.h1`
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: 1px;
  margin: 0;
  @media (max-width: 600px) {
    font-size: 1.1rem;
  }
`;

const Header = () => (
  <HeaderBar
    initial={{ y: -60, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.7, type: 'spring' }}
  >
    <LogoWrap>
      
      <AppName>AI Report Analyzer</AppName>
    </LogoWrap>
  </HeaderBar>
);

export default Header; 