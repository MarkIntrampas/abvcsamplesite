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



type dailySET ={
created:string;
HourlySet:WholeHourlySet[];
};

type WholeHourlySet = {
 Top: any[];

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
 
  const [DailySet ,setDailySet] = useState<dailySET[]>([]);
  const activeSheet = sheets[activeSheetIndex];
  const [startInput, setStartInputValue] = useState<string>("");
  const [endInput, setEndInputValue] = useState<string>("");
  const handleExportSheet = () => {
    // TODO: wire up real export logic (e.g. SheetJS) here
    console.log('Export sheet:', activeSheet.name);
  };

  useEffect(() => {
   // alert(date);
    setStartInputValue(date ? setStartInput(date) : "");
    if(end){
      setEndInputValue(end ? setStartInput(end) : "");
    }else{
      setEndInputValue(date ? autoEnd(date) : "");
    }
  loadDataFromQuery();
}, [date]);


useEffect(() => {
  console.log("DailySet updated length:", DailySet.length);
  if (DailySet.length > 0) {
    GenerateReport();
  }
}, [DailySet]);



const setStartInput = (date: string): string => {
  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return "";
  }
 parsedDate.setHours(7, 0, 0, 0);
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

  const parts = formatter.formatToParts(parsedDate);

  const get = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "";

  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}`;
};



const autoEnd = (date: string): string => {
  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return "";
  }

  // Move to the next day
  parsedDate.setDate(parsedDate.getDate() + 1);

  // Set time to 6:00 AM
  parsedDate.setHours(6, 59, 0, 0);

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");
  const hours = String(parsedDate.getHours()).padStart(2, "0");
  const minutes = String(parsedDate.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};



 
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


//aleternative but not final
const formatTaipeiTimeDaysOfTheWeek = (timestamp: string): string => {
    const created = new Date(timestamp);

    if (isNaN(created.getTime())) {
        return "Invalid Date";
    }

    // Subtract 8 hours
    created.setHours(created.getHours() - 8);

    return new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Taipei",
        month: "long",
        day: "numeric",
    })
        .format(created)
        .replace(/\u00A0/g, " ");
};

const loadDataFromQuery = async () => {


  const DataQqeru = new DataBack();
  
  if (date != null) {
    const data = await DataQqeru.DailytHourlyrecordFor(roundTime(date));
   
   setDailySet(data);



  } else {
    alert(start);
    alert(end);
  }
};



const loadDataFromQueryonClick = async () => {

  alert("Data load clicked");
  const DataQqeru = new DataBack();
  
  if (date != null) {
    const data = await DataQqeru.DailytHourlyrecordFor(startInput, endInput);
  
   
   setDailySet(data);
   alert("Data loaded successfully!");



  } else {
    alert(start);
    alert(end);
  }
};

const formatTaipeiTime = (timestamp: string): string => {
    const created = new Date(timestamp);

    if (isNaN(created.getTime())) {
        return "Invalid Date";
    }

    const fmt = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Taipei",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    const parts = fmt.formatToParts(created);

    const get = (type: Intl.DateTimeFormatPartTypes): string =>
        parts.find((p) => p.type === type)?.value ?? "";

    return `${get("hour")}:${get("minute")} ${get("dayPeriod")}`;
};




  const GenerateReport = async () => {
    if (DailySet.length === 0) return;

    const SetSetting: SheetData[] = [];

    DailySet.forEach((daily) => {
        const sheet: SheetData = {
            name: formatTaipeiTimeDaysOfTheWeek(DailySet[0].created),
            row: [],
        };

        daily.HourlySet.forEach((hourly) => {

          for (let i = 0; i < 3; i++) {

                      sheet.row.push({
                  cell: [
                  {
                      type: "th",
                      value: " ",
                  },
              ],
                  });

                }

                
                 sheet.row.push({
                  cell: [
                  {
                      type: "td",
                      value: "Filipijnen",
                  },
                  {
                      type: "th",
                      value: " ",
                  },
                  {
                      type: "td",
                      value: `${formatTaipeiTime(hourly.Top[1])}`,
                  },
              ],
                  });

            sheet.row.push(
                {
                    cell: [
                        {
                            type: "th",
                            value: "Preprocess ToDo",
                        },
                        {
                            type: "td",
                            value: hourly.Top[2],
                        },
                    ],
                },
                {
                    cell: [
                        {
                            type: "th",
                            value: "Validate ToDo",
                        },
                        {
                            type: "td",
                            value: hourly.Top[3],
                        },
                    ],
                },
                {
                    cell: [
                        {
                            type: "th",
                            value: "Qualitycheck ToDo",
                        },
                        {
                            type: "td",
                            value: hourly.Top[4],
                        },
                    ],
                }

              
            );
              sheet.row.forEach((e) => {
              
              for (let i = 0; i <30-e.cell.length; i++) {
             e.cell.push({type: "th",
                            value: " ",});
             }
            });
        });

        SetSetting.push(sheet);
    });

    addSheet(SetSetting);
};



  const handleExportPdf = () => {
    // TODO: wire up real export logic here
    console.log('Export document as PDF');
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
                  className="tv-date-input start-date-input"
                  value={startInput}
                  onChange={(e) => setStartInputValue(e.target.value)}
                />
                <span className="tv-date-separator">to</span>
                <input
                  type="datetime-local"
                  className="tv-date-input"
                  value={endInput}
                  onChange={(e) => setEndInputValue(e.target.value)}
                />
                <button className="tv-generate-btn" onClick={loadDataFromQueryonClick}>
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
                  
                    Export
                  </button>
                </div>

              

                  {sheets.map((sheet, sheetIndex) => (
                <div className="tv-grid-scroll"  style={{
      display: sheetIndex === activeSheetIndex ? "block" : "none"
    }} key={sheetIndex}>
    

                  <table className="tv-grid">
                    <tbody>
                      {sheet.row?.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.cell.map((cell, cellIndex) =>
                            cell.type === "th" ? (
                              <th key={cellIndex}>{cell.value}</th>
                            ) : (
                              <td key={cellIndex}>{cell.value}</td>
                            )
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
                

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