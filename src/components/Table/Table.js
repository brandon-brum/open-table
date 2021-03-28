// Table.js - Container for Objects and tardisTables, also contains zooming and panning logic.

import { useRef, useCallback, useState } from "react";
import usePanZoom from './usePanZoom.js';
import useZoom from './useZoom.js';
import useMouseCoordinates from './useMouseCoordinates.js';

import './Table.css';

function Table(props) {
    const [transform, events] = usePanZoom()
    const position = transform.position;
    const scale = transform.scale;

    return (
        <>
        <p>{JSON.stringify({position:position,scale:scale})}</p>
        <div className='Table' onMouseDown={events.onPanStart} onWheel={events.onZoomWheel} >
            <div className='Surface' style={{
                transform:`scale(${transform.scale})`,
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