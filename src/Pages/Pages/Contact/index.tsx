
import './style/ContactStyle.css';
import './style/ContactStyle-smalll.css';
import Nav from '../../Component/Nav'

function Contact(){
    return(
        <>
        <Nav />
        <div id="ContactCon">
         <div id="ContactSec1">
                <h1 id="AbtSec1Title">CONTACT US</h1>
         </div>

          <div id="ContactSec2">
           <div className="ContactSec2Sub">
            <h1 className="ContactSubText">SHARE YOUR THOUGHTS.</h1>
             <div id="contactForm">]
                <div className="inputContainer">
                    <h1 className="formLabels">Name:</h1>
                    <input className="contactInput" type="text"></input>
                </div>

                <div className="inputContainer">
                    <h1 className="formLabels" for="Email">Email:</h1>
                    <input className="contactInput" type="text" name="Email"></input>
                </div>

                <div className="inputContainer">
                    <h1 className="formLabels">Message:</h1>
                    <textarea className="contactInput" id="ContactTextBox"type="text-area" rows="4" cols="50" placeholder="Message" ></textarea>
                </div>

                <div className="inputContainer">
                    
                    <input className="contactInput" id="ContactSubmitButton" type="button" value="SUBMIT"></input>
                </div>


                 
                   
             </div>
           </div>
           
            <div className="ContactSec2Sub">
            <h1 className="ContactSubText">Contact</h1>
                <div id="Contactlink">
                    <h1 className="ContactSubText ContactLinkItem">LinkedIn</h1>
                    <h1 className="ContactSubText ContactLinkItem">ale@alebosmaventurescorp.com</h1>
                    <h1 className="ContactSubText ContactLinkItem">Facebook</h1>
                </div>
            
            <h1 className="ContactSubText">Visit Us</h1>
                <iframe id='map' loading="lazy"
					src="https://maps.google.com/maps?q=ALE%20BOSMA&#038;t=m&#038;z=10&#038;output=embed&#038;iwloc=near"
					title="ALE BOSMA"
					aria-label="ALE BOSMA"
			        ></iframe>
            </div>

       
         </div>
         </div>
     </>
    );
}


export default Contact;