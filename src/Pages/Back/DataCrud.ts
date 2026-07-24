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

DailytHourlyrecordFor = async (date: string, end?: string): Promise<dailySET[]> => {
    const ids = await this.RefIdsBaseoonDate(date, end);

    const sets: dailySET[] = [];
    let tempDate = "";
    for (const e of ids) {
      
        const created = new Date(e.created_at);
        const top = await this.TopTableByid(e.id);
        const details = await this.loadDetailBySinglefId(e.id);
        const bottom = await this.BottomTableById(e.id);

       let daily = sets.find(() => {
    const createdDate = new Date(created);

    const start = new Date(createdDate);
    start.setUTCHours(23, 0, 0, 0); 

    // If record is before 22:00 UTC, it belongs to yesterday's business day
    if (createdDate < start) {
        start.setUTCDate(start.getUTCDate() - 1);
    }

    const end = new Date(start);
    end.setUTCDate(end.getUTCDate() + 1);

    return created >= start && created < end;
});
        if (!daily) {
            if(sets.length>0){
            sets[0].created=tempDate; // Update the last entry's created date
            }

            daily = {
                created:e.created_at, // Assuming the last entry in 'top' has the correct date
                HourlySet: [],
            };
             tempDate = e.created_at;
            sets.push(daily);
        }
         if(sets.length===1){
           
            sets[0].created=tempDate; // Update the last entry's created date
           
            }

        daily.HourlySet.push({
            Top: top,
            details: details, 
            bottom: bottom,
        });
    }

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
    
 const startDate = new Date(date);
 startDate.setUTCDate(startDate.getUTCDate() + 1);
startDate.setUTCHours(23, 0, 0, 0);

let endDate: Date;

  if (end) {
    endDate = new Date(end);
  } else {
    endDate = new Date(startDate);
    endDate.setUTCDate(endDate.getUTCDate() + 1);
    endDate.setUTCHours(22, 59, 0, 0);
  }
  console.log("startDateinRef:", startDate.toISOString());
  console.log("endDateInRef:", endDate.toISOString());

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