
import './style/home.css'
import './style/home-small.css'
import './style/home2.css'
import './style/home-small2.css'
import Nav from '../../Component/Nav'
import logo from './media/sec1logo.png'
import pic1 from './media/sec3pic1.png'
import pic2 from './media/sec3pic2.png'
import Footer from '../../Component/Footer'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'




function Home(){
  

  const navigate= useNavigate();
  useEffect(()=>{
    const storedUser = sessionStorage.getItem("user");

  if (storedUser) {
    navigate("/dashboard");
    return;
  }

  },[]);

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
           <a className="hero-cta" href="#sec2">Discover More →</a>
         </div>

      </div>


       {/* ── SECTION 2: MISSION / VISION ── */}
        <div id="sec2">
          <div className="sec2-header">
            <div className="section-label">Who We Are</div>
            <h2 className="section-title-dark">OUR CORE VALUES</h2>
          </div>
          <div className="mv-grid">
            <div className="sec2sub">
              <div className="mv-number">01</div>
              <h3 className="mv">Our Mission</h3>
              <p className="mvcontext">
                To provide a quality workforce to our clients through the collaborative
                efforts of our competent employees. The company presents quality and
                availability for assistance to businesses, and we strive for our valued
                clients' satisfaction with our operations and commit ourselves to
                providing outstanding customer service.
              </p>
            </div>
            <div className="mv-divider"></div>
            <div className="sec2sub">
              <div className="mv-number">02</div>
              <h3 className="mv">Our Vision</h3>
              <p className="mvcontext">
                To build outstanding teams with aspirations to achieve its goals,
                employee fulfillment at work, and client satisfaction. By taking this
                action, we assist our European clients who are currently facing
                challenges in locating skilled employees. The company is committed to
                hiring skilled individuals and providing competent employees to its
                rapidly expanding workforce.
              </p>
            </div>
          </div>
        </div>

        {/* ── STATS STRIP ── */}
        <div id="sec-stats">
          <div className="stat-item">
            <div className="stat-num">10+</div>
            <div className="stat-label">Years of Service</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">200+</div>
            <div className="stat-label">Clients Served</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">50+</div>
            <div className="stat-label">Skilled Employees</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">EU</div>
            <div className="stat-label">Global Reach</div>
          </div>
        </div>

        {/* ── SECTION 3: SERVICES ── */}
        <div id="sec3">
          <div className="sec3-bg-accent"></div>
          <div className="sec3-header">
            <div className="section-label">What We Do</div>
            <h2 id="sub3title">OUR SERVICES</h2>
          </div>
          <div className="services-grid">
            <div className="sec3subcon">
              <img className="sec3pic" src={pic1} alt="Data Entry" />
              <div className="service-overlay"></div>
              <div className="pictitle">
                <div className="service-num">01 ─────</div>
                <div className="service-name">DATA ENTRY</div>
                <div className="service-desc">
                  Accurate, fast, and reliable data management solutions for your business needs.
                </div>
              </div>
            </div>
            <div className="sec3subcon">
              <img className="sec3pic" src={pic2} alt="Book Keeping" />
              <div className="service-overlay"></div>
              <div className="pictitle">
                <div className="service-num">02 ─────</div>
                <div className="service-name">BOOK KEEPING</div>
                <div className="service-desc">
                  Professional financial record management to keep your accounts in perfect order.
                </div>
                
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 4: WHY CHOOSE US ── */}
        <div id="sec4">
          <div className="sec4-header">
            <div className="section-label">Why Work With Us</div>
            <h2 className="section-title-light">BUILT ON EXCELLENCE</h2>
          </div>
          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon">◈</div>
              <div className="why-title">Quality Workforce</div>
              <p className="why-text">
                We recruit and train only the most competent professionals to ensure
                top-tier service delivery for every client.
              </p>
            </div>
            <div className="why-card">
              <div className="why-icon">◉</div>
              <div className="why-title">Client-Focused</div>
              <p className="why-text">
                Your satisfaction drives every decision we make. We customize our
                services to meet your unique business requirements.
              </p>
            </div>
            <div className="why-card">
              <div className="why-icon">◆</div>
              <div className="why-title">European Reach</div>
              <p className="why-text">
                Bridging the gap for European businesses seeking skilled remote talent —
                reliable, vetted, and ready to perform.
              </p>
            </div>
          </div>
        </div>

       
      
   </div>
   <Footer />
 </>



    );
}


export default Home;