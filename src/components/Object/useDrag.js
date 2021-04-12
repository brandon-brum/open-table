// useDrag.js - Hook for controlling dragging using the mouse.

// Most of this code is actually copied from the panning portion of usePanZoom.js, but the nature of that math requires both panning and zooming to be done at once.

import { useCallback, useRef, useState } from "react";

function useDrag() {
    const dragLastPoint = useRef({x:5,y:0});

    const dragEvents = {};
    const offset = useRef({x:0,y:0})

    dragEvents.onDragMove = useCallback(
        event => {
            const lastPoint = dragLastPoint.current;
            const point = {x:event.pageX, y:event.pageY};
            if (lastPoint.x - point.x != 0) offset.current = {x:lastPoint.x - point.x, y:lastPoint.y - point.y};
            dragLastPoint.current = {x:event.pageX, y:event.pageY};
        },
    [offset, dragLastPoint]);
    
    dragEvents.onDragEnd = useCallback(
        event => {
            document.removeEventListener("mousemove", dragEvents.onDragMove);
            document.removeEventListener("mouseup", dragEvents.onDragEnd);
        },
    [dragEvents.onDragMove, dragEvents.onDragEnd]);
    
    dragEvents.onDragStart = useCallback(
        event => {
            document.addEventListener("mousemove", dragEvents.onDragMove);
            document.addEventListener("mouseup", dragEvents.onDragEnd);
            dragLastPoint.current = {x:event.pageX, y:event.pageY};
        },
    [dragEvents.onDragMove,dragEvents.onDragEnd]);

    return [offset.current, dragEvents];
};

export default useDrag;