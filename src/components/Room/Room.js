// Room.js - container for Tables and handling multi-player logic.

function Room(props) {
    return (
        <div className='Room'>
            {props.children}
        </div>
    );
};

export default Room;