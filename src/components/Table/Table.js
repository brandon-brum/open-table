// Table.js - Container for Objects and tardisTables, also contains zooming and panning logic.

import { useCallback } from "react";

function Table() {

    return (
        <div className='Table' onMouseDown={onPanStart}>
            {props.children}
        </div>
    );
}

export default Table;