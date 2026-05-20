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


            ViewRecentBlog =async (): Promise<Blog> => {
                const supabase2 = createClient(import.meta.env.VITE__BACK_URL,import.meta.env.VITE_BACK_KEY);
                    

                const { data, error } = await supabase2
                    .from('blogs')
                    .select('*')
                    .order('id', { ascending: false })
                    .limit(1)
                    .single();

                    if (error) {
                    console.log(error);
                   
                    }

                    if (data) {
                    data.author= await this.updateAuthorName(data.author);
                
                    }


                    return data as Blog;

                    
            }
            
                uploadImage = async (file: File | null): Promise<string> => {

                    if (!file) {
                        throw new Error("No file selected");
                    }
                      
                    const fileName = "public/blog-"+file.name;

                    // Upload image
                    const { error } = await this.supabase.storage
                        .from('blog-images')
                        .upload(fileName, file);
                         
                    if (error) {
                        alert(error);
                        throw new Error("Upload failed");
                    }
                    

                    // Get public URL
                    const { data } =  this.supabase.storage
                        .from('blog-images')
                        .getPublicUrl(fileName);
                       

                    return data.publicUrl;

                }



                CreateBlog = async (name: string, content:string, selectedFile:File | null): Promise<void> => {
                    
                    
                        const storedUser = sessionStorage.getItem("user");

                        if (!storedUser) {
                            alert("Error finding user ID");
                            return;
                        }
                        

                        const user = JSON.parse(storedUser);
                       const uploadLink = await this.uploadImage(selectedFile);
                          
                       
                                
                    
                    const { error } = await this.supabase
                        .from('blogs')
                        .insert([
                            {
                                author:Number(user.Id),
                                blog_title: name,
                                content: content,
                                images: uploadLink,
                            }
                        ]);

                    if (error) {
                        alert("error adding blog");
                        throw error;
                    }
                };



}



export default BlogCrud;