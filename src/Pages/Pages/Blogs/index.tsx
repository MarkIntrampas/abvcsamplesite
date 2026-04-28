
import './style/Blogstyle.css'
import Nav from '../../Component/Nav'
import './style/Blogstyle.css'; 
import './style/Blogstyle-smaller.css';
import sample from './media/abtsec1.jpg'
import Footer from '../../Component/Footer';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BlogCrud from '../../Back/BlogCrud';
import BlogViewer from '../../Component/BlogViewer';



type Blog = {
  id: number;
  emoji?: string;
  author?:string;
  blog_title?: string;
  content?: string;
};


function Blogs(){
  const navigate= useNavigate();
  const [bloglist,updateBlog] = useState<Blog[]>([]);
 const [BlogInfo, loadRecent] = useState<Blog | null>(null);
  const [blogViewStatus, changeBlogViewStatus] =useState(false);
   const [selectedBlogItem, selectBlog] = useState<Number>();

  const BlogBack= new BlogCrud();


  useEffect(()=>{
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      navigate("/dashboard");
      return;
    }
  
   
  
    loadBlogs();
    loadRecentBlog();

  },[]);



 

    const blogViewerACTION: ()=>void = () => {
   
    loadBlogs();
    changeBlogViewStatus(!blogViewStatus);
    
   }

   const setBeforeViewing = async (id: number) => {
    await selectBlog(id);
    blogViewerACTION();
};


const loadBlogs = async () => {

  const blogs = await BlogBack.loadAllBlogs();
 
  updateBlog(blogs);
};


const loadRecentBlog= async () =>{

   const recentBlog = await BlogBack.ViewRecentBlog();

       loadRecent(recentBlog);

    
 

}

    return(
        <> 
             {blogViewStatus===true ? <BlogViewer  closeOpenAction={blogViewerACTION} selectedBlogid={Number(selectedBlogItem)}  /> : <></>}
            <Nav /> 
            <div id="BlogContainer">

        

          <div id="BlogSec1">
                
                  
              <div id="featuredBlog">
                 
                  <div id="featuredBlogBody">
                    
                        <h1 id="featuredBlogTitle">{BlogInfo?.blog_title}</h1>

                         <div id="featuredBlogAction">
                          <div id="actionTextContainer">
                            <div id="blogActionText">
                            
                                        {BlogInfo?.author}
                            </div>
                           
                            
                          </div>
                        </div>
                        <div id="featuredBlogBodyContent">
                          <div id="blogAutContainer">
                               
                          </div>
                          <div id="blogSubTitleContainer">
                            <h1 id="blogSubTitle">
                                       {BlogInfo?.content
                                ? BlogInfo.content.length > 40
                                  ? BlogInfo.content.slice(0, 40) + "..."
                                  : BlogInfo.content
                                : ""}
                              </h1>
                              

                          </div>

                         
                        </div>


                        
                        
                        
                  </div>

                  <div   className="blogiItemImage">
                    <button id="blogActionButton"  onClick={() => {
                                if (BlogInfo) {
                                  setBeforeViewing(BlogInfo.id);
                                }
                              }}>
                              Show more {">>>"}
                            </button>
                  </div>
                </div>

              
          </div>
               
            
            <div id="BlogSec2">
                <div id="BlogToggle">
                  <h1 id="BlogToggleText">Latest Posts</h1>
                    <div id="BlogButtonContainer">
                      <button className="BlogToggleButtons">MILESTONE</button>
                      <button className="BlogToggleButtons">EVENTS</button>
                      <button className="BlogToggleButtons">LATEST</button>
                    </div>

                    <select id="toogleDropdown" name="fruits">
                     <option value="apple">MILESTONE</option>
                      <option value="banana">EVENTS</option>
                      <option value="cherry">LATEST</option>
                    </select>

                   

                </div>

                <div id ="BlogItemContainer">
                 



                 

                {bloglist.map((blog) => (
                  <div className="item" key={blog.id} onClick={()=>{ setBeforeViewing(blog.id)}}>
                    <img src={sample} alt="featured" className="blogItemImage"></img>
                    <div className="blogItemAuthorContainer">

                       <img src={sample} alt="featured" className="blogItemAuthorImage"></img>
                       <h1 className="blogItemAuthorName">{blog.author}</h1>
                    </div>
                    <div className="blogItemBodyContainer">
                       <h1 className="blogItemTitle">{blog.blog_title}</h1>
                       <h1 className="blogItemContext"> {blog.content}
                       </h1>
                       {/*}
                       <div className="blogItemActionContainer">
                          <button className="blogItemAction">
                            Show more
                          </button>
                       
                       </div> 
                        {*/}


                    </div>
                  
                    
                 

                  </div>
                   ))} 


              
                </div>
                  
             
          </div>


       </div>

       <Footer />
     
       </>
    );
}


export default Blogs;