// Table.js - Container for Objects and tardisTables, also contains zooming and panning logic.

import { useRef, useCallback, useState } from "react";
import usePan from './usePan.js';
import useZoom from './useZoom.js';
import useMouseCoordinates from './useMouseCoordinates.js';

import './Table.css';

function Table(props) {
    const [position, onPanStart] = usePan();
    const [scale, onZoomWheel] = useZoom();
    const [mousePosition, onMouseMove] = useMouseCoordinates();

    return (
        <>
        <p>{JSON.stringify({position:position,scale:scale,mousePosition:mousePosition})}</p>
        <div className='Table' onMouseMove={onMouseMove} onMouseDown={onPanStart} onWheel={onZoomWheel} >
            <div className='Surface' style={{
                transform:`scale(${scale})`,
                position:'absolute',
                left:`${-position.x}px`,
                top:`${position.y}px`,
                transformOrigin:`${position.x + (1920/2)}px ${-position.y + (630/2)}px`,
                backgroundSize:`${1/scale}`
            }}>
                {props.children}
            </div>
        </div>
        </>
    );
};

export default Table;