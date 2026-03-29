
import navlogo from "./Nav media/LOGO2.png"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { useEffect, useState } from 'react'
import Loader from '../Loader'
import Login from '../../Pages/Login'
import './Nav.css'

function Nav(){
    const [status, setLoadStatus] = useState(true);
    const [loginPanStatus, setLoginPanStatus] = useState(false);

    useEffect(() => {
         const timer = setTimeout(() => {
                         setLoadStatus(false)}, 1000);
       console.log(status);
      return () => clearTimeout(timer); // cleanup

        
  }, []);

  const loginBtn = ()=>{
    setLoginPanStatus(!loginPanStatus);
  };

 return(
 <>
 
 <Loader />
 {loginPanStatus ? <Login closeOpenAction={loginBtn} /> : <></>}
 <div id="cont">
        {/* Bootstrap Navbar */}
        <nav className="navbar navbar-expand-md navbar-light nav">
          <a className="navbar-brand brand"  href="#"><img id="logo"src={navlogo}></img></a>
          <button
            className="navbar-toggler btn-clck"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon btn-clck"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav mx-auto">
              <a className="nav-item nav-link links"  href="/">HOME <span className="sr-only"></span></a>
              <a className="nav-item nav-link links" href="/about">ABOUT US</a>
              <a className="nav-item nav-link links"  href="/blogs">BLOGS</a>
              <a className="nav-item nav-link links"  href="contact">CONTACTS</a>
              <a className="nav-item nav-link links"  onClick={loginBtn}>LOGIN</a>
            </div>
          </div>
        </nav>
      </div>
      </>
 );
}


export default Nav;