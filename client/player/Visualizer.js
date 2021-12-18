import React from 'react';
import Canvas from 'react-native-canvas';


export default function Visualizer({position, type, direction}) {
    // position: down, up, sideways
    // type: middle, edges, single
    // direction: (for single)
    // up/down: left, right
    // sideways: up, down

    const visualizer = canvas => {
        
    };
    return <Canvas ref={visualizer}/>;
}