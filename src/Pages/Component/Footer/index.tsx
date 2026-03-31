import React from "react";
import './Footer.css';
import './Footer-smaller.css';
import FooterLogo from './footerLogo.png';


const Footer:React.FC =()=>{

    return(
        <>
            <div id="Footercontainer">
                <div className="footerCol">
                    <img src={FooterLogo} id="FooterLogo"></img>
                    <div id="Col1Sub">
                    <h1 id="ColSubText">CONTACT US</h1>
                    <ul>
                        <li>LinkendIn</li>
                        <li>ale@alebosmaventurescorp.com</li>
                        <li>Facebook</li>
                    </ul>

                    </div>
                </div>
                <div className="footerCol">
                    
                </div>
                <div className="footerCol">
                <h1 id="copy">© Ale Bosma Ventures Corporation</h1>
                </div>


            </div>
        
        </>
    );

}


export default Footer;