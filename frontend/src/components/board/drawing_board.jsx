import React, { userEffect } from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';

// import sketch from './sketch';

class DrawingBoard extends React.Component{
    constructor(props) {
        super(props)
        this.state = { 
            x: undefined,
            y: undefined
        }
    this.getMousePos = this.getMousePos.bind(this);
    this.sketch = this.sketch.bind(this);
    }

    sketch(p5) {
        let canvas;

        p5.setup = () => {
            canvas = p5.createCanvas(500, 500);
           
        }
        const coords = this.state
        p5.draw = () => {
            p5.background('red');
            p5.ellipse(coords.x, coords.y, 10, 10);
            p5.fill('white');
        }
    }

    getMousePos(e) {
        debugger
        this.setState({x: e.clientX, y: e.clientY})
    }

    render() {
        return (
            <div onMouseMove={this.getMousePos}>
                <ReactP5Wrapper  sketch={this.sketch} ></ReactP5Wrapper>
            </div>
        )
    }
}

// export default DrawingBoard
// const DrawingBoard = () => {
//     const Sketch = p5 => {
//         let radius;
//         p5.setup = () => {
//             p5.createCanvas(500, 500);
//             p5.background(0);
//         };

//         p5.draw = () => {
//             p5.ellipse(window.mouseX, window.mouseY, 10, 10);
//         };
//     };

//     const board = () => {
//         return new p5(Sketch());
//     }

//     return (
//         <div>{board}</div>
//     );
// };

export default DrawingBoard;