import { createClient } from "@supabase/supabase-js";
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

}


export default ContacBack;