import React from "react";
import { Link } from 'react-router-dom'
import github from '../../images/GitHub-Mark.png'
import linkin from '../../images/LinkedIn_logo_initials.png'
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
                            <img className="githubImg" src={github}/>
                        </a>
                        <a href='www.linkedin.com/in/alexander-dziuba-0426a0122'>
                            <img className="linkedinImg" src={linkin}/>
                        </a>
                    </div>
                </div>
                <div className="personalLinks">
                    <div className="linkName">
                        Andrew Vitovitch
                    </div>
                    <div>
                        <a href='https://github.com/alvitovitch'>
                            <img className="githubImg" src={github}/>
                        </a>
                        <a href='https://www.linkedin.com/in/alvitovitch/'>
                            <img className="linkedinImg" src={linkin}/>
                        </a>
                    </div>
                </div>
                <div className="personalLinks">
                    <div className="linkName">
                        Kyle Ginzburg
                    </div>
                    <div>
                        <a href='https://github.com/keginzburg'>
                            <img className="githubImg" src={github}/>
                        </a>
                        <a href='https://www.linkedin.com/in/kyleginzburg/'>
                            <img className="linkedinImg" src={linkin}/>
                        </a>
                    </div>
                </div>
                <div className="personalLinks">
                    <div className="linkName">
                        Stephanie Soni
                    </div>
                    <div>
                        <a href='https://github.com/ashes4trees'>
                            <img className="githubImg" src={github}/>
                        </a>
                        <a href='https://www.linkedin.com/in/steph-soni/'>
                            <img className="linkedinImg" src={linkin}/>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default LinkBar