// Table.js - Container for Objects and tardisTables, also contains zooming and panning logic.

//import { useCallback } from "react";
import usePan from './usePan.js';

import './Table.css';

function Table(props) {
    const [position, onPanStart] = usePan();
    return (
        <div className='Table' onMouseDown={onPanStart}>
            {props.children}
            <p>{JSON.stringify(position)}</p>
        </div>
    );
}

export default Table;