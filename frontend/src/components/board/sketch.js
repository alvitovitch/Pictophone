import React from "react";
import EntitiesReducer from "../../reducers/entities_reducer";

//FAILED EXPERIMENT 
export default function Sketch(p5) {
        let canvas;
    p5.setup = () => {
            canvas = p5.createCanvas(500, 500);

        };
     p5.draw = () => {
            p5.background('red');
            if (p5.mouseIsPressed) {
                p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
                p5.strokeWeight(10);
                p5.stroke('white');

            }
        };
    return (
        <></>
    )
 }

