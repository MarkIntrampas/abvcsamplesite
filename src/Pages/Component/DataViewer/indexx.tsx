import './TableViewer.css'
import { useEffect, useState } from 'react';
import * as XLSX from "xlsx-js-style";
import DataLoading from '../DataLoading';
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


type DataDetail = {
    Num: number;
    Name:string;
    LastHour: number;
    Todo:number;
    Total:number;
    EndOfDayTotal:number;
    InactivityTime:string;
    PauseTime:string;
    RecordRef:number;
    id:number;
};

type DataDetailMore = {
    DataTable:DataDetail[];
    total:number;
    totalTodo:number;
    totalEntry:number; 
    datetime:string;
    active:number;
};


type bottom = {
SolutionGroup:string;
LastHour:number;
Todo:number;
Total:number;

};

type dailySET ={
created:string;
HourlySet:WholeHourlySet[];
};

type WholeHourlySet = {
 Top: any[];
 details?: DataDetailMore;
 bottom?:bottom[];

};





// Placeholder data — replace with a real fetch (e.g. useEffect + backend call),
// same pattern BlogViewer uses with BlogBack.ViewBlogById
const title = 'Table Viewer';


const defaultDocumentContent =
  'This document is a placeholder. Pass real content into the documentContent prop to render it here, formatted like a standard word processor page.';

const TableViewer: React.FC<TableViewerProps> =  ({
  closeOpenAction,
  date,
}) => {
  const [viewMode, setViewMode] = useState<'SHEET' | 'PDF'>('SHEET');
  const [activeSheetIndex, setActiveSheetIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sheets,addSheet] = useState<SheetData[]>([]);
  const [documentContent] = useState<string>(defaultDocumentContent);
 
  const [DailySet ,setDailySet] = useState<dailySET[]>([]);
  const activeSheet = sheets[activeSheetIndex];
  const [startInput, setStartInputValue] = useState<string>("");
  const [endInput, setEndInputValue] = useState<string>("");
 

  useEffect(() => {
 
  loadDataFromQuery();
}, [date]);

useEffect(() => {
    setStartInputValue(date ? setStartInput(date) : "");
    setEndInputValue(date ? setStartInput(date) : " ");
},[]);

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

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()-1).padStart(2, "0");

  return `${year}-${month}-${day}`;
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
    setLoading(false);
  }
};



const loadDataFromQueryonClick = async () => {

  
  setLoading(true);
  addSheet([]);
setActiveSheetIndex(0);
  const DataQqeru = new DataBack();
  
  if (startInput != null && endInput != null) {
    const data = await DataQqeru.DailytHourlyrecordFor(startInput, endInput);
  
   console.log("Data fetched length:", data.length);
   setDailySet(data);




  } else {
    alert("Please provide both start and end dates.");
    alert(`Start: ${startInput}, End: ${endInput}`);
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




 const GenerateReport = () => {
    if (!DailySet?.length) return;

    const TOTAL_COLUMNS = 30;
    const EMPTY_CELL = {
        type: "th",
        value: " ",
    };

    const createEmptyCells = (count: number) =>
        Array.from({ length: count }, () => ({ ...EMPTY_CELL }));

    const normalizeRow = (row: SheetData["row"][number]) => {
        const missing = TOTAL_COLUMNS - row.cell.length;

        if (missing > 0) {
            row.cell.push(...createEmptyCells(missing));
        }

        return row;
    };

    const SetSetting: SheetData[] = DailySet.map((daily) => {

        const sheet: SheetData = {
            name: formatTaipeiTimeDaysOfTheWeek(daily.created),
            row: [],
        };

        daily.HourlySet.forEach((hourly) => {

            // spacing rows
            sheet.row.push({
                cell: createEmptyCells(3),
            });

            // Location / time row
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
                        type: "th",
                        value: " ",
                    },
                    
                    {
                        type: "td",
                        value: formatTaipeiTime(hourly.Top?.[1] ?? ""),
                    },
                ],
            });

            // Task rows
            const tasks = [
                ["Preprocess ToDo", hourly.Top?.[2]],
                ["Validate ToDo", hourly.Top?.[3]],
                ["Qualitycheck ToDo", hourly.Top?.[4]],
            ];

            tasks.forEach(([label, value]) => {
                sheet.row.push({
                    cell: [
                        {
                            type: "th",
                            value: label,
                        },
                        {
                            type: "td",
                            value: value ?? "",
                        },
                    ],
                });
            });
                 // Header
        sheet.row.push({
            cell: [
                "#",
                "Name",
                "Last hour",
                "ToDo",
                "Total",
                "End of day total",
                "Inactivity Time",
                "Pause Time",
            ].map(value => ({
                type: "th",
                value,
            })),  
        });
       

        hourly.details?.DataTable.forEach(detail => {
  sheet.row.push({
    cell: Object.values(detail)
      .slice(0, -2) // remove last and second-to-last columns
      .map(value => ({
        type: "td",
        value: value?.toString() ?? "",
      }))
  });
});


       for(let i =1; i < 3; i++) {
             sheet.row.push({
                cell: createEmptyCells(6),
            });
          }

         hourly.bottom?.forEach(detail => {
        sheet.row.push({
          cell: Object.values(detail).map((value) => ({
            type: "td",
            value: value?.toString() ?? "",
          })),
        });
      });   




          for(let i =1; i < 5; i++) {
             sheet.row.push({
                cell: createEmptyCells(6),
            });
          }
       
        });


        // Normalize all rows once
        sheet.row = sheet.row.map(normalizeRow);

        return sheet;
    });


    addSheet(SetSetting);
    setLoading(false);
};





const handleExportPdf = () => {

};

 const handleExportSheet = () => {
  if (sheets.length === 0) {
    alert("There is no report to export.");
    return;
  }

  const workbook = XLSX.utils.book_new();

  sheets.forEach((sheet) => {

    const worksheetData = sheet.row.map((row) =>
      row.cell.map((cell) => cell.value)
    );

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Apply styles based on your original TableViewer cell type
    sheet.row.forEach((row, rowIndex) => {
      row.cell.forEach((cell, colIndex) => {

        const address = XLSX.utils.encode_cell({
          r: rowIndex,
          c: colIndex,
        });
        
   const shouldFillCell = (
  value: any,
  row: SheetData["row"][number],
  colIndex: number
): boolean => {

  const text = value?.toString().trim() ?? "";

  // Detect time formats:
  // 7:00 PM, 07:00 PM, 19:00, 07:00
  const isTime = /^(\d{1,2}):(\d{2})(\s?(AM|PM))?$/i.test(text);

  // Skip only the time cell beside "Filipijnen"
  const isFilipijnenTime =
    row.cell[0]?.value === "Filipijnen" &&
    colIndex === 3 &&
    isTime;

  if (isFilipijnenTime) {
    return false;
  }

  // Blank cell handling
  if (text === "") {

    // If this is the ToDo column and first column is a number, fill it
const firstColumnValue = row.cell[0]?.value?.toString().trim();

const firstColumnIsNumber =
  firstColumnValue !== "" &&
  firstColumnValue !== null &&
  firstColumnValue !== undefined &&
  !isNaN(Number(firstColumnValue));

const isTodoColumn = colIndex === 5;

if (isTodoColumn && firstColumnIsNumber) {
  return true;
}

    return false;
  }

  return true;
};

        if (!worksheet[address]) return;

        const isHeader = cell.type === "th";

        worksheet[address].s = {
         font: {
            name: "Tahoma",
            sz: cell.value?.toString().trim() === "Filipijnen" ? 18 : 10,
            bold: isHeader,
          },
          alignment: {
            vertical: "center",
            horizontal: isHeader ? "center" : "left",
            wrapText: true,
          },
          border: {
            top: {
              style: "thin",
              color: { rgb: "D9D9D9" },
            },
            bottom: {
              style: "thin",
              color: { rgb: "D9D9D9" },
            },
            left: {
              style: "thin",
              color: { rgb: "D9D9D9" },
            },
            right: {
              style: "thin",
              color: { rgb: "D9D9D9" },
            },
          },
         fill: shouldFillCell(cell.value, row, colIndex)
  ? {
      fgColor: { rgb: "E7E6E6" },
    }
  : undefined,
        };
      });
    });


    // Auto-size columns
    const maxCols = Math.max(...worksheetData.map((r) => r.length));

    worksheet["!cols"] = Array.from({ length: maxCols }, (_, col) => {
      const width = Math.max(
        ...worksheetData.map((row) =>
          row[col] ? row[col].toString().length : 0
        )
      );

      return {
        wch: Math.min(Math.max(width + 2, 12), 40),
      };
    });


    // Excel sheet names are limited to 31 characters
    const sheetName = sheet.name.substring(0, 31);

    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  });


  const firstDate = sheets[0].name;
  const lastDate = sheets[sheets.length - 1].name;

  let fileName: string;

  if (firstDate === lastDate) {
    fileName = `Teller record for ${firstDate}.xlsx`;
  } else {
    fileName = `Teller record for ${firstDate} - ${lastDate}.xlsx`;
  }
 XLSX.writeFile(workbook, fileName);
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
                        type="date"
                        className="tv-date-input start-date-input"
                        value={startInput}
                        onChange={(e) => setStartInputValue(e.target.value)}
                      />

                      <span className="tv-date-separator">to</span>

                      <input
                        type="date"
                        className="tv-date-input"
                        value={endInput}
                        onChange={(e) => setEndInputValue(e.target.value)}
                      />

                      <button
                        className="tv-generate-btn"
                        onClick={loadDataFromQueryonClick}
                      >
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
             {loading ? <div className="loadingContainer"><DataLoading /></div> : null}
              {date===null && DailySet.length<=0  && !loading ? <div className="loadingContainer"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10"></circle>
  <line x1="12" y1="8" x2="12" y2="12"></line>
  <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
  <h3 className="tv-date-range-error">Please select a date range.</h3></div> : null}
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