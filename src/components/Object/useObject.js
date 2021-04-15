// useObject.js - Initializing useDrag hook, and object properties

import { useState, useCallback, useEffect } from "react";

import useDrag from "./useDrag.js";

function useObject() {

    // CREATE AN ISOLATED CASE OF THE BUG


    const [transform,setTransform] = useState({x:20,y:20,z:0});

    const [dragOffset, dragEvents] = useDrag();

    const objectEvents = {};

    objectEvents.onMouseDrag = event => {
        dragEvents.onDragMove(event)
        setTransform(transform => {
            console.log({
                x:event.pageX,
                y:event.pageY,
                z:transform.z
            })
            return {
                x:event.pageX,
                y:event.pageY,
                z:transform.z
            }
        });
    }

    objectEvents.onMouseUp = event => {
        document.removeEventListener('mousemove', objectEvents.onMouseDrag);
        document.removeEventListener('mouseup', objectEvents.onMouseUp);
    }

    objectEvents.onMouseDown =  event => {
        document.addEventListener('mousemove', objectEvents.onMouseDrag);
        document.addEventListener('mouseup', objectEvents.onMouseUp)
        dragEvents.onDragStart(event);
        event.stopPropagation();
    }

    const objectMethods = {};

    return [transform, objectMethods, objectEvents];
};

export default useObject;