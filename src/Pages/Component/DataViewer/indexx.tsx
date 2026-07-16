import './TableViewer.css'
import { useEffect, useState } from 'react';
import DataBack from '../../Back/DataCrud';

interface SheetData {
  name: string;
  headers?: string[];
  rows?: (string | number)[][];
}

interface TableViewerProps {
  closeOpenAction: () => void;
}









type WholeHourlySet = {
created:string;
 Top: any[];

};


interface TableViewerProps {
  closeOpenAction: () => void;
  date?: string | null;
  start?:string;
  end?: string;
}

interface SheetData {
  name: string;
  row:{
    cell:{
    type:string;
    value:string;
    }[]
  }[]
};


// Placeholder data — replace with a real fetch (e.g. useEffect + backend call),
// same pattern BlogViewer uses with BlogBack.ViewBlogById
const title = 'Table Viewer';


const defaultDocumentContent =
  'This document is a placeholder. Pass real content into the documentContent prop to render it here, formatted like a standard word processor page.';

const TableViewer: React.FC<TableViewerProps> =  ({
  closeOpenAction,
  date,
  start,
  end,
}) => {
  const [viewMode, setViewMode] = useState<'SHEET' | 'PDF'>('SHEET');
  const [activeSheetIndex, setActiveSheetIndex] = useState(0);
  const [sheets,addSheet] = useState<SheetData[]>([]);
  const [documentContent] = useState<string>(defaultDocumentContent);
  const [startDateTime, setStartDateTime] = useState<string>('');
  const [endDateTime, setEndDateTime] = useState<string>('');
  const [hourlySet ,setHourlySet] = useState<WholeHourlySet[]>([]);
  const activeSheet = sheets[activeSheetIndex];

  const handleExportSheet = () => {
    // TODO: wire up real export logic (e.g. SheetJS) here
    console.log('Export sheet:', activeSheet.name);
  };

  useEffect(() => {
  loadDataFromQuery();
}, [date]);


useEffect(() => {
  if (hourlySet.length > 0) {
    GenerateReport();
  }
}, [hourlySet]);
 
 const roundTime = (timestamp: string): string => {
    const date = new Date(timestamp);

    if (isNaN(date.getTime())) {
        return "Invalid Date";
    }

    const now = new Date();

    const isToday =
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate();

    if (!isToday) {
        date.setDate(date.getDate() - 1);
    }

    date.setUTCHours(10, 0, 0, 0);

    const pad = (num: number, size = 2) => num.toString().padStart(size, "0");

    return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}T${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}.${pad(date.getUTCMilliseconds(), 3)}000+00:00`;
};

/* 

const formatTaipeiTimeDaysOfTheWeek = (timestamp: string): string => {
    const created = new Date(timestamp);

    if (isNaN(created.getTime())) {
        return "Invalid Date";
    }

    return new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Taipei",
        month: "long",
        day: "2-digit",
    })
    .format(created)
    .replace(/\u00A0/g, " ");
};

*/
const loadDataFromQuery = async () => {


  const DataQqeru = new DataBack();
  
  if (date != null) {
    const data = await DataQqeru.selectHourlyrecordFor(roundTime(date));
   
   setHourlySet(data);



  } else {
    alert(start);
    alert(end);
  }
};



  const GenerateReport = async ()=>{
      
        if(hourlySet){
           
          const SetSetting:SheetData[] =[];
         
         addSheet(SetSetting);
        }
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
              
                     
                    <tbody>
                     
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