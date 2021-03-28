// useMouseCoordinates - Hook for getting the mouse's current coordinates (pageX, pageY).

import {
    useCallback, useRef, useState
} from 'react';

function useMouseCoordinates() {
    const mousePosition = useRef({x:0,y:0});

    const onMouseMove = useCallback(
        event => {
            mousePosition.current = {x:event.pageX,y:event.pageY}
        }
    );

    return [mousePosition.current,onMouseMove];
}

export default useMouseCoordinates;