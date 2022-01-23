import React from "react";
import { Link } from 'react-router-dom'

class LinkBar extends React.Component {

    render() {
        return (
            <div id="linkBar">
                <div className="personalLinks">
                    <div className="linkName">
                        Alex Dziuba
                    </div>
                    <div>
                        <a href='https://github.com/AlexD89'>
                            <img className="githubImg" src='images/GitHub-Mark.png' alt="image"/>
                        </a>
                        <a href='www.linkedin.com/in/alexander-dziuba-0426a0122'>
                            <img className="linkedinImg" src="images/LinkedIn_logo_initials.png"/>
                        </a>
                    </div>
                </div>
                <div className="personalLinks">
                    <div className="linkName">
                        Andrew Vitovitch
                    </div>
                    <div>
                        <a href='https://github.com/alvitovitch'>
                            <img className="githubImg" src="images/GitHub-Mark.png" alt="image"/>
                        </a>
                        <a href='https://www.linkedin.com/in/alvitovitch/'>
                            <img className="linkedinImg" src="images/LinkedIn_logo_initials.png" alt="image"/>
                        </a>
                    </div>
                </div>
                <div className="personalLinks">
                    <div className="linkName">
                        Kyle Ginzburg
                    </div>
                    <div>
                        <a href='https://github.com/keginzburg'>
                            <img className="githubImg" src="images/GitHub-Mark.png" alt="image"/>
                        </a>
                        <a href='https://www.linkedin.com/in/kyleginzburg/'>
                            <img className="linkedinImg" src="images/LinkedIn_logo_initials.png" alt="image"/>
                        </a>
                    </div>
                </div>
                <div className="personalLinks">
                    <div className="linkName">
                        Stephanie Soni
                    </div>
                    <div>
                        <a href='https://github.com/ashes4trees'>
                            <img className="githubImg" src="images/GitHub-Mark.png"/>
                        </a>
                        <a href='https://www.linkedin.com/in/steph-soni/'>
                            <img className="linkedinImg" src="images/LinkedIn_logo_initials.png"/>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default LinkBar