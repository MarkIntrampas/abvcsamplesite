import { createClient } from "@supabase/supabase-js";

type Blog = {
  id: number;
  title: string;
  content: string;
  author:string;
};

class BlogCrud{
        private supabase = createClient(import.meta.env.VITE__BACK_URL,import.meta.env.VITE_BACK_KEY);

        loadAllBlogs = async (): Promise<Blog[]> => {
        const { data, error } = await this.supabase
            .from("blogs")
            .select("*");

        if (error) {
            alert("something went wrong in loading the blogs");
            return [];
        }else{
            data.map((e)=>{
                
                e.author=this.updateAuthorName(e.author);
            });
        }

        return data as Blog[];
        };

       updateAuthorName= async (id:number) => {
            const supabase = createClient(import.meta.env.VITE__BACK_URL,import.meta.env.VITE_BACK_KEY);
        
        
                                        const { data} = await supabase
                            .from('users') // or 'users', whatever your table name is
                            .select('*')
                            .eq('id',Number(id))   
                            .single(); // get a single row
                                    
                            return data.username;
        
            }


            deleteBlog= async (id:number) => {
                const supabase = createClient(
                import.meta.env.VITE__BACK_URL,
                import.meta.env.VITE_BACK_KEY
                );

                const { error } = await supabase
                .from("blogs")
                .delete()
                .eq("id", Number(id)); // 👈 pass the id here

                if(error){
                    alert("deletion failed")
                }

        }


        ViewBlogById =async (id:Number): Promise<Blog> => {
           
        
                                        const { data} = await this.supabase
                            .from('blogs') 
                            .select('*')
                            .eq('id',Number(id))   
                            .single(); // get a single row
                                  
                           data.author= await this.updateAuthorName(data.author);
                           return data as Blog;
        
            }





}



export default BlogCrud;