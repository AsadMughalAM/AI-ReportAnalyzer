import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Card = styled(motion.div)`
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
  background: none;
  border-radius: 0;
  box-shadow: none;
  text-align: left;
  color: #232946;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Nunito', 'Inter', 'Poppins', system-ui, Avenir, Helvetica, Arial, sans-serif;
  box-sizing: border-box;
  overflow-x: hidden;
`;
const Title = styled.h2`
  margin-bottom: 1.2rem;
  color: #5A4FF3;
  font-size: 1.4rem;
  font-weight: 700;
  width: 100%;
  text-align: center;
  font-family: inherit;
`;
const Text = styled.pre`
  background: #F8FAFC;
  border-radius: 10px;
  padding: 1.2rem;
  font-size: 1.08rem;
  color: #232946;
  white-space: pre-wrap;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 900px;
  box-sizing: border-box;
  overflow-x: auto;
  font-family: inherit;
  @media (max-width: 900px) {
    max-width: 100vw;
  }
`;
const DownloadBtn = styled.button`
  background: #5A4FF3;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.7em 1.7em;
  font-size: 1.08em;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(90,79,243,0.08);
  transition: background 0.18s, box-shadow 0.18s, transform 0.12s;
  outline: none;
  font-family: inherit;
  &:hover, &:focus {
    background: #F6C177;
    color: #232946;
    box-shadow: 0 4px 16px rgba(246,193,119,0.13);
    transform: translateY(-2px) scale(1.03);
  }
`;

const AnalysisCard = ({ result, fileName, onDownload }) => (
  <Card
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 40 }}
    transition={{ duration: 0.5 }}
  >
    <Title>Analysis Result</Title>
    <Text>{result}</Text>
    <DownloadBtn onClick={onDownload}>
      Download Report
    </DownloadBtn>
  </Card>
);

export default AnalysisCard; 