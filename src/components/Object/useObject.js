// useObject.js - Initializing useDrag hook, and object properties

import { useState, useCallback } from "react";

import useDrag from "./useDrag.js";

function useObject() {
    const [transform,setTransform] = useState({x:0,y:0,z:0});

    const [dragOffset, dragEvents] = useDrag();

    

    const objectEvents = {};

    objectEvents.onMouseDown = useCallback( event => {
        document.addEventListener('mousemove', objectEvents.onMouseDrag);
        document.addEventListener('mouseup', objectEvents.onMouseUp)
        dragEvents.onDragStart(event);
        event.stopPropagation();
    });

    objectEvents.onMouseUp = useCallback ( event => {
        document.removeEventListener('mousemove', objectEvents.onMouseDrag);
        document.removeEventListener('mouseup', objectEvents.onMouseUp);
    })

    objectEvents.onMouseDrag = useCallback( event => {
        dragEvents.onDragMove(event)
        setTransform(transform => {
            console.log(dragOffset)
            transform.x = transform.x + dragOffset.x;
            transform.y += dragOffset.y;
            return transform;
        });
    });

    const objectMethods = {};

    return [transform, objectMethods, objectEvents];
};

export default useObject;