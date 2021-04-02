// Table.js - Container for Objects and tardisTables, also contains zooming and panning logic.

import usePanZoom from "./usePanZoom.js";

import "./Table.css";

function Table(props) {
    const [transform, events] = usePanZoom()
    const position = transform.position;
    const scale = transform.scale;

    return (
        <>
        
        <div className="Table" onMouseDown={events.onPanStart} onWheel={events.onWheelZoom} >
            <div className="Surface" style={{
                transform:`scale(${transform.scale})`,
                position:"absolute",
                left:`${-position.x}px`,
                top:`${position.y}px`,
                transformOrigin:`top left`,
                backgroundSize:`${1/scale}`
            }}>
                {props.children}
            </div>
        </div>
        <p id="debug">{`x: ${position.x.toFixed(0)} y: ${position.y.toFixed(0)} scale: ${scale}`}</p>
        </>
    );
};

export default Table;