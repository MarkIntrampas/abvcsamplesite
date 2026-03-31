import './style/Aboutstyle.css';
import './style/Aboutstyle-small.css';
import sample from './media/abtsec1.jpg';
import Nav from '../../Component/Nav';
import Footer from '../../Component/Footer';
import { useState} from 'react';



const About:React.FC =()=>{
    const [activeIndex, setActiveIndex] = useState(1);
    const [height, setHeight] = useState("0%");
   
    const a = (index: number): void => {
  setActiveIndex(index);
   const h = ((index - 1) / (5 - 1)) * 100; 
    setHeight(String(h+"%"));
};

  
    
    
    return(
  <>
    <Nav />
  
    <div id="AbtCon">
        <div id="AboutSec1">
            <h1 id="AbtSec1Title">ABOUT US</h1>
         </div>

        <div id="sec2">
        <div className="sec2sub">
            <h1 className="mv">OUR MISSION</h1>
            <p className="mvcontext">
            To provide a quality workforce to our clients through the collaborative efforts of our competent employees. 
            The company presents quality and availability for assistance to businesses, and we strive for our valued 
            clients’ satisfaction with our
            operations and commit ourselves to providing outstanding customer service.
            </p>

        </div>
        

<div className="sec2sub">
  <h1 className="mv">OUR VISION</h1>
  <p className="mvcontext">
  To build outstanding teams with aspirations to achieve its goals, employee
   fulfillment at work, and client satisfaction. By taking this action, we
    assist our European clients who are currently facing challenges in locating skilled employees. 
    The company is committed to hiring skilled individuals
   and providing competent employees to its rapidly expanding workforce.
  </p>
        </div>
        </div>

    <div id="AboutSec3">
     <h1 id="AbtSec1Title">MAJOR MILESTONES</h1>


                <div className="timeline">

                    <div id="barContainer">
                        
                        <div id="bar" style={{ height: height }}> 
                            
                        <div id="buttons">
                    <button id="btn1" className={`Timelinebutton ${activeIndex === 1 ? 'TimelinebuttonActive':''}`}  onClick={()=>a(1)}>B<span className="arrow" style={activeIndex === 1 ? {marginLeft:'53px',paddingLeft:'10px',opacity:1 }:{marginLeft:'0px',paddingLeft:'0px',opacity:0}}id="span1">⇒</span></button>
                <button id="btn2" className={`Timelinebutton ${activeIndex === 2 ? 'TimelinebuttonActive':''}`} onClick={()=>{a(2)}}>B<span className="arrow" style={activeIndex === 2 ? {marginLeft:'53px',paddingLeft:'10px',opacity:1 }:{marginLeft:'0px',paddingLeft:'0px',opacity:0}} id="span2">⇒</span></button>
                <button id="btn3" className={`Timelinebutton ${activeIndex === 3 ? 'TimelinebuttonActive':''}`} onClick={()=>{a(3)}}>B<span className="arrow"  style={activeIndex === 3 ? {marginLeft:'53px',paddingLeft:'10px',opacity:1 }:{marginLeft:'0px',paddingLeft:'0px',opacity:0}} id="span3">⇒</span></button>
                <button id="btn4" className={`Timelinebutton ${activeIndex === 4 ? 'TimelinebuttonActive':''}`} onClick={()=>{a(4)}}>B<span className="arrow"  style={activeIndex === 4 ? {marginLeft:'53px',paddingLeft:'10px',opacity:1 }:{marginLeft:'0px',paddingLeft:'0px',opacity:0}}  id="span4">⇒</span></button>
                <button id="btn5" className={`Timelinebutton ${activeIndex === 5 ? 'TimelinebuttonActive':''}`}  onClick={()=>{a(5)}}>B<span className="arrow"  style={activeIndex === 5 ? {marginLeft:'53px',paddingLeft:'10px',opacity:1 }:{marginLeft:'0px',paddingLeft:'0px',opacity:0}} id="span5">⇒</span></button>      
                        </div>
                       
                        </div>
                                
                    </div>
                    
                <div id="detailsContainter">
                    
                <div className={`detail ${activeIndex === 1 ? 'active' : ''}`} id="d1">
                
                <div className="sub sub2">  
                    <img decoding="async" className="Timelineimg" src={sample}></img>
                </div>
                
                    <div className="sub sub1">
                        <h1 className="storyTitle">From Idea to Reality</h1>  

                
                    <p className="story">
                    
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                    </p>
                        
                    </div> 
                
                
                </div>


                <div className={`detail ${activeIndex === 2 ? 'active' : ''}`} id="d2">
                    
                    <div className="sub sub1">
                        <h1 className="storyTitle">Scaling and Struggle</h1>  
                        
                        <p className="story">
                    
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                    </p>
                        
                    </div> 
                
                <div className="sub sub2">  
                    <img decoding="async" className="Timelineimg" src={sample}></img>
                </div>
                    
                </div>



                <div className={`detail ${activeIndex === 3 ? 'active' : ''}`} id="d3">   
                    
                
                <div className="sub sub2">  
                    <img decoding="async"  className="Timelineimg" src={sample}></img>
                </div>
                
                <div className="sub sub1">
                        <h1 className="storyTitle">Partnerships and Progress</h1>  
                        <p className="story">
                    
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                    </p>
                        
                    </div> 
                    
                </div>




                <div className={`detail ${activeIndex === 4 ? 'active' : ''}`} id="d4">
                    
                    
                    <div className="sub sub1">
                    <h1 className="storyTitle">Reflections and Future</h1> 
                        <p className="story">
                    
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                    </p>
                        
                    </div> 
                
                <div className="sub sub2">  
                    <img decoding="async" className="Timelineimg" src={sample}></img>
                </div>
                    
                </div>




                <div className={`detail ${activeIndex === 5 ? 'active' : ''}`} id="d5">
                    
                
                <div className="sub sub2">  
                    <img decoding="async"  className="Timelineimg" src={sample}></img>
                </div>
                
                
                    <div className="sub sub1">
                        <h1 className="storyTitle">PRESENT</h1>
                        <p className="story">
                    
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                    </p>
                        
                    </div> 
            </div>
        </div>
    </div>
 </div>

 {/*}
 <div id="AboutSec4">
  <div id="Teambody"> 
   <div id="org-chart">
    <div className="org-container">
    
      <div className="org-node">
          <img decoding="async" src="http://localhost/p/wp-content/uploads/2023/11/Ale-new.png" className="org-image"></img>
        <span className="name">CEO</span>
        <span>Chief Executive Officer</span>
      </div>
     
      <div className="department">
        <div className="sub-department org-node">
           <img decoding="async" src="" className="org-image"></img>
           <span className="name">CEO</span>
          <span>Management</span>
        </div>
      </div>
       <div className="department">
          <div className="sub-department org-node">
          <img decoding="async" src="" className="org-image"></img>
           <span className="name">CEO</span>
          <span>Human Resources</span>
        </div>
         <div className="sub-department org-node">
          <img decoding="async" src="" className="org-image"></img>
           <span className="name">CEO</span>
          <span>Human Resources</span>
        </div>
        <div className="sub-department org-node">
          <img decoding="async" src="" className="org-image"></img>
           <span className="name">CEO</span>
          <span>Public Relations</span>
        </div>
       </div>
        
     
      <div className="department">
        <div className="sub-department org-node">
          Department 1
          <span>10 People</span>
          
          <div className="org-node">Employee 1</div>
          <div className="org-node">Employee 2</div>
          <div className="org-node">Employee 3</div>
          <div className="org-node">Employee 4</div>
          <div className="org-node">Employee 5</div>
          <div className="org-node">Employee 6</div>
          <div className="org-node">Employee 7</div>
          <div className="org-node">Employee 8</div>
          <div className="org-node">Employee 9</div>
          <div className="org-node">Employee 10</div>
        </div>
        <div className="sub-department org-node">
          Department 2
          <span>10 People</span>
          
          <div className="org-node">Employee 1</div>
          <div className="org-node">Employee 2</div>
          <div className="org-node">Employee 3</div>
          <div className="org-node">Employee 4</div>
          <div className="org-node">Employee 5</div>
          <div className="org-node">Employee 6</div>
          <div className="org-node">Employee 7</div>
          <div className="org-node">Employee 8</div>
          <div className="org-node">Employee 9</div>
          <div className="org-node">Employee 10</div>
        </div>
        <div className="sub-department org-node">
          Department 3
          <span>10 People</span>
         
          <div className="org-node">Employee 1</div>
          <div className="org-node">Employee 2</div>
          <div className="org-node">Employee 3</div>
          <div className="org-node">Employee 4</div>
          <div className="org-node">Employee 5</div>
          <div className="org-node">Employee 6</div>
          <div className="org-node">Employee 7</div>
          <div className="org-node">Employee 8</div>
          <div className="org-node">Employee 9</div>
          <div className="org-node">Employee 10</div>
        </div>
        <div className="sub-department org-node">
          Department 4
          <span>10 People</span>
       
          <div className="org-node">Employee 1</div>
          <div className="org-node">Employee 2</div>
          <div className="org-node">Employee 3</div>
          <div className="org-node">Employee 4</div>
          <div className="org-node">Employee 5</div>
          <div className="org-node">Employee 6</div>
          <div className="org-node">Employee 7</div>
          <div className="org-node">Employee 8</div>
          <div className="org-node">Employee 9</div>
          <div className="org-node">Employee 10</div>
        </div>
        <div className="sub-department org-node">
          Department 5
          <span>10 People</span>
         
          <div className="org-node">Employee 1</div>
          <div className="org-node">Employee 2</div>
          <div className="org-node">Employee 3</div>
          <div className="org-node">Employee 4</div>
          <div className="org-node">Employee 5</div>
          <div className="org-node">Employee 6</div>
          <div className="org-node">Employee 7</div>
          <div className="org-node">Employee 8</div>
          <div className="org-node">Employee 9</div>
          <div className="org-node">Employee 10</div>
        </div>
      </div>
    </div>
  </div>
  </div>
 
</div>

{*/}

  
</div>  

    <Footer />
</>

    );
}


export default About;