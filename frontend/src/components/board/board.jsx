import React from 'react';
import io from 'socket.io-client';


class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recordSketch: false
        }
        this.timeout = undefined;
    
        // this.socket = io.connect("http://localhost:6000");
        // this.socket.on("drawing", (drawing) => {
        //     const that = this;
        //     const interval = setInterval(()  => {
        //         if (that.state.recordSketch) return;
        //         that.state.recordSketch = true;
        //         clearInterval(interval);
        //         const image = new Image();
        //         const canvas = document.querySelector('.board');
        //         const ctx = canvas.getContext('2d');
        //         image.onload = ()  => {
        //             ctx.drawImage(image, 0, 0);

        //             that.state.recordSketch = false;
        //         };
        //         image.src = drawing;
        //     }, 200)
        // })
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
       
        ctx.lineWidth = 10;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'red';

        canvas.addEventListener('mousedown', (e)  => {
            canvas.addEventListener('mousemove', drawLine, false);
        }, false);

        canvas.addEventListener('mouseup', ()  => {
            canvas.removeEventListener('mousemove', drawLine, false);
        }, false);

        const drawLine = function () {
            ctx.beginPath();
            ctx.moveTo(prevPos.x, prevPos.y);
            ctx.lineTo(currentPos.x, currentPos.y);
            ctx.closePath();
            ctx.stroke();

            const that = this;

            // if (that.timeout != undefined) clearTimeout(that.timeout);
            // that.timeout = setTimeout(function () {
            //     var drawingData = canvas.toDataURL("image/png");
            //     that.socket.emit("canvas-data", drawingData);
            // }, 1000)
        };
    }


    render() {
        return (
            <div className="board-container" >
                <canvas className="board" ></canvas>
            </div>
        )
    }
}

export default Board;