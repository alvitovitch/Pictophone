import React from "react";
import LobbyIndexItem from "./lobby_index_item";
import Modal from "../modal/modal";
import { socket } from '../../util/socket_util'

class LobbyIndex extends React.Component {
    constructor(props){
        super(props)
        this.socket = socket
        this.socket.emit("join-room", "lobby")
        this.socket.on("update-index", () => 
        {
            console.log("receive update index")
            this.props.requestAllRooms()
        })
    }

    componentDidMount() {
        this.props.requestAllUsers()
            .then(() => this.props.requestAllRooms())
            .catch((err) => console.log(err))
    }

    render() {
        const { rooms, users, currentUser } = this.props
        return (

            <div className="lobby-page">
                <Modal />
                <aside className="image-feed">
                    <div className="feed-img-box">
                        <img src="/images/lobby-img/img1.png"/>
                    </div>
                    <div className="feed-img-box">
                        <img src="/images/lobby-img/img2.png" />
                    </div>
                </aside>
                <section className="rooms-container">
                    <div className="rooms-container-header">
                        <h1>CURRENT GAMES</h1>
                        <div
                            className="index-conrainer-btn"
                            onClick={e => this.props.openModal('createRoom')}>
                            Create a Room
                        </div>
                    </div>
                    <div className="rooms-container-list">
                        {(rooms.length === 0 || Object.values(users).length === 0) ?
                            ("") : (
                                <ul>
                                    {rooms.map((room, i) => (
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
                        <img src="/images/lobby-img/img3.png" />
                    </div>
                    <div className="feed-img-box">
                        <img src="/images/lobby-img/img4.png" />
                    </div>
                </aside>
            </div>
        )
    }
}

export default LobbyIndex;
