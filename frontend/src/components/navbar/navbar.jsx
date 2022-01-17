import React from "react";
import { Link } from 'react-router-dom'
import logo from "../../images/vintage-candlestick-telephone-vector-21717680.jpg"

class NavBar extends React.Component {

    render() {
 
        // if (this.props.loggedIn) {
            return (
                <div id='navBar'>
                    <div id='logoTitle'>
                        <div id='Logo'>
                            <img id='logoPic' src={logo} />    
                        </div>
                    Pictophone

    
        
                    </div>
                    <div id='navButtons'>
                        <button className="navButton">
                            <Link to={'/login'}>Login</Link>
                        </button>
                        <button className="navButton">
                            <Link to={'/signup'}>Sign up</Link>
                        </button>
                    </div>

                </div>
            )
        // } else {
        //     return(
        //         <div id='navBar'>
        //             <div id='logoTitle'>
        //                 <div id='Logo'>
        //                     <img id='logoPic' src={logo} />    
        //                 </div>
        //             Pictophone
        //             </div>
        //             <div>
        //                 <Link to={'/login'}>Login</Link>
        //                 <Link to={'/signup'}>Sign up</Link>
        //             </div>
                
        //     )
        // }
    }
} 

export default NavBar