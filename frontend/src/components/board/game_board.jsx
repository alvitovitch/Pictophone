import React from 'react';
import AWS from 'aws-sdk';
import { socket } from "../../util/socket_util";


class GameBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: 'black',
            size: 5
        }
        this.socket = socket
        
        AWS.config.update({
            apiVersion: 'latest',
            accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
        });
       

        this.bucket = new AWS.S3({
            params: { Bucket: 'pictophone-uploads' },
            region: 'us-east-1',
        });

        window.addEventListener('resize', () => this.updateCanvas());

        this.updateColor = this.updateColor.bind(this);
        this.updateSize = this.updateSize.bind(this);
        this.updateErase = this.updateErase.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.getCanvas = this.getCanvas.bind(this);
    };
    
    getCanvas() {
        
        const drawing = document.querySelector('.game-board');
         if (drawing.getContext('2d').getImageData(0,0,drawing.width, drawing.height).data.some(channel => channel !== 0)){
             drawing.toBlob(blob => {
                 blob.name = `drawing${this.props.roomId}${this.props.chainId}`; 
                 this.uploadFile(blob);  
             })
             let button = document.getElementById('submit')
             button.innerText = 'Waiting for other players'
             button.style.pointerEvents = 'none'
         } else {
             const errors = document.getElementById('game-errors')
             errors.style.background = 'rgba(255, 0, 0, .56)'
             errors.style.color = 'rgba(255, 255, 255, 1)'
            
             setTimeout(() => {errors.style.background = 'rgba(255, 0, 0, 0)';
                errors.style.color = 'rgba(255, 255, 255, 0)';
            }, 3000)
         }
        
    };

    uploadFile = (file) => {
        const params = {
            Key: file.name,
            ContentType: file.type,
            Body: file,
        };
        const that = this;
        this.bucket.upload(params).promise().then(function (data) {
            let newDrawing = {
                assetUrl: data.Location,
                roomId: that.props.roomId,
                userId: that.props.userId,
                chainId: that.props.chainId
            };
            that.props.createDrawing(newDrawing);
            // Drawings are patched to backend game with respective players
            // chain IDs
            let chain = {};
            chain[that.props.chainId] = data.Location;
            that.props.updateGame({ roomId: that.props.roomId, chainObj: chain })

            console.log(`File uploaded successfully. ${data.Location}`);
        }, function (err) {
            console.error("Upload failed", err);
        })
        .then(() => this.socket.emit('submit-chain', this.props.roomId))
        .then(() =>  this.props.handleSubmit())
    }
    

    createCanvas() {
        this.canvas = document.querySelector('.game-board');
        this.ctx = this.canvas.getContext('2d');
        const wt = this.canvas.parentElement.offsetWidth;
        const ht = this.canvas.parentElement.offsetHeight - 70;
        this.canvas.width = wt;
        this.canvas.height = ht;
    }

    componentDidMount() {
        this.props.draw()
        this.createCanvas();
        this.drawSketch();
    }

    updateCanvas() {
        const wt = this.canvas.parentElement.offsetWidth;
        const ht = this.canvas.parentElement.offsetHeight - 75;
        this.canvas.width = wt;
        this.canvas.height = ht;
    }
    
    componentDidUpdate() {
        this.drawSketch();
    }

    drawSketch() {
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

        this.canvas.addEventListener('mousedown', (e) => {
            that.canvas.addEventListener('mousemove', drawLine, false);
        }, false);

        this.canvas.addEventListener('mouseup', () => {
            this.canvas.removeEventListener('mousemove', drawLine, false);
        }, false);


        const drawLine = function () {
            that.ctx.beginPath();
            that.ctx.moveTo(prevPos.x, prevPos.y);
            that.ctx.lineTo(currentPos.x, currentPos.y);
            that.ctx.closePath();
            that.ctx.stroke();
        };
    }

    updateColor(color) {
        this.setState({ color: color });
    }

    updateSize(size) {
        this.setState({ size: size });
    }

    updateErase(size) {
        this.setState({ size: size, color: 'rgb(245, 245, 245)' });
    }

    handleClear() {
        this.ctx.fillStyle = 'rgb(245, 245, 245)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render() {
        return (
            <div className="game-board-container" >
                <canvas className="game-board" ></canvas>
                <div id='game-errors'>

                        You need to draw something before submitting

                </div>

                
                
                <div className='game-draw-controls'>
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
                            <p className='size-5'
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

                    <button id='submit' onClick={this.getCanvas}>Submit</button>
                </div>

            </div>
        )
    }
}

export default GameBoard;

