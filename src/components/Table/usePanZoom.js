// usePanZoom.js - Hook for defining panning and zooming logic.

import {
    useCallback, useEffect, useRef, useState
} from 'react';
import useMouseCoordinates from './useMouseCoordinates';

const defaultOptions = {
    panLimit: {min:-Infinity, max:Infinity},
    zoomLimit: {min:0.1, max:4}
}

function usePanZoom(assignedOptions) {
    const options = {...defaultOptions, ...assignedOptions}

    let panZoomEvents = {}

    const [transform,setTransform] = useState({position:{x:0,y:0}, scale:1})

    const panLastPoint = useRef({x:0,y:0});
    
    const mousePosition = useRef({x:0,y:0});

    panZoomEvents.onMouseMove = useCallback(
        event => {
            mousePosition.current = {x:event.pageX,y:event.pageY}
        }
    );

    panZoomEvents.onPanMove = useCallback(
        event => {
            const lastPoint = panLastPoint.current;
            const point = {x:event.pageX, y:event.pageY};
            const offset = {x:lastPoint.x - point.x, y:lastPoint.y - point.y};
            setTransform({position:{x:transform.position.x + offset.x, y:transform.position.y - offset.y},scale:transform.scale});
        },
    [setTransform, transform.position]);
    
    panZoomEvents.onPanEnd = useCallback(
        event => {
            document.removeEventListener('mousemove', panZoomEvents.onPanMove);
            document.removeEventListener('mouseup', panZoomEvents.onPanEnd);
        },
    [panZoomEvents.onPanMove]);
    
    panZoomEvents.onPanStart = useCallback(
        event => {
            document.addEventListener('mousemove', panZoomEvents.onPanMove);
            document.addEventListener('mouseup', panZoomEvents.onPanEnd);
            panLastPoint.current = {x:event.pageX, y:event.pageY}
        },
    [panZoomEvents.onPanMove,panZoomEvents.onPanEnd]);

    //const [scale,setScale] = useState(1);
    //const MIN_ZOOM = 0.1
    //const MAX_ZOOM = 4

    //const panLastPoint = useRef({x:0,y:0});

    panZoomEvents.onWheelZoom = useCallback(
        event => {
            let oldScale = transform.scale
            let newScale = Math.min(options.zoomLimit.max, Math.max(options.zoomLimit.min, Math.round(10 * (transform.scale + (event.deltaY * -0.001)))/10))
            console.log()
            let newPosition = {...transform.position};
            let mousePosition = {x:event.clientX + transform.position.x,y:event.clientY + transform.position.y};
            console.log(mousePosition)
            
            //newPosition.x *= newScale - oldScale;
            //newPosition.y *= newScale - oldScale;
            
            
            setTransform(transform => {
                return {
                    scale:newScale,
                    position:newPosition
                }
            })
        },
    [setTransform, transform]);

    return [transform, panZoomEvents]
}

export default usePanZoom