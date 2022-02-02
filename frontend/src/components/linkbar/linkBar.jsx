import React from "react";
import { Link } from 'react-router-dom'

class LinkBar extends React.Component {

    render() {
        return (
            <div id="linkBar">
                <div className="personalLinks">
                    <div className="tintype-container">
                        <img src="images/alex_d.jpg" alt="" />
                        <h6>A.D.</h6>
                    </div>
                    <div className="links">
                        {/* <div className="linkName">
                            Alex Dziuba
                        </div> */}
                        <a href='https://github.com/AlexD89'>
                            <img className="githubImg" src='images/GitHub-Mark.svg' alt="github icon"/>
                        </a>
                        <a href="https://www.linkedin.com/in/alex-dziuba-0426a0122/">
                            <img className="linkedinImg" src="images/LinkedIn_logo_initials.svg" alt="linkedin icon"/>
                        </a>
                        <a href="https://angel.co/u/alex-dziuba">
                            <img className="angellistImg" src="images/angellist_icon.svg" alt="angellist" />
                        </a>
                    </div>
                </div>
                <div className="personalLinks">
                    <div className="tintype-container">
                        <img src="images/andrew_v.jpg" alt="" />
                        <h6>A.V.</h6>
                    </div>
                    <div className="links">
                        {/* <div className="linkName">
                            Andrew Vitovitch
                        </div> */}
                        <a href='https://github.com/alvitovitch'>
                            <img className="githubImg" src='images/GitHub-Mark.svg' alt="github icon" />
                        </a>
                        <a href='https://www.linkedin.com/in/alvitovitch/'>
                            <img className="linkedinImg" src="images/LinkedIn_logo_initials.svg" alt="linkedin icon" />
                        </a>
                        <a href="https://angel.co/u/andrew-vitovitch">
                            <img className="angellistImg" src="images/angellist_icon.svg" alt="angellist" />
                        </a>
                    </div>
                </div>
                <div className="personalLinks">
                    <div className="tintype-container">
                        <img src="images/kyle_g.JPG" alt="" />
                        <h6>K.G.</h6>
                    </div>
                    <div className="links">
                        {/* <div className="linkName">
                            Kyle Ginzburg
                        </div> */}
                        <a href='https://github.com/keginzburg'>
                            <img className="githubImg" src='images/GitHub-Mark.svg' alt="github icon" />
                            
                        </a>
                        <a href='https://www.linkedin.com/in/kyleginzburg/'>
                            <img className="linkedinImg" src="images/LinkedIn_logo_initials.svg" alt="linkedin icon" />
                            
                        </a>
                        <a href="https://angel.co/u/kyle-ginzburg">
                            <img className="angellistImg" src="images/angellist_icon.svg" alt="angellist" />
                            
                        </a>
                    </div>
                </div>
                <div className="personalLinks">
                    <div className="tintype-container">
                        <img src="images/steph_s.jpg" alt="" />
                        <h6>S.S.</h6>
                    </div>
                    <div className="links">
                        {/* <div className="linkName">
                            Stephanie Soni
                        </div> */}
                        <a href='https://github.com/ashes4trees'>
                            <img className="githubImg" src='images/GitHub-Mark.svg' alt="github icon" />
                        </a>
                        <a href='https://www.linkedin.com/in/steph-soni/'>
                            <img className="linkedinImg" src="images/LinkedIn_logo_initials.svg" alt="linkedin icon" />
                        </a>
                        <a href="https://angel.co/u/steph-soni">
                            <img className="angellistImg" src="images/angellist_icon.svg" alt="angellist" />
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default LinkBar