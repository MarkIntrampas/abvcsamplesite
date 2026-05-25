import { createClient } from "@supabase/supabase-js";

type Message = {
  id:number,
  name:string,
  email:string,
  message:string,
  created_at:string,
};

class ContacBack{

      private supabase = createClient(import.meta.env.VITE__BACK_URL,import.meta.env.VITE_BACK_KEY);

     CreateMessage = async (name:string, email: string, message:string): Promise<void> => {         
                                
                    
                    const { error } = await this.supabase
                        .from('Messages')
                        .insert([
                            {
                                 name:String(name),
                                 email:String(email),
                                 message:String(message)
                            }
                        ]);

                    if (error) {
                        alert(error)
                        alert("something wne wrong");
                        throw error;
                    }
                };

                loadAllMessages = async (): Promise<Message[]> => {
                            const { data, error } = await this.supabase
                                .from("Messages")
                                .select("*");
                
                            if (error) {
                                alert("something went wrong in loading the blogs");
                                return [];
                            }
                
                            return data as Message[];
                            };


                            DeleteMessage = async (id: number): Promise<void> => {

                            const { error } = await this.supabase
                                .from("Messages")
                                .delete()
                                .eq("id", id);

                            if (error) {
                                alert(error.message);
                                alert("Something went wrong");
                                throw error;
                            }
                        };
                
                            

}


export default ContacBack;