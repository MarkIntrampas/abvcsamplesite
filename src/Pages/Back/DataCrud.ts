import { createClient } from "@supabase/supabase-js";

type DataDetail = {
    Num: number;
};

class DataBack {
   
  private supabase = createClient(import.meta.env.VITE__BACK_URL,import.meta.env.VITE_BACK_KEY);
    latestData = async (): Promise<DataDetail[]> => {
        const { data, error } = await this.supabase
            .from("Data_Record_Reference")
            .select("*")
            .order("id", { ascending: false })
            .limit(1)
            .single();

        if (error || !data) {
            alert("latest refId not found");
        
        }
        
       return await this.loadDetailByRefId(data.id);

    

    
    };

    loadDetailByRefId = async (id: number): Promise<DataDetail[]> => {
        const { data, error } = await this.supabase
            .from("RECORD_DETAILS")
            .select("*")
            .eq("RecordRef", id);

        if (error || !data) {
            throw error ?? new Error("Record not found");
        }

         

        return data as DataDetail[];
    };
}

export default DataBack;