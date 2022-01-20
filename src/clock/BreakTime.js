
import React from 'react';

const BreakTime = ({
    title, 
    btnOperator,
    breakLength, 
    breakTimeConvert,
    incrementBreakLength, 
    decrementBreakLength
}) => {

    return(
        <div>   
           <h5 id="break-label">{title}</h5> 
           <div className="length-sizing">
                <button 
                    id="break-increment" 
                    onClick={incrementBreakLength}>
                    <span style={btnOperator}> 
                    + 
                    </span>
                </button> 
                <span 
                    id="break-length">{breakTimeConvert(breakLength)}
                </span>
                <button 
                    id="break-decrement" 
                    onClick={decrementBreakLength}>
                    <span style={btnOperator}> 
                    - 
                    </span>
                </button>
            </div>
        </div>
    )
}

export default BreakTime;