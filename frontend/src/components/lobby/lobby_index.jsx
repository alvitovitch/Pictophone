import React from "react";
import LobbyIndexItem from "./lobby_index_item";
import Modal from "../modal/modal";
import { socket } from '../../util/socket_util'

class LobbyIndex extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            img1: '../../../images/paper.jpg',
            img2: '../../../images/paper.jpg',
            img3: '../../../images/paper.jpg',
            img4: '../../../images/paper.jpg'
        }
        this.socket = socket
        this.socket.emit("join-room", "lobby")
        this.socket.on("update-index", () => 
        {
            console.log("receive update index")
            this.props.requestAllRooms()
        })
        this.randomDrawing = this.randomDrawing.bind(this);
    }

    componentDidMount() {
        this.props.requestAllUsers()
            .then(() => this.props.requestAllRooms())
            .then(() => this.props.requestAllDrawings())
            .catch((err) => console.log(err))
        this.randomDrawing();
    }

    randomDrawing() {
        setInterval(() => {
            
            const imageNum = Math.floor(Math.random() * 5);
            const imageName = `img${imageNum}`;
            const max = this.props.drawings.length;
            const num = Math.floor(Math.random() * max);
            if (typeof this.props.drawings[num] !== 'undefined') {
                this.setState({ [imageName]: this.props.drawings[num].assetUrl}) ;
            }
        }, 4000)
       
    }

    render() {
        const { rooms, users, currentUser } = this.props;

        return (

            <div className="lobby-page">
                <Modal />
                <aside className="image-feed">
                    <div className="feed-img-box">
                        <img src={this.state.img1}/>
                    </div>
                    <div className="feed-img-box">
                        <img src={this.state.img2} />
                    </div>
                </aside>
                <section className="rooms-container">
                    <div className="rooms-container-header">
                        <h1>CURRENT GAMES</h1>
                        <div
                            className="index-container-btn"
                            onClick={e => this.props.openModal('createRoom')}>
                            Create a Room
                        </div>
                    </div>
                    <div className="rooms-container-list">
                        {(rooms.length === 0 || Object.values(users).length === 0) ?
                            ("") : (
                                <ul>
                                    {rooms.reverse().map((room, i) => (
                                        <LobbyIndexItem
                                            key={i}
                                            errors={this.props.errors}
                                            roomFullError={this.props.roomFullError}
                                            currentUser={currentUser}
                                            updateRoom={this.props.updateRoom}
                                            deleteRoom={this.props.deleteRoom}
                                            requestAllRooms={this.props.requestAllRooms}
                                            users={users}
                                            room={room} />
                                    ))}
                                </ul>
                            )}
                    </div>
                </section>
                <aside className="image-feed">
                    <div className="feed-img-box">
                        <img src={this.state.img3} />
                    </div>
                    <div className="feed-img-box">
                        <img src={this.state.img4} />
                    </div>
                </aside>
            </div>
        )
    }
}

export default LobbyIndex;
