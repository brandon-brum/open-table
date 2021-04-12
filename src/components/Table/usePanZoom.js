// usePanZoom.js - Hook for defining panning and zooming logic.

import { useCallback, useRef, useState } from "react";

const defaultOptions = {
    panLimit: {min:-Infinity, max:Infinity},
    zoomLimit: {min:0.1, max:4}
}

function usePanZoom(assignedOptions) {
    const options = {...defaultOptions, ...assignedOptions};

    let panZoomEvents = {};

    const [transform,setTransform] = useState({position:{x:0,y:0}, scale:1});

    const panLastPoint = useRef({x:0,y:0});

    panZoomEvents.onPanMove = useCallback(
        event => {
            const lastPoint = panLastPoint.current;
            const point = {x:event.pageX, y:event.pageY};
            const offset = {x:lastPoint.x - point.x, y:lastPoint.y - point.y};
            setTransform({position:{x:transform.position.x + offset.x, y:transform.position.y - offset.y},scale:transform.scale});
        },
    [setTransform, transform]);
    
    panZoomEvents.onPanEnd = useCallback(
        event => {
            document.removeEventListener("mousemove", panZoomEvents.onPanMove);
            document.removeEventListener("mouseup", panZoomEvents.onPanEnd);
        },
    [panZoomEvents.onPanMove, panZoomEvents.onPanEnd]);
    
    panZoomEvents.onPanStart = useCallback(
        event => {
            document.addEventListener("mousemove", panZoomEvents.onPanMove);
            document.addEventListener("mouseup", panZoomEvents.onPanEnd);
            panLastPoint.current = {x:event.pageX, y:event.pageY};
        },
    [panZoomEvents.onPanMove,panZoomEvents.onPanEnd]);

    panZoomEvents.onWheelZoom = useCallback(
        event => {
            let oldScale = transform.scale;
            let newScale = Math.min(options.zoomLimit.max, Math.max(options.zoomLimit.min, Math.round(10 * (transform.scale + (event.deltaY * -0.001)))/10));    
            let newPosition = {...transform.position};

            newPosition = {x:newPosition.x + (event.clientX), y:newPosition.y - (event.clientY)};
            
            newPosition.x *= newScale / oldScale;
            newPosition.y *= newScale / oldScale;
            
            newPosition = {x:newPosition.x - (event.clientX), y:newPosition.y + (event.clientY)};

            setTransform(transform => {
                return {
                    scale:newScale,
                    position:newPosition
                };
            });
        },
    [setTransform, transform, options.zoomLimit]);

    return [transform, panZoomEvents];
}

export default usePanZoom;