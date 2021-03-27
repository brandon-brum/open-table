// useZoom.js - Hook for zooming into and out of a React element.

import {
    useCallback, useRef, useState
} from 'react';

function useZoom() {
    const [scale,setScale] = useState(1);
    const MIN_ZOOM = 0.1
    const MAX_ZOOM = 4

    //const panLastPoint = useRef({x:0,y:0});

    const onZoomWheel = useCallback(
        event => {
            setScale(scale => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.round(10 * (scale + (event.deltaY * -0.001)))/10)))
        },
    []);

    return [scale, onZoomWheel];
};

export default useZoom;
