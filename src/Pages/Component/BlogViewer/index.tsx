import './BlogViewer.css'
import { useEffect, useState } from 'react';
import BlogCrud from '../../Back/BlogCrud';


interface BlogProps{
  closeOpenAction: ()=> void;
  selectedBlogid:Number;
};

type Blog = {
  id: number;
  emoji?: string;
  author?:string;
  blog_title?: string;
  content?: string;
  images?:string;
};



const BlogViewer: React.FC<BlogProps> = ({ closeOpenAction, selectedBlogid }) =>{
  const BlogBack = new BlogCrud();

  

  const [BlogInfo, updateBlogInfo] = useState<Blog | null>(null);
  const [deletingOverlay, changeDeleting] = useState(false);
  const [title, getTitle] = useState<string>();
  const [blogContent, getBlogContent] = useState<string>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  


  // Select File
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };


  useEffect(() => {
    const loadBlogInfo = async () => {
      if(selectedBlogid){
      const blog = await BlogBack.ViewBlogById(Number(selectedBlogid));
      updateBlogInfo(blog); // ✅ store object directly
      }
    };
      
    loadBlogInfo();
  }, [selectedBlogid]);




const deleteAction = ()=>{
 changeDeleting(!deletingOverlay);
}

const deleteConfirmed = async ()=>{
  await BlogBack.deleteBlog(Number(selectedBlogid));
  closeOpenAction();
}

const createBlog = async ()=>{
  
 

  await  BlogBack.CreateBlog(String(title), String(blogContent),selectedFile);

  closeOpenAction();
}




 const removeTitleImg =()=>{
  /*
    document.getElementById('titleImgThumb').src = '';
    document.getElementById('titleImgName').textContent = '';
    document.getElementById('titleImgWrap').classList.remove('visible');
    document.getElementById('titleFileInput').value = '';
    */
  }
  
  if(Number(selectedBlogid) > 0){
    return(<>

           


    <div className="bp-overlay">
      <div className="bp-wrap">
        <div className="bp-modal" id="bpModal">

          <div className="bp-header" >
            <div className="bp-header-left">
              <div className="bp-logo-box">
                <svg viewBox="0 0 24 24" fill="none"><use href="#ic-blog" stroke="white"/></svg>
              </div>
              <span className="bp-title-label">
                <svg viewBox="0 0 24 24"><use href="#ic-blog"/></svg>
                Blog Post
              </span>
            </div>
            <span className="bp-status viewing" id="statusBadge" style={{ display:  sessionStorage.getItem("user") ? 'flex' : 'none' }}>
              <svg viewBox="0 0 24 24"><use href="#ic-eye"/></svg>
              Viewing
            </span>
          </div>

          <div className="bp-body">
            <div  id="coverWrap">
              <div className="bp-cover-placeholder" id="coverPlaceholder">
                <svg viewBox="0 0 24 24" fill="none"><use href="#ic-image"/></svg>
                <span>Add Cover Image</span>
              </div>
              <img  id="coverImg" src={BlogInfo?.images} alt="cover"></img>
             
               
            </div>

            <div className="bp-meta">
              <span className="bp-tag">
                <svg viewBox="0 0 24 24" width="10" height="10"><use href="#ic-tag"/></svg>
                Technology
              </span>
              <span className="bp-date">
                <svg viewBox="0 0 24 24"><use href="#ic-calendar"/></svg>
                April 10, 2026
              </span>
              <span className="bp-author-role">| BY: {BlogInfo?.author}</span>
            </div>

            <textarea className="bp-post-title" id="postTitle" value={BlogInfo?.blog_title}>

            </textarea>

            <div className="bp-title-img-wrap" id="titleImgWrap">
              <img className="bp-title-img-thumb" id="titleImgThumb" src="" alt=""></img>
              <span className="bp-title-img-name" id="titleImgName"></span>
              <button className="bp-title-img-remove" onClick={ ()=>removeTitleImg()}>
                <svg viewBox="0 0 24 24" width="10" height="10"><use href="#ic-close"/></svg>
                Remove
              </button>
            </div>

    {/*}
            <div className="bp-author-row">
              <div className="bp-avatar">AB</div>
              <span className="bp-author-role">{BlogInfo?.author}</span>
            </div>
    
            <span className="bp-section-label" id="contentLabel">
              <svg viewBox="0 0 24 24"><use href="#ic-pencil"/></svg>
              Body Content
            </span>
    {
            <textarea className="bp-content" id="postContent"  value={BlogInfo?.content || ""}>
            
            </textarea>
        */}  
            <p className="bp-content-viewing">
              {BlogInfo?.content}

            </p>
            <div className="bp-content-images" id="contentImages"></div>

            <button className="bp-add-img-btn" id="addImgBtn">
              <svg viewBox="0 0 24 24"><use href="#ic-plus"/></svg>
              <svg viewBox="0 0 24 24"><use href="#ic-image"/></svg>
              Add Image to Content
            </button>

            <span className="bp-hint" id="editHint">
              <svg viewBox="0 0 24 24" width="11" height="11"><use href="#ic-pencil"/></svg>
              Click any field to edit its content.
            </span>
          </div>

          <div className="bp-footer" >
            <span className="bp-copyright">
              <svg viewBox="0 0 24 24"><use href="#ic-copyright"/></svg>
              Ale Bosma Ventures Corporation
            </span>
            <div className="bp-actions">
              
              <button className="bp-btn bp-btn-save" id="saveBtn" style={{ display:  sessionStorage.getItem("user") ? 'flex' : 'none' }}>
                <svg viewBox="0 0 24 24"><use href="#ic-save"/></svg>Save
              </button>
              <button className="bp-btn bp-btn-delete" onClick={()=>{deleteAction()}} style={{ display:  sessionStorage.getItem("user") ? 'flex' : 'none' }}>
                <svg viewBox="0 0 24 24"><use href="#ic-trash"/></svg>Delete
              </button>
              <button className="bp-btn bp-btn-close" onClick={()=>closeOpenAction()} >
                <svg viewBox="0 0 24 24"><use href="#ic-close"/></svg>Close
              </button>
            </div>
          </div>
        </div>

        <div className="bp-confirm" id="confirmOverlay" style={{ display: deletingOverlay ? 'flex' : 'none' }} >
          <div className="bp-confirm-box">
            <div className="bp-confirm-icon">
              <svg viewBox="0 0 24 24"><use href="#ic-warn"/></svg>
            </div>
            <h3>Delete this post?</h3>
            <p>This action cannot be undone. The post will be permanently removed.</p>
            <div className="bp-confirm-btns">
              <button className="bp-btn bp-btn-delete" onClick={()=>{deleteConfirmed()}}>
                <svg viewBox="0 0 24 24"><use href="#ic-trash"/></svg>Delete
              </button>
              <button className="bp-btn bp-btn-close" onClick={()=>{changeDeleting(!deletingOverlay)}} >
                <svg viewBox="0 0 24 24"><use href="#ic-close"/></svg>Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <input type="file" id="coverFileInput"   accept="image/*" ></input>
    <input type="file" id="titleFileInput"   accept="image/*" ></input>
    <input type="file" id="contentFileInput" accept="image/*" ></input>

        
        </>);
  }else{
     return(<>
     
    <div className="bp-overlay">
      <div className="bp-wrap">
        <div className="bp-modal" id="bpModal">
          <div className="bp-header" >
            <div className="bp-header-left">
              <div className="bp-logo-box">
                <svg viewBox="0 0 24 24" fill="none"><use href="#ic-blog" stroke="white"/></svg>
              </div>
              <span className="bp-title-label">
                <svg viewBox="0 0 24 24"><use href="#ic-blog"/></svg>
                Create Post
              </span>
            </div>
            
          </div>

          <div className="bp-body">

                  <div className="bp-cover-wrap" id="coverWrap">
              <div className="bp-cover-placeholder" id="coverPlaceholder">
                <svg viewBox="0 0 24 24" fill="none"><use href="#ic-image"/></svg>
                <span>Add Cover Image</span>
              </div>
               <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      

      

              <img className="bp-cover-img" id="coverImg" src="" alt="cover"></img>
              
            </div>

            <div className="bp-meta">

           

                    <select id="employees" name="employees" className="bp-tag">
                      <option value="">-- SELECT POST CATEGORY --</option>
                      <option value="EVENT">EVENT</option>
                      <option value="ACHIEVEMENT">ACHIEVEMENT</option>
                      <option value="ANOUNCEMENT">ANOUNCEMENT</option>
                    </select>
         

          </div>
             <div className="bp-meta">
                 <span className="bp-author-role">TITLE:</span>
             </div>
            
            <textarea className="bp-post-title-edit" id="postTitle" value={title} onChange={(e) => getTitle(e.target.value)}></textarea>
            <div className="bp-meta">
                  <span className="bp-author-role">CONTENT</span>
            </div>
             
           <textarea className="bp-content-edit" value={blogContent} onChange={(e) => getBlogContent(e.target.value)}></textarea>

            

          

          </div>



          <div className="bp-footer" >
            <span className="bp-copyright">
              <svg viewBox="0 0 24 24"><use href="#ic-copyright"/></svg>
              Ale Bosma Ventures Corporation
            </span>
                <div className="bp-actions">
                  <button className="bp-btn bp-btn-edit" onClick={()=>createBlog()} id="editBtn" style={{ display:  sessionStorage.getItem("user") ? 'flex' : 'none' }}>
                    PUBLISH POST
                  </button>
                  <button className="bp-btn bp-btn-close" onClick={()=>closeOpenAction()} >
                    <svg viewBox="0 0 24 24"><use href="#ic-close"/></svg>Close
                  </button>
                </div>
            </div>
          
    
        </div>
      </div>
      </div>
     
     
     
     
     
     
     
     </>)
  }
}


export default BlogViewer