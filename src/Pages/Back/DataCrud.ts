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

  


latestRefIdsDaily = async (): Promise<RefRow[]> => {
  const { data, error } = await this.supabase
  .rpc("data_record_reference_time_window_10_00_10_59")
  .order("created_at", { ascending: false });

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




}

export default DataBack;