import {
    useCallback
} from 'react'

function usePan() {
    const onPanMove = useCallback(
        event => {
            
        },
    );
    
    const onPanEnd = useCallback(
        event => {
            document.removeEventListener('mousemove', onPanMove)
            document.removeEventListener('mouseup', onPanEnd)
        },
    [onPanMove, onPanEnd]);
    
    const onPanStart = useCallback(
        event => {
            document.addEventListener('movemove', onPanMove);
            document.addEventListener('mouseup', onPanEnd);
        },
    [onPanMove,onPanEnd]);
}

export default usePan;
