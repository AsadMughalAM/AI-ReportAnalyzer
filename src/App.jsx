import React, { useState } from 'react';
import pdfToText from 'react-pdftotext';
import styled, { createGlobalStyle } from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import AnalysisCard from './components/AnalysisCard';
import Header from './components/Header';
import Footer from './components/Footer';
import { downloadReport } from './utils/download';

const elegantTheme = {
  primary: '#5A4FF3', // Elegant purple
  accent: '#F6C177', // Soft gold
  bg: '#F8FAFC', // Very light blue/gray
  cardBg: '#FFFFFF',
  text: '#232946', // Deep blue-gray
};

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap');
  html, body {
    background: ${elegantTheme.bg};
    color: ${elegantTheme.text};
    font-family: 'Nunito', 'Inter', 'Poppins', system-ui, Avenir, Helvetica, Arial, sans-serif;
    margin: 0;
    min-height: 100vh;
    transition: background 0.3s, color 0.3s;
    overflow-x: hidden;
  }
  * {
    box-sizing: border-box;
  }
`;

const AppContainer = styled.main`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
  padding-bottom: 100px;
  box-sizing: border-box;
  @media (max-width: 600px) {
    padding-top: 70px;
    padding-bottom: 70px;
  }
`;
const UploadSection = styled(motion.section)`
  background: ${elegantTheme.cardBg};
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(90,79,243,0.08), 0 1.5px 6px rgba(0,0,0,0.04);
  padding: 2.5rem 2.5rem 2.5rem 2.5rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 420px;
  width: 100%;
  @media (max-width: 600px) {
    padding: 1.2rem 0.7rem;
    max-width: 98vw;
  }
`;
const FileLabel = styled.label`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${elegantTheme.text};
  margin-bottom: 1rem;
  display: block;
`;
const FileInput = styled.input`
  margin-bottom: 1.5rem;
  font-size: 1rem;
  padding: 0.5em;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  width: 100%;
  font-family: inherit;
`;
const AnalyzeBtn = styled.button`
  background: ${elegantTheme.primary};
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.7em 1.5em;
  font-size: 1em;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s, transform 0.12s;
  margin-top: 0.5rem;
  box-shadow: 0 2px 8px rgba(90,79,243,0.08);
  &:disabled {
    background: #b3b7ff;
    cursor: not-allowed;
  }
  &:hover:not(:disabled), &:focus-visible:not(:disabled) {
    background: ${elegantTheme.accent};
    color: ${elegantTheme.text};
    box-shadow: 0 4px 16px rgba(246,193,119,0.13);
    transform: translateY(-2px) scale(1.03);
  }
`;

function App() {
  const [file, setFile] = useState();
  const [value, setValue] = useState("");
  const [loader, setLoader] = useState(false);
  const [fileName, setFileName] = useState("");

  const submit = async () => {
    if (!file) {
      alert("Please upload a file");
      return;
    }
    setLoader(true);
    const ExtractedText = await pdfToText(file);
    if (ExtractedText) {
      const response = await fetchDataUsingGemini(ExtractedText);
      if (response?.candidates?.[0]?.content?.parts?.[0]?.text) {
        const result = response.candidates[0].content.parts[0].text;
        setValue(result);
        setFileName(file.name.replace(/\.[^/.]+$/, ""));
      } else {
        setValue("No analysis result returned.");
      }
      setLoader(false);
    }
  };

  const fetchDataUsingGemini = async (data) => {
    const prompt = `You are a medical expert. Read the following medical report and provide a concise, structured summary. Highlight key findings, possible diagnoses, and actionable recommendations. Use clear, professional language.\n\nMedical Report:\n${data}`;
    const apiKey = 'AIzaSyB9w7VaEY6cqv-KtfDqUl0bgSUrLd5jpqA';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const requestBody = {
      contents: [
        {
          parts: [
            { text: prompt }
          ]
        }
      ]
    };
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      alert("Error fetching data from Gemini API", error);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Header />
      <AppContainer>
        <AnimatePresence>
          <UploadSection
            key="upload-section"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5 }}
          >
            <FileLabel htmlFor="file-upload">Upload PDF Report</FileLabel>
            <FileInput
              id="file-upload"
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <AnalyzeBtn onClick={submit} disabled={loader}>
              {loader ? "Analyzing..." : "Analyze Report"}
            </AnalyzeBtn>
          </UploadSection>
        </AnimatePresence>
        <AnimatePresence>
          {value && (
            <motion.div
              key="analysis-card"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5 }}
              style={{ width: '100%' }}
            >
              <AnalysisCard
                result={value}
                fileName={fileName}
                onDownload={() => downloadReport(fileName, value)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </AppContainer>
      <Footer />
    </>
  );
}

export default App;