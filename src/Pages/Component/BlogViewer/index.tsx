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
};



const BlogViewer: React.FC<BlogProps> = ({ closeOpenAction, selectedBlogid }) =>{
  const BlogBack = new BlogCrud();

  

  const [BlogInfo, updateBlogInfo] = useState<Blog | null>(null);

  useEffect(() => {
    const loadBlogInfo = async () => {
      const blog = await BlogBack.ViewBlogById(Number(selectedBlogid));
      updateBlogInfo(blog); // ✅ store object directly
    };

    loadBlogInfo();
  }, [selectedBlogid]);






const  removeCover = ()=>{
 /* 
    const img = document.getElementById('coverImg');
    img.style.display = 'none'; img.src = '';
    document.getElementById('coverWrap').classList.remove('has-image');
    document.getElementById('coverRemove').style.display = 'none';
    if (isEditing) document.getElementById('coverPlaceholder').style.display = 'flex';
    document.getElementById('coverFileInput').value = '';

    */
  };


 const removeTitleImg =()=>{
  /*
    document.getElementById('titleImgThumb').src = '';
    document.getElementById('titleImgName').textContent = '';
    document.getElementById('titleImgWrap').classList.remove('visible');
    document.getElementById('titleFileInput').value = '';
    */
  }

    return(<>

           


<div className="bp-overlay">
  <div className="bp-wrap">
    <div className="bp-modal" id="bpModal">

      <div className="bp-header">
        <div className="bp-header-left">
          <div className="bp-logo-box">
            <svg viewBox="0 0 24 24" fill="none"><use href="#ic-blog" stroke="white"/></svg>
          </div>
          <span className="bp-title-label">
            <svg viewBox="0 0 24 24"><use href="#ic-blog"/></svg>
            Blog Post
          </span>
        </div>
        <span className="bp-status viewing" id="statusBadge">
          <svg viewBox="0 0 24 24"><use href="#ic-eye"/></svg>
          Viewing
        </span>
      </div>

      <div className="bp-body">
        <div className="bp-cover-wrap" id="coverWrap">
          <div className="bp-cover-placeholder" id="coverPlaceholder">
            <svg viewBox="0 0 24 24" fill="none"><use href="#ic-image"/></svg>
            <span>Add Cover Image</span>
          </div>
          <img className="bp-cover-img" id="coverImg" src="" alt="cover"></img>
          <button className="bp-cover-remove" id="coverRemove" onClick={()=>removeCover()}>
            <svg viewBox="0 0 24 24" width="11" height="11"><use href="#ic-close" stroke="white"/></svg>
          </button>
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
{*/}
        <textarea className="bp-content" id="postContent"  value={BlogInfo?.content || ""}>
         
         </textarea>
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

      <div className="bp-footer">
        <span className="bp-copyright">
          <svg viewBox="0 0 24 24"><use href="#ic-copyright"/></svg>
          Ale Bosma Ventures Corporation
        </span>
        <div className="bp-actions">
          <button className="bp-btn bp-btn-edit" id="editBtn">
            <svg viewBox="0 0 24 24"><use href="#ic-pencil"/></svg>Edit
          </button>
          <button className="bp-btn bp-btn-save" id="saveBtn">
            <svg viewBox="0 0 24 24"><use href="#ic-save"/></svg>Save
          </button>
          <button className="bp-btn bp-btn-delete" >
            <svg viewBox="0 0 24 24"><use href="#ic-trash"/></svg>Delete
          </button>
          <button className="bp-btn bp-btn-close" onClick={()=>closeOpenAction()}>
            <svg viewBox="0 0 24 24"><use href="#ic-close"/></svg>Close
          </button>
        </div>
      </div>
    </div>

    <div className="bp-confirm" id="confirmOverlay">
      <div className="bp-confirm-box">
        <div className="bp-confirm-icon">
          <svg viewBox="0 0 24 24"><use href="#ic-warn"/></svg>
        </div>
        <h3>Delete this post?</h3>
        <p>This action cannot be undone. The post will be permanently removed.</p>
        <div className="bp-confirm-btns">
          <button className="bp-btn bp-btn-delete">
            <svg viewBox="0 0 24 24"><use href="#ic-trash"/></svg>Delete
          </button>
          <button className="bp-btn bp-btn-close" >
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
}


export default BlogViewer