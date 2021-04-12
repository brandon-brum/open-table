// useObject.js - Initializing useDrag hook, and object properties

import { useState, useCallback, useEffect } from "react";

import useDrag from "./useDrag.js";

function useObject() {

    // CREATE AN ISOLATED CASE OF THE BUG


    const [transform,setTransform] = useState({x:0,y:0,z:0});

    const [dragOffset, dragEvents] = useDrag();

    const objectEvents = {};

    objectEvents.onMouseDrag = useCallback( event => {
        dragEvents.onDragMove(event)
        setTransform(transform => {
            
            transform.x += dragOffset.x + 10;
            transform.y += dragOffset.y + 10;
            console.log(transform)
            return transform;
        });
    }, []);

    objectEvents.onMouseUp = useCallback( event => {
        document.removeEventListener('mousemove', objectEvents.onMouseDrag);
        document.removeEventListener('mouseup', objectEvents.onMouseUp);
    }, [objectEvents.onMouseDrag, objectEvents.onMouseUp])

    objectEvents.onMouseDown = useCallback( event => {
        document.addEventListener('mousemove', objectEvents.onMouseDrag);
        document.addEventListener('mouseup', objectEvents.onMouseUp)
        dragEvents.onDragStart(event);
        event.stopPropagation();
    }, [objectEvents.onMouseDrag, objectEvents.onMouseUp, dragEvents]);

    useEffect( () => {
        console.log('render')
    }, [])

    const objectMethods = {};

    return [transform, objectMethods, objectEvents];
};

export default useObject;