
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

    return(
        <> 
             {blogViewStatus===true ? <BlogViewer  closeOpenAction={blogViewerACTION} selectedBlogid={Number(selectedBlogItem)}  /> : <></>}
            <Nav /> 
            <div id="BlogContainer">

        

          <div id="BlogSec1">

               
              <div id="featuredBlog">
                 
                  <div id="featuredBlogBody">
                    
                        <h1 id="featuredBlogTitle">BLOG TITLE</h1>


                        <div id="featuredBlogBodyContent">
                          <div id="blogAutContainer">
                               <h1 id="blogAut">Author</h1>
                          </div>
                          <div id="blogSubTitleContainer">
                            <h1 id="blogSubTitle">
                            Sub title: Lorem   eyJ1cmwiOiJtZWRpYS9zYW1wbGUucG5nIiwiaWF0IjoxNzQyMjc1ODc5LCJleHAiOjE3NzM4MTE4Nzl9
                              </h1>

                          </div>

                         
                        </div>


                        
                        <div id="featuredBlogAction">
                          <div id="actionTextContainer">
                            <div id="blogActionText">
                              <h1 id="actionText">
                                Headlines Sample Text. small details about the featured blog.
                                Headlines Sample Text. small details about the featured blog.
                              </h1>

                            </div>
                            <button id="blogActionButton">
                              Show more
                            </button>
                            
                          </div>
                        </div>
                        
                  </div>
                  <img  src={sample}  className="blogiItemImage" alt="featured"></img>

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
                  <div className="item" onClick={()=>{ setBeforeViewing(blog.id)}}>
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