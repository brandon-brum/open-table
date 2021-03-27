// usePan.js - Hook for panning around a React element.

import {
    useCallback, useRef, useState
} from 'react';

function usePan() {
    const [position,setPosition] = useState({x:0,y:0});

    const panLastPoint = useRef({x:0,y:0});

    const onPanMove = useCallback(
        event => {
            const lastPoint = panLastPoint.current;
            const point = {x:event.pageX, y:event.pageY};
            const offset = {x:lastPoint.x - point.x, y:lastPoint.y - point.y};
            console.log(offset)
            setPosition({x:position.x + offset.x, y:position.y - offset.y});
        },
    [setPosition, position]);
    
    const onPanEnd = useCallback(
        event => {
            document.removeEventListener('mousemove', onPanMove);
            document.removeEventListener('mouseup', onPanEnd);
        },
    [onPanMove]);
    
    const onPanStart = useCallback(
        event => {
            document.addEventListener('mousemove', onPanMove);
            document.addEventListener('mouseup', onPanEnd);
            panLastPoint.current = {x:event.pageX, y:event.pageY}
        },
    [onPanMove,onPanEnd]);

    return [position, onPanStart];
};

export default usePan;
