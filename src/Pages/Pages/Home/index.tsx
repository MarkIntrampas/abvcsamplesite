
import './style/home.css'
import './style/home-small.css'
import Nav from '../../Component/Nav'
import logo from './media/sec1logo.png'
import pic1 from './media/sec3pic1.png'
import pic2 from './media/sec3pic2.png'



function Home(){
  
    return(
 <>
    
    <Nav />
    <div id="container">
      <div id="sec1">
        <div id="logoCon">
          <img  id ="sec1logo" src={logo}></img>
        </div>
        
         <div id="sec1sub">
            <h1 id="companyName"> ALE BOSMA VENTURES CORPORATION</h1>
           {/*} <h1 id="qoute">Empowering Your Business with Precision and Proficiency</h1>{*/}

         </div>

      </div>

      <div id="sec2">
          <div className="sec2sub">
            <h1 className="mv">OUR MISSION</h1>
            <p className="mvcontext">
            To provide a quality workforce to our clients through the collaborative efforts of our competent employees. 
            The company presents quality and availability for assistance to businesses, and we strive for our valued 
            clients satisfaction with our
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
  {
      <div id="sec3">
      <h1 id="sub3title">OUR SERVICES</h1>
        <div className="sec3sub">
          <div className="sec3subcon">
            <h1 className="pictitle">DATA ENTRY</h1>
            <img className="sec3pic" src={pic1}></img>

          </div>

          <div className="sec3subcon">
          <h1 className="pictitle">BOOK KEEPING</h1>
            <img className="sec3pic" src={pic2}></img>

          </div>
        </div>
      </div>

      }
      
   </div>
 </>



    );
}


export default Home;