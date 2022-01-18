import React from 'react';
import io from 'socket.io-client';


class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recordSketch: false,
            color: 'black',
            size: 5
        }
        this.timeout = undefined;
    
        this.socket = io("http://localhost:4040");
        this.socket.emit('join-room', this.props.roomId)
        this.socket.on("receive-drawing", (drawing) => {
            const that = this;
            const interval = setInterval(()  => {
                if (that.state.recordSketch) return;
                that.state.recordSketch = true;
                clearInterval(interval);
                const image = new Image();
                const canvas = document.querySelector('.board');
                const ctx = canvas.getContext('2d');
                image.onload = ()  => {
                    ctx.drawImage(image, 0, 0);

                    that.state.recordSketch = false;
                };
                image.src = drawing;
            }, 200)
        })
    this.updateColor = this.updateColor.bind(this);
    this.updateSize = this.updateSize.bind(this);
    }


    componentDidMount() {
        this.drawSketch();
    }

    drawSketch() {
        const canvas = document.querySelector('.board');
        const ctx = canvas.getContext('2d');
        canvas.width = 600;
        canvas.height = 600;

        const currentPos = { x: 0, y: 0 };
        const prevPos = { x: 0, y: 0 };
        
        canvas.addEventListener('mousemove', (e) => {
            prevPos.x = currentPos.x;
            prevPos.y = currentPos.y;

            currentPos.x = e.pageX - e.currentTarget.offsetLeft;
            currentPos.y = e.pageY - e.currentTarget.offsetTop;
        }, false);
       
        ctx.lineWidth = this.state.size;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = this.state.color;

        canvas.addEventListener('mousedown', (e)  => {
            canvas.addEventListener('mousemove', drawLine, false);
        }, false);

        canvas.addEventListener('mouseup', ()  => {
            canvas.removeEventListener('mousemove', drawLine, false);
        }, false);

        const that = this;

        const drawLine = function () {
            ctx.beginPath();
            ctx.moveTo(prevPos.x, prevPos.y);
            ctx.lineTo(currentPos.x, currentPos.y);
            ctx.closePath();
            ctx.stroke();

            if (that.timeout != undefined) clearTimeout(that.timeout);
            that.timeout = setTimeout(function () {
                const drawingData = canvas.toDataURL("image/png");
                that.socket.emit("send-drawing", drawingData, that.props.roomId);
            }, 1000)
        };
    }

    updateColor(color) {
        this.setState({color: color})
    }

    updateSize(size) {
        this.setState({size: size})
    }

    render() {
        return (
            <div className="board-container" >
                <div className='colors-dropdown'>

                    <button className='color-btn'>color</button>

                    <div className='color-dropdown-content'>
                        <p
                            onClick={this.updateColor('black')}>
                            black
                        </p>
                        <p
                            onClick={this.updateColor('red')}>
                            red
                        </p>
                        <p
                            onClick={this.updateColor('blue')}>
                            blue
                        </p>
                        <p
                            onClick={this.updateColor('green')}>
                            green
                        </p>
                    </div>
                </div>
                <div className='size-dropdown'>

                    <button className='size-btn'>size</button>

                    <div className='size-dropdown-content'>
                        <p
                            onClick={this.updateSize('5')}>
                            
                        </p>
                        <p
                            onClick={this.updateSize('10')}>
                            
                        </p>
                        <p
                            onClick={this.updateSize('15')}>
                            
                        </p>
                        <p
                            onClick={this.updateSize('20')}>
                            
                        </p>
                    </div>
                </div>
                <canvas className="board" ></canvas>
            </div>
        )
    }
}

export default Board;