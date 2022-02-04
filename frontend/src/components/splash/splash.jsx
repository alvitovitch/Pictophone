import React from "react";


class Splash extends React.Component {

    render() {
        return (
            <div id='splash-container'>
                <div id='splashMain'>
                    <div className="splash-tutorial">
                        <img src="/images/pointing-hand.webp" alt="tutorial 2" />
                        <div>
                            <h1>WHAT IS PICTOPHONE?
                            </h1>
                            <h2 >
                                    It seems so long ago that we could gather in person and play games, but things have changed. Enter Pictophone! Pictophone is a multiplayer game that allows users to meet up online, chat, and draw together.
                            </h2>
                        </div>
                    </div>
                    <div className="splash-tutorial">
                        <div>
                            <h1>WHERE DO I START?</h1>
                            <h2>First, if you haven't already made an account with us, you can start by signing up! And don't worry, we're not interested in your email! All we need is a username and password! After signing up or logging in, you'll be taken to our main game lobby!</h2>
                        </div>
                        <img className="reverse" src="/images/pointing-hand.webp" alt="tutorial 2" />
                    </div>
                    <div className="splash-tutorial">
                        <img src="/images/pointing-hand.webp" alt="" />
                        <div>
                            <h1>WHERE TO NEXT?</h1>
                            <h2>In our main lobby, players are more than welcome to join any open rooms and start a game once the room is populated. Players can also create their own rooms, so friends and family can join.</h2>
                        </div>
                    </div>
                    <div className="splash-tutorial">
                        <div>
                            <h1>HOW TO PLAY?</h1>
                            <h2>If you're not chatting or drawing together with the other players in your room, players can start a game! Once the game starts, each player will be given a random prompt and asked to draw it. That drawing will then be sent to the next player, who will guess what the original prompt was. And so on and so forth!</h2>
                        </div>
                        <img className="reverse" src="/images/pointing-hand.webp" alt="tutorial 3" />

                    </div>
                </div>
            </div>
        )
    }
}

export default Splash