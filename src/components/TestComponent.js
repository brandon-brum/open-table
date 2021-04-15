import { useCallback, useState } from 'react';

function TestHook() {
    const [counter, setCounter] = useState(0)

    let onMouseClick = useCallback( event => {
        console.log('click')
        setCounter( count => ++count)
    }, [setCounter])

    return [counter,onMouseClick]
}

function Test() {

    const [counter,onMouseClick] = TestHook()

    return (
        <h1 onClick={onMouseClick}>Hello World {counter}</h1>
    )
};

export default Test;