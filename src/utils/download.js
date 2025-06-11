import jsPDF from 'jspdf';

export function downloadReport(fileName, text) {
  const doc = new jsPDF();
  const lines = doc.splitTextToSize(text, 180);
  doc.text(lines, 15, 20);
  doc.save(`${fileName || 'analysis-report'}.pdf`);
} 