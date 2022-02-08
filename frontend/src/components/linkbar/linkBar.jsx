import React from "react";

class LinkBar extends React.Component {

    render() {
        return (
            <div id="linkBar">
                <div className="personalLinks">
                    <div className="tintype-container">
                        <img src="images/alex_d.jpg" alt="" />
                        <h6>AD</h6>
                    </div>
                    <div className="links">
                        {/* <div className="linkName">
                            Alex Dziuba
                        </div> */}
                        <a href='https://github.com/AlexD89' target="_blank" rel="noreferrer">
                            <img className="githubImg" src='images/GitHub-Mark.svg' alt="github icon"/>
                        </a>
                        <a href="https://www.linkedin.com/in/alex-dziuba-0426a0122/" target="_blank" rel="noreferrer">
                            <img className="linkedinImg" src="images/LinkedIn_logo_initials.svg" alt="linkedin icon"/>
                        </a>
                        <a href="https://angel.co/u/alex-dziuba" target="_blank" rel="noreferrer">
                            <img className="angellistImg" src="images/angellist_icon.svg" alt="angellist" />
                        </a>
                    </div>
                </div>
                <div className="personalLinks">
                    <div className="tintype-container">
                        <img src="images/andrew_v.png" alt="" />
                        <h6>AV</h6>
                    </div>
                    <div className="links">
                        {/* <div className="linkName">
                            Andrew Vitovitch
                        </div> */}
                        <a href='https://github.com/alvitovitch' target="_blank" rel="noreferrer">
                            <img className="githubImg" src='images/GitHub-Mark.svg' alt="github icon" />
                        </a>
                        <a href='https://www.linkedin.com/in/alvitovitch/' target="_blank" rel="noreferrer">
                            <img className="linkedinImg" src="images/LinkedIn_logo_initials.svg" alt="linkedin icon" />
                        </a>
                        <a href="https://angel.co/u/andrew-vitovitch" target="_blank" rel="noreferrer">
                            <img className="angellistImg" src="images/angellist_icon.svg" alt="angellist" />
                        </a>
                    </div>
                </div>
                <div className="personalLinks">
                    <div className="tintype-container">
                        <img src="images/kyle_g.JPG" alt="" />
                        <h6>KG</h6>
                    </div>
                    <div className="links">
                        {/* <div className="linkName">
                            Kyle Ginzburg
                        </div> */}
                        <a href='https://github.com/keginzburg' target="_blank" rel="noreferrer">
                            <img className="githubImg" src='images/GitHub-Mark.svg' alt="github icon" />
                            
                        </a>
                        <a href='https://www.linkedin.com/in/kyleginzburg/' target="_blank" rel="noreferrer">
                            <img className="linkedinImg" src="images/LinkedIn_logo_initials.svg" alt="linkedin icon" />
                            
                        </a>
                        <a href="https://angel.co/u/kyle-ginzburg" target="_blank" rel="noreferrer">
                            <img className="angellistImg" src="images/angellist_icon.svg" alt="angellist" />
                            
                        </a>
                    </div>
                </div>
                <div className="personalLinks">
                    <div className="tintype-container">
                        <img src="images/steph_s.jpg" alt="" />
                        <h6>SS</h6>
                    </div>
                    <div className="links">
                        {/* <div className="linkName">
                            Stephanie Soni
                        </div> */}
                        <a href='https://github.com/ashes4trees' target="_blank" rel="noreferrer">
                            <img className="githubImg" src='images/GitHub-Mark.svg' alt="github icon" />
                        </a>
                        <a href='https://www.linkedin.com/in/steph-soni/' target="_blank" rel="noreferrer">
                            <img className="linkedinImg" src="images/LinkedIn_logo_initials.svg" alt="linkedin icon" />
                        </a>
                        <a href="https://angel.co/u/steph-soni" target="_blank" rel="noreferrer">
                            <img className="angellistImg" src="images/angellist_icon.svg" alt="angellist" />
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default LinkBar