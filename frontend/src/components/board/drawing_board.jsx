import React, { userEffect } from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import P5 from 'p5';

import sketch from './sketch';

// FAILED EXPERIMENT 
class DrawingBoard extends React.Component{
    constructor(props) {
        super(props)
        this.sketch = this.sketch.bind(this);
    }

    // setup(p) {
    //     let canvas;
    //     p.setup = () => canvas = p.createCanvas(500, 500)
    // }

    // draw(p) {
    //     p.draw = () => {
    //         p.background('red');
    //         if (p.mouseIsPressed) {
    //             p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
    //             p.strokeWeight(10);
    //             p.fill('white');

    //         }
    //     }
    // }

    sketch(p5) {
        let canvas;
        p5.setup = () => {
            canvas = p5.createCanvas(500, 500);
            // canvas.parent(document.querySelector('.canvas-container'));
           
        }
        p5.draw = () => {
            p5.background('red');
            if (p5.mouseIsPressed) {
                p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
                p5.strokeWeight(10);
                p5.fill('white');
               
            }
        }
    }

    render() {

        return (
            <div className='canvas-container'>
                
                <ReactP5Wrapper sketch={this.sketch}></ReactP5Wrapper>
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