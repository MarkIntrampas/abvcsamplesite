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

}

export default DataBack;