import React from "react";
import hand from "../../images/pointing-hand.webp"


class Splash extends React.Component {

    render() {
        return (
            <div id='splashMain'>
                <div className="splash-tutorial">
                    <img src={hand} alt="tutorial 1" />
                    <div>
                        <h1>What is Pictophone?</h1>
                        <h2>It seems so long ago that we could gather in person and play games, but things have changed. Enter Pictophone! Pictophone is a multiplayer game that allows users to meet up online, communicate, and draw together.</h2>
                    </div>
                </div>
                <div className="splash-tutorial">
                    <div>
                        <h1>Where do I start?</h1>
                        <h2>First, if you haven't already made an account with us, you can start by signing up! And don't worry, we're not interested in your email! All we need is a username and password! After signing up or logging in, you'll be taken to our main game lobby!</h2>
                    </div>
                    <img src={hand} alt="tutorial 2" />
                </div>
                <div className="splash-tutorial">
                    <img src={hand} alt="tutorial image 3" />
                    <div>
                        <h1>Where to next?</h1>
                        <h2>In our main lobby, players are more than welcome to join any open rooms and start a game once the room is populated. Players can also create their own rooms, so friends and family can join.</h2>
                    </div>
                </div>
                <div className="splash-tutorial">
                    <div>
                        <h1>How to play?</h1>
                        <h2>If you're not chatting or drawing together with the other players in your room, players can start a game! Once the game starts, each player will be given a random prompt and asked to draw it. That drawing will then be sent to the next player, who will try and guess what the original prompt was. And so on and so forth!</h2>
                    </div>
                    <img src={hand} alt="tutorial 3" />

                </div>
            </div>
        )
    }
}

export default Splash