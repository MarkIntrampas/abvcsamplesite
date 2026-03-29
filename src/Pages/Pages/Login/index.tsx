
import './style/loginstyle.css';
import logo from "./media/sec1logo.png";

interface LoginProps{
  closeOpenAction: ()=> void;
};

const Login: React.FC<LoginProps> =({closeOpenAction})=>{
 return(
    <>
                <div id="LoginPane" >

  <div  id="loginContainer" className="FormContainer">
     <div id="FormHeader">
        <h1 id="FormHeaderText">LOGIN</h1>
        <img src={logo} alt="logo" id="loginLogo"></img>

     </div>
     
     <div id="LoginFormContainer" className="formContainerBody">

         <div className="loginInputContainer">
           <h1 className="loginLabel">Username:</h1>
           <input className="loginInput" id="loginUsername"></input>
         </div>

         <div className="loginInputContainer">
           <h1 className="loginLabel">Password:</h1>
           <input type="password" className="loginInput" id="loginPassword"></input>
         </div>

         <div className="loginInputContainer">
        
           <div className="formOptionsContainer">
              <div className="showPasswordCotainer">
                <h1 className="showPasswordText">Show Password</h1>
                <input type="checkbox" className="showPasswordCheckbox"></input>
        

              </div>

              <h1 id="LoginRegister"  >Register</h1>

           </div>
           <button type="button" className="loginInput" id="LoginButton" >LOGIN</button>
         </div>

     </div>


     <div id="FormFooter">
        <h1 id="FormFooterText">© Ale Bosma Ventures Corporation</h1>
        <button id="FormHeaderButton"onClick={closeOpenAction} >CLOSE</button>

     </div>

     
    
  </div>




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
           <input type="password" className="loginInput" id="registerPassword"></input>
         </div>

         <div className="loginInputContainer">
           <h1 className="loginLabel">CONFIRM PASSWORD:</h1>
           <input type="password" className="loginInput" id="registerConfirmPaasword"></input>
         </div>

         <div className="loginInputContainer">
          
           <div className="formOptionsContainer">
              <div className="showPasswordCotainer">
                <h1 className="showPasswordText">Show Password</h1>
                <input type="checkbox" className="showPasswordCheckbox"></input>
        

              </div>

              <h1 id="LoginRegister"  >LOGIN</h1>

           </div>
           <button type="button" className="loginInput" id="LoginButton">REGISTER</button>
           
         </div>

     </div>


     <div id="FormFooter">
        <h1 id="FormFooterText">© Ale Bosma Ventures Corporation</h1>
        <button id="FormHeaderButton" onClick={closeOpenAction}>CLOSE</button>

     </div>

     
    
    </div>

    </div>
    </>
 )
};


export default Login;