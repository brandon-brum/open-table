// useMouseCoordinates - Hook for getting the mouse's current coordinates (pageX, pageY).

import {
    useCallback, useRef, useState
} from 'react';

function useMouseCoordinates() {
    const [mousePosition,setMousePosition] = useState({x:0,y:0});

    const onMouseMove = useCallback(
        event => {
            setMousePosition({x:event.clientX,y:event.clientY})
        }
    );

    return [mousePosition,onMouseMove];
}

export default useMouseCoordinates;