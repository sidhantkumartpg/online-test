import React, { useState } from 'react';

const Testing = () => {

    const [text, setText] = useState(false);

    function toggleText() {
        setText(!text);
    }

    return ( 
        <>
            <input type='radio' checked={false} name='ques'/>
        </>
     );
}
 
export default Testing;