import Nav from '../../Component/Nav'
import Footer from '../../Component/Footer';
import './style/ContactStyle.css';
import './style/ContactStyle-smalll.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ContacBack from '../../Back/ContactCrud';



function Contact(){


      const navigate= useNavigate();
      const [nameSender, setNameSender] = useState<string>("");
      const [email, setEmail] = useState<string>("");
       const [message, setMessage] = useState<string>("");

        useEffect(()=>{
            const storedUser = sessionStorage.getItem("user");

        if (storedUser) {
            navigate("/dashboard");
            return;
        }

  },[]);
            const submitMessage = async (): Promise<void> => {

                // Check empty values
                if (!nameSender?.trim()) {
                    alert("Please enter your name");
                    return;
                }

                if (!email?.trim()) {
                    alert("Please enter your email");
                    return;
                }

                if (!message?.trim()) {
                    alert("Please enter your message");
                    return;
                }

                // Validate email format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailRegex.test(email)) {
                    alert("Please enter a valid email");
                    return;
                }

                try {
                    const contact = new ContacBack();

                    await contact.CreateMessage(
                        nameSender,
                        email,
                        message
                    );

                    // Clear inputs
                    setNameSender("");
                    setEmail("");
                    setMessage("");

                    alert("Message sent successfully!");

                } catch (error) {
                    console.error(error);
                    alert("Failed to send message");
                }
            };

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
                    <input className="contactInput" type="text" value={nameSender}  onChange={(e) => setNameSender(e.target.value)} />
                </div>

                <div className="inputContainer">
                    <h1 className="formLabels" >Email:</h1>
                                        <input
                        className="contactInput"
                        type="text"
                        name="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                               
                </div>

                <div className="inputContainer">
                    <h1 className="formLabels">Message:</h1>
                    <textarea className="contactInput" id="ContactTextBox"  placeholder="Message" value={message}  onChange={(e) => setMessage(e.target.value)}  ></textarea>
                </div>

                <div className="inputContainer">
                    
                    <input className="contactInput" id="ContactSubmitButton" type="button" value="SUBMIT" onClick={()=>submitMessage()}></input>
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
         <Footer/>
     </>
    );
}


export default Contact;