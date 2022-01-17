import React from "react";

export default function sketch(p) {
    let canvas;

    p.setup = () => {
        canvas = p.createCanvas(500, 500);
    }

    p.draw = (props) => {
        debugger
        p.background('red');
        p.ellipse(props.x, props.y, 10, 10);
    }

}
