import './TableViewer.css'
import { useState } from 'react';

interface SheetData {
  name: string;
  headers: string[];
  rows: (string | number)[][];
}

interface TableViewerProps {
  closeOpenAction: () => void;
}

// Placeholder data — replace with a real fetch (e.g. useEffect + backend call),
// same pattern BlogViewer uses with BlogBack.ViewBlogById
const title = 'Table Viewer';

const defaultSheets: SheetData[] = [
  {
    name: 'Sheet1',
    headers: ['Item', 'Quantity', 'Unit Price', 'Total'],
    rows: [
      ['Steel Beam', 12, 450, 5400],
      ['Concrete Mix', 30, 85, 2550],
      ['Rebar', 200, 3.5, 700],
    ],
  },
  {
    name: 'Sheet2',
    headers: ['Employee', 'Department', 'Hours'],
    rows: [
      ['J. Cruz', 'Engineering', 160],
      ['M. Santos', 'Operations', 152],
    ],
  },
];

const defaultDocumentContent =
  'This document is a placeholder. Pass real content into the documentContent prop to render it here, formatted like a standard word processor page.';

const TableViewer: React.FC<TableViewerProps> = ({ closeOpenAction }) => {
  const [viewMode, setViewMode] = useState<'SHEET' | 'PDF'>('SHEET');
  const [activeSheetIndex, setActiveSheetIndex] = useState(0);
  const [sheets] = useState<SheetData[]>(defaultSheets);
  const [documentContent] = useState<string>(defaultDocumentContent);
  const [startDateTime, setStartDateTime] = useState<string>('');
  const [endDateTime, setEndDateTime] = useState<string>('');

  const activeSheet = sheets[activeSheetIndex];

  const handleExportSheet = () => {
    // TODO: wire up real export logic (e.g. SheetJS) here
    console.log('Export sheet:', activeSheet.name);
  };

  const handleExportPdf = () => {
    // TODO: wire up real export logic here
    console.log('Export document as PDF');
  };

  const handleGenerate = () => {
    // TODO: wire up real fetch/regeneration logic here using startDateTime / endDateTime
    console.log('Generate for range:', startDateTime, '→', endDateTime);
  };

  return (
    <div className="tv-overlay">
      <div className="tv-wrap">
        <div className="tv-modal">

          <button className="tv-modal-close-btn" onClick={closeOpenAction} aria-label="Close">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          </button>

          <div className="tv-header">
            <div className="tv-header-left">
              <div className="tv-date-range">
                <input
                  type="datetime-local"
                  className="tv-date-input"
                  value={startDateTime}
                  onChange={(e) => setStartDateTime(e.target.value)}
                />
                <span className="tv-date-separator">to</span>
                <input
                  type="datetime-local"
                  className="tv-date-input"
                  value={endDateTime}
                  onChange={(e) => setEndDateTime(e.target.value)}
                />
                <button className="tv-generate-btn" onClick={handleGenerate}>
                  Generate
                </button>
              </div>
            </div>

            <div className="tv-pill">
              <div className={`tv-pill-slider ${viewMode === 'PDF' ? 'right' : 'left'}`} />
              <button
                className={`tv-pill-btn ${viewMode === 'SHEET' ? 'active' : ''}`}
                onClick={() => setViewMode('SHEET')}
              >
                Sheet
              </button>
              <button
                className={`tv-pill-btn ${viewMode === 'PDF' ? 'active' : ''}`}
                onClick={() => setViewMode('PDF')}
              >
                PDF
              </button>
            </div>

          </div>

          <div className="tv-body">
            {viewMode === 'SHEET' ? (
              <div className="tv-sheet-view">
                <div className="tv-sheet-toolbar">
                  <span className="tv-sheet-name">{activeSheet?.name}</span>
                  <button className="tv-export-btn" onClick={handleExportSheet}>
                    <svg viewBox="0 0 24 24"><use href="#ic-export" /></svg>
                    Export
                  </button>
                </div>

                <div className="tv-grid-scroll">
                  <table className="tv-grid">
                    <thead>
                      <tr>
                        <th className="tv-grid-corner"></th>
                        {activeSheet?.headers.map((h, i) => (
                          <th key={i} className="tv-grid-col-header">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {activeSheet?.rows.map((row, rIdx) => (
                        <tr key={rIdx}>
                          <td className="tv-grid-row-header">{rIdx + 1}</td>
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="tv-grid-cell">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="tv-sheet-tabs">
                  {sheets.map((s, idx) => (
                    <button
                      key={idx}
                      className={`tv-sheet-tab ${idx === activeSheetIndex ? 'active' : ''}`}
                      onClick={() => setActiveSheetIndex(idx)}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="tv-pdf-view">
                <div className="tv-pdf-toolbar">
                  <span className="tv-pdf-filename">{title}.pdf</span>
                  <button className="tv-export-btn" onClick={handleExportPdf}>
                    <svg viewBox="0 0 24 24"><use href="#ic-export" /></svg>
                    Export
                  </button>
                </div>

                <div className="tv-pdf-page-scroll">
                  <div className="tv-pdf-page">
                    <p className="tv-pdf-text">{documentContent}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default TableViewer;