import { createClient } from "@supabase/supabase-js";

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


    type RefRow = {
  id: number;
  created_at: string;
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


class DataBack {
  
   
  private supabase = createClient(import.meta.env.VITE__BACK_URL,import.meta.env.VITE_BACK_KEY);
    
  latestRef = async ():Promise<{id:number, datetime:string}> => {
        const { data, error } = await this.supabase
            .from("Data_Record_Reference")
            .select("*")
            .order("id", { ascending: false })
            .limit(1)
            .single();

        if (error || !data) {
            alert("latest refId not found");
         
        }
        
       return {
        id:data.id,
        datetime:data.created_at,
       };

    

    
    };



      latestRefIds = async (): Promise<{id: number, datetime:string}[]> => {
    const { data, error } = await this.supabase
        .from("Data_Record_Reference")
        .select("*")
        .order("id", { ascending: false })
        .limit(14);

    if (error || !data) {
        throw new Error("Latest refIds not found");
    }

    return data.map(item => ({
        id: item.id,
        datetime: item.created_at,
    }));
        };

DailytHourlyrecordFor = async (
    date: string,
    end?: string
): Promise<dailySET[]> => {
    const ids = await this.RefIdsBaseoonDate(date, end);

    console.log("ids length:", ids.length);

    const sets: dailySET[] = [];

    for (const e of ids) {
        const created = new Date(e.created_at);

        const top = await this.TopTableByid(e.id);
        const details = await this.loadDetailBySinglefId(e.id);
        const bottom = await this.BottomTableById(e.id);

        // Find an existing business-day group
        let daily = sets.find((group) => {
            const groupDate = new Date(group.created);

            const start = new Date(groupDate);
            start.setUTCHours(23, 0, 0, 0);

            // If the group's created time is before 23:00 UTC,
            // its business day started the previous calendar day.
            if (groupDate < start) {
                start.setUTCDate(start.getUTCDate() - 1);
            }

            const end = new Date(start);
            end.setUTCDate(end.getUTCDate() + 1);

            return created >= start && created < end;
        });

        // Create a new business-day group if one doesn't exist
        if (!daily) {
            daily = {
                created: e.created_at,
                HourlySet: [],
            };

            sets.push(daily);
        }

        daily.HourlySet.push({
            Top: top,
            details: details,
            bottom: bottom,
        });
    }

    console.log("sets length:", sets.length);

    return sets;
};


adjustCreatedAtByTaipeiDate = (created_at: string, startingDate: string): string => {
    const taipeiDate = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Taipei",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(new Date());

    const startingTaipeiDate = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Taipei",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(new Date(startingDate));

    // If starting date is not today in Taipei, add 1 day
    if (startingTaipeiDate !== taipeiDate) {
        const newDate = new Date(created_at);
        newDate.setDate(newDate.getDate() + 1);

        return newDate.toISOString();
    }

    // If starting date is today, keep original created_at
    return created_at;
};



formatUTC = (date: Date) => {
  const pad = (n: number, len = 2) => n.toString().padStart(len, "0");

  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}T` +
         `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}.` +
         `${pad(date.getUTCMilliseconds(), 3)}000+00:00`;
};


RefIdsBaseoonDate = async (date: string, end?: string): Promise<RefRow[]> => {
    
 

let endDate: Date;
let startDate: Date;

   startDate = new Date(date);
    startDate.setUTCDate(end ? startDate.getUTCDate(): startDate.getUTCDate() + 1);
    startDate.setUTCHours(23, 0, 0, 0);
    
    endDate = new Date(end ?? startDate);
    endDate.setUTCDate(endDate.getUTCDate() + 1);
    endDate.setUTCHours(22, 59, 0, 0);

  console.log("startDateinRef:", this.formatUTC(startDate));
  console.log("endDateInRef:", this.formatUTC(endDate));

  const { data, error } = await this.supabase.rpc(
    "data_record_reference_with_starting_date",
    {
      p_start: this.formatUTC(startDate),
      p_end: this.formatUTC(endDate),
    }
  );

  if (error) {
    alert("error from RefIdsBaseoonDate");
    return [];
  }
  
  return data as RefRow[];
};


latestRefIdsDaily = async (): Promise<RefRow[]> => {
 const { data, error } = await this.supabase
  .rpc("data_record_reference_time_window_10_00_10_59")
  .order("created_at", { ascending: false })
  .limit(7);


   


  if (error) {
    console.error('RPC error:', error);
    throw error;
  }

  return data ?? [];
};


latestRefIdsDailyWithDateRange = async (): Promise<RefRow[]> => {
 const { data, error } = await this.supabase
  .rpc("data_record_reference_time_window_10_00_10_59")
  .order("created_at", { ascending: false })
  .limit(7);

  if (error) {
    console.error('RPC error:', error);
    throw error;
  }

  return data ?? [];
};


    loadDetailByRefId = async (): Promise<DataDetailMore> => {
     const ref = await this.latestRef();
    const { data, error } = await this.supabase
    .from("RECORD_DETAILS")
    .select("*")
    .eq("RecordRef", ref.id)
    .neq("Name", "Average");

    if (error || !data) {
        throw error ?? new Error("Record not found");
    }

    let total = 0;
    let activeProcessor =0 ;
    

    data.forEach((row) => {
        total += Number(row.Total ?? 0);
        //totalTodo += Number(row.Todo ?? 0); // or row.todo ? 1 : 0 if todo is boolean
    if(row.LastHour>0){activeProcessor++;}
    
    });
 
    
    return {
        DataTable: data,
        total:total,
        totalTodo:data[0].Todo,
        totalEntry: data.length,
        datetime:ref.datetime,
        active:activeProcessor,
    } as DataDetailMore;
};




 loadDetailBySinglefId = async (id: number): Promise<DataDetailMore> => {
     
    const { data, error } = await this.supabase
    .from("RECORD_DETAILS")
    .select("*")
    .eq("RecordRef", id)
    .neq("Name", "Average");

    if (error || !data) {
        throw error ?? new Error("Record not found");
    }

    let total = 0;
    let activeProcessor =0 ;
    

    data.forEach((row) => {
        total += Number(row.Total ?? 0);
        //totalTodo += Number(row.Todo ?? 0); // or row.todo ? 1 : 0 if todo is boolean
    if(row.LastHour>0){activeProcessor++;}
    
    });
 
    
    return {
        DataTable: data,
        total:total,
        totalTodo:data[0].Todo,
        totalEntry: data.length,
        active:activeProcessor,
    } as DataDetailMore;
};

lastmonthTotal = async (): Promise<number> => {

   const now = new Date();
const taipeiNow = new Date(
  now.toLocaleString("en-US", { timeZone: "Asia/Taipei" })
);

const year = taipeiNow.getFullYear();
const month = taipeiNow.getMonth();

// First day of previous month (Taipei)
const startTaipei = new Date(year, month - 1, 1, 0, 0, 0, 0);

// Last day of previous month (Taipei)
const endTaipei = new Date(year, month, 0, 23, 59, 59, 999);

// Convert Taipei time to UTC
const startUtc = new Date(startTaipei.getTime() - 8 * 60 * 60 * 1000);
const endUtc = new Date(endTaipei.getTime() - 8 * 60 * 60 * 1000);

const ref = await this.RefIdsBaseoonDate(
  startUtc.toISOString(),
  endUtc.toISOString()
);

    let lastMonthTotal = 0;
      console.log(ref.length  + " records found for last month");
      
 for (const row of ref) {
    const date = new Date(row.created_at);

    const timeInMinutes =
        date.getUTCHours() * 60 + date.getUTCMinutes();


    if (timeInMinutes >= (20 * 60 + 59) && timeInMinutes <= (22 * 60)) {
        lastMonthTotal += await this.BottomTableTotal(row.id);
        console.log(`Adding total for ref ${row.id}: ${lastMonthTotal} at ${row.created_at}   `);
    }
}


    return lastMonthTotal;
};


 DailyTotal = async (): Promise<number> => {

    const ref = await this.latestRef();

    const { data, error } = await this.supabase
        .from("Bottom_Record")
        .select("Total")
        .eq("ref", ref.id);

    if (error || !data) {
        throw error ?? new Error("Bottom_Record not found");
    }

    let todaysTotal = 0;

    data.forEach(row => {
        todaysTotal += Number(row.Total ?? 0);
    });

    return todaysTotal;
}


BottomTable = async (): Promise<bottom[]> => {

    const ref = await this.latestRef();

    const { data, error } = await this.supabase
        .from("Bottom_Record")
        .select("*")
        .eq("ref", ref.id);

    if (error || !data) {
        throw error ?? new Error("Bottom_Record not found");
    }

    
   
    return data as bottom[];
}

BottomTableById = async (ref: number): Promise<bottom[]> => {

   

    const { data, error } = await this.supabase
        .from("Bottom_Record")
        .select("*")
        .eq("ref", ref);

    if (error || !data) {
        throw error ?? new Error("Bottom_Record not found");
    }

    
   
    return data as bottom[];
}



            BottomTableTotal = async (ref:number): Promise<number> => {
              

                const { data, error } = await this.supabase
                    .from("Bottom_Record")
                    .select("Total")
                    .eq("ref", ref);

                if (error || !data) {
                    throw error ?? new Error("Bottom_Record not found");
                }
             
                const total = data.reduce((sum, row) => sum + Number(row.Total), 0);

                return total;
            };


     
        

 hourlyTotal = async (): Promise<{ id: number; datetime: string; total: number }[]> => {
    const refs = await this.latestRefIds();

    return Promise.all(
        refs.map(async (ref) => ({
            id: ref.id,
            datetime: ref.datetime,
            total: await this.BottomTableTotal(ref.id),
        }))
    );
};


 DailyTotalInAweek = async (): Promise<{ id: number; datetime: string; total: number }[]> => {
    const refs = await this.latestRefIdsDaily();
    
    return Promise.all(
        refs.map(async (ref) => ({
            id: ref.id,
            datetime: ref.created_at,
            total: await this.BottomTableTotal(ref.id),
        }))
    );
};


TopTable = async (): Promise<any[]> => {
  const ref = await this.latestRef();

  const { data, error } = await this.supabase
    .from("SUMMARY_TOP")
    .select("*")
    .eq("RecordRef", ref.id);

  if (error || !data || data.length === 0) {
    throw error ?? new Error("No data found");
  }

  // get column names
  const keys = Object.keys(data[0]);

  // transpose: column -> array
  const result = keys.map((key) =>
    data.map((row) => row[key])
  );

  return result;
};

TopTableByid = async (id:number): Promise<any[]> => {
  

  const { data, error } = await this.supabase
    .from("SUMMARY_TOP")
    .select("*")
    .eq("RecordRef", id);

  if (error || !data || data.length === 0) {
    throw error ?? new Error("No data found");
  }

  // get column names
  const keys = Object.keys(data[0]);

  // transpose: column -> array
  const result = keys.map((key) =>
    data.map((row) => row[key])
  );

  return result;
};




}

export default DataBack;