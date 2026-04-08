
import './style/loginstyle.css';
import logo from "./media/sec1logo.png";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

interface LoginProps{
  closeOpenAction: ()=> void;
};

const Login: React.FC<LoginProps> =({closeOpenAction})=>{

  const [loginshowpasswordstatus, ShowHideLoginPass] = useState(false);
  const [regshowpasswordstatus, ShowHideregPass] = useState(false);
  const [shownForm, changeForm] = useState("Login");
  const [LoginPassword, getLoginPassword] = useState("");
  const [LoginUser, getLoginUser] = useState("");

  const navigate = useNavigate();



  const login = async () => {
 const supabase = createClient("https://ccgrfcxtlzqurypyfcrs.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjZ3JmY3h0bHpxdXJ5cHlmY3JzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2MjgyMjUsImV4cCI6MjA5MTIwNDIyNX0.eEbdj3zFUjrYWRXTqj9rx0P6grHTt-Mw_D3SiKvhfUw");
  // Query your custom table for matching username and password
  const { data, error } = await supabase
    .from('users') // or 'users', whatever your table name is
    .select('*')
    .eq('username',LoginUser)      // case-sensitive if you used quotes in table
    .eq('password',LoginPassword)  // plain text, not recommended
    .single(); // get a single row
   

  if (error || !data) {
   
    alert('Wrong Username or Password');
    return;
  }

  // User found, login successful
  const userData = {
    username: data.Username,
    isLoggedIn: true,
  };

  sessionStorage.setItem("user", JSON.stringify(userData));
  navigate("/dashboard");
};

 

      return(
          <>
      <div id="LoginPane" >
       {shownForm==="Login" && (
        <div  id="loginContainer" className="FormContainer">
          <div id="FormHeader">
              <h1 id="FormHeaderText">LOGIN</h1>
              <img src={logo} alt="logo" id="loginLogo"></img>

          </div>
          
          <div id="LoginFormContainer" className="formContainerBody">

              <div className="loginInputContainer">
                <h1 className="loginLabel">Username:</h1>
                <input className="loginInput" id="loginUsername" onChange={(e)=>getLoginUser(e.target.value)}></input>
              </div>

              <div className="loginInputContainer">
                <h1 className="loginLabel">Password:</h1>
                <input type={loginshowpasswordstatus ? "text":"password"} className="loginInput" id="loginPassword" onChange={(e)=>getLoginPassword(e.target.value)}></input>
              </div>

              <div className="loginInputContainer">
              
                <div className="formOptionsContainer">
                    <div className="showPasswordCotainer">
                      <h1 className="showPasswordText">Show Password</h1>
                      <input type="checkbox" className="showPasswordCheckbox" onChange={()=>{ShowHideLoginPass(!loginshowpasswordstatus)}}></input>
              

                    </div>

                    <h1 id="LoginRegister" onClick={()=>changeForm("Register")}  >Register</h1>

                </div>
                <button type="button" className="loginInput" id="LoginButton" onClick={()=>login()}>LOGIN</button>
              </div>

          </div>


          <div id="FormFooter">
              <h1 id="FormFooterText">© Ale Bosma Ventures Corporation</h1>
              <button id="FormHeaderButton"onClick={closeOpenAction} >CLOSE</button>

          </div>

          
          
        </div>
       )}
      

         




         {shownForm==="Register" && ( 
        <div  id="registerFormContainer" className="FormContainer">
          <div id="FormHeader">
              <h1 id="FormHeaderText">REGISTER</h1>
              <img src={logo} alt="logo" id="loginLogo"></img>

          </div>
          
          <div  className="formContainerBody">

          <div className="loginInputContainer">
                <h1 className="loginLabel">FIRSTNAME:</h1>
                <input className="loginInput" id="registerFirstname"></input>
              </div>

              <div className="loginInputContainer">
                <h1 className="loginLabel">MIDDLE NAME:</h1>
                <input className="loginInput" id="registerMiddlename"></input>
              </div>

              <div className="loginInputContainer">
                <h1 className="loginLabel">LAST NAME:</h1>
                <input className="loginInput" id="registerLastname"></input>
              </div>

              <div className="loginInputContainer">
                <h1 className="loginLabel">USERNAME:</h1>
                <input className="loginInput" id="registerUsername"></input>
              </div>

              <div className="loginInputContainer">
                <h1 className="loginLabel">PASSWORD:</h1>
                <input type={regshowpasswordstatus ? "text":"password"} className="loginInput" id="registerPassword"></input>
              </div>

              <div className="loginInputContainer">
                <h1 className="loginLabel">CONFIRM PASSWORD:</h1>
                <input type={regshowpasswordstatus ? "text":"password"} className="loginInput" id="registerConfirmPaasword"></input>
              </div>

              <div className="loginInputContainer">
                
                <div className="formOptionsContainer">
                    <div className="showPasswordCotainer">
                      <h1 className="showPasswordText">Show Password</h1>
                      <input type="checkbox" className="showPasswordCheckbox" onChange={()=>ShowHideregPass(!regshowpasswordstatus)}></input>
              

                    </div>

                    <h1 id="LoginRegister" onClick={()=>changeForm("Login")} >LOGIN</h1>

                </div>
                <button type="button" className="loginInput" id="LoginButton">REGISTER</button>
                
              </div>

          </div>


          <div id="FormFooter">
              <h1 id="FormFooterText">© Ale Bosma Ventures Corporation</h1>
              <button id="FormHeaderButton" onClick={closeOpenAction}>CLOSE</button>

          </div>

          
          
          </div>
         )}
          </div>
          </>
      )
};


export default Login;