// Token.js

import useObject from "../useObject.js";

import testImage from "../../../assets/test_svg.svg";

function Token() {

    const [transform, objectMethods, objectEvents] = useObject();

    return (
        <>
            {/*Note that the draggable attribute is part of HTML specification. (Not useDrag.js)*/}
            <img src={testImage} onMouseDown={objectEvents.onMouseDown} draggable={false} alt="" style={{
                position:"absolute",
                left:`${transform.x}px`,
                top:`${transform.y}px`,
                transform:`translate(-50%,-50%)`
            }}/>
        </>
    );
};

export default Token;