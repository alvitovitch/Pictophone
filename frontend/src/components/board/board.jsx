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
    
        this.socket = io.connect('http://localhost:4040');
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
    // this.canvas = document.querySelector('.board');
    // this.ctx = this.canvas.getContext('2d');
    // this.canvas.width = 600;
    // this.canvas.height = 600;
    this.updateColor = this.updateColor.bind(this);
    this.updateSize = this.updateSize.bind(this);
    this.updateErase = this.updateErase.bind(this);
    this.handleClear = this.handleClear.bind(this);
    }

    createCanvas() {
        this.canvas = document.querySelector('.board');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 600;
        this.canvas.height = 600;
    }

    componentDidMount() {
        this.createCanvas();
        this.drawSketch();
    }


    componentDidUpdate() {
        this.drawSketch();
    }

    drawSketch() {
        // const canvas = document.querySelector('.board');
        // const ctx = canvas.getContext('2d');
        // canvas.width = 600;
        // canvas.height = 600;

        const currentPos = { x: 0, y: 0 };
        const prevPos = { x: 0, y: 0 };
        const that = this;

        this.canvas.addEventListener('mousemove', (e) => {
            prevPos.x = currentPos.x;
            prevPos.y = currentPos.y;

            currentPos.x = e.pageX - e.currentTarget.offsetLeft;
            currentPos.y = e.pageY - e.currentTarget.offsetTop;
        }, false);
       
        this.ctx.lineWidth = this.state.size;
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = this.state.color;

        this.canvas.addEventListener('mousedown', (e)  => {
            that.canvas.addEventListener('mousemove', drawLine, false);
        }, false);

        this.canvas.addEventListener('mouseup', ()  => {
            this.canvas.removeEventListener('mousemove', drawLine, false);
        }, false);


        const drawLine = function () {
            that.ctx.beginPath();
            that.ctx.moveTo(prevPos.x, prevPos.y);
            that.ctx.lineTo(currentPos.x, currentPos.y);
            that.ctx.closePath();
            that.ctx.stroke();

            if (that.timeout !== undefined) clearTimeout(that.timeout);
            that.timeout = setTimeout(function () {
                const drawingData = that.canvas.toDataURL("image/png");
                that.socket.emit("send-drawing", drawingData, that.props.roomId);
            }, 1000)
        };
    }

    updateColor(color) {
        console.log(color);
        this.setState({color: color});
    }

    updateSize(size) {
       this.setState({size: size});
    }

    updateErase(size) {
        this.setState({size: size, color: 'wheat'})
    }

    handleClear(){
        this.createCanvas();
        this.drawSketch();
    }
    render() {
        return (
            <div className="board-container" >
                <canvas className="board" ></canvas>
                <div className='draw-controls'>
                    <div className='colors-dropdown'>

                        <button className='color-btn'>color</button>

                        <div className='color-dropdown-content'>
                            <p
                                onClick={() => this.updateColor('black')}>
                                black
                            </p>
                            <p
                                onClick={() => this.updateColor('red')}>
                                red
                            </p>
                            <p
                                onClick={() => this.updateColor('blue')}>
                                blue
                            </p>
                            <p
                                onClick={() => this.updateColor('green')}>
                                green
                            </p>
                        </div>
                    </div>
                    <div className='size-dropdown'>

                        <button className='size-btn'>size</button>

                        <div className='size-dropdown-content'>
                            <p  className='size-5'
                                onClick={() => this.updateSize('5')}></p>
                            <p
                                className='size-10'
                                onClick={() => this.updateSize('10')}></p>
                            <p
                                className='size-15'
                                onClick={() => this.updateSize('15')}></p>
                            <p
                                className='size-20'
                                onClick={() => this.updateSize('20')}></p>
                        </div>
                    </div>
                    <div className='erase-dropdown'>

                        <button className='size-btn'>erase</button>

                        <div className='erase-dropdown-content'>
                            <p className='size-5'
                                onClick={() => this.updateErase('5')}></p>
                            <p
                                className='size-10'
                                onClick={() => this.updateErase('10')}></p>
                            <p
                                className='size-15'
                                onClick={() => this.updateErase('15')}></p>
                            <p
                                className='size-20'
                                onClick={() => this.updateErase('20')}></p>
                        </div>
                    </div>

                    <button 
                        className='clear-btn'
                        onClick={() => this.handleClear()}>clear</button>
                </div>
               
                
            </div>
        )
    }
}

export default Board;