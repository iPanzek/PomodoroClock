import React from 'react';

const SessionTime = ({
    title,
    btnOperator,
    sessionTimeConvert,
    sessionLength,
    incrementSessionLength, 
    decrementSessionLength,}) => {
    
    return(
        <div>   
            <h5 id="session-label">{title}</h5> 
            <div className="length-sizing">
                <button 
                    id="session-increment" 
                    onClick={incrementSessionLength}>
                    <span style={btnOperator}> 
                    + 
                    </span>
                </button> 
                <span 
                    id="session-length">{sessionTimeConvert(sessionLength)}
                </span>
                <button 
                    id="session-decrement" 
                    onClick={decrementSessionLength}>
                    <span style={btnOperator}>
                    -
                    </span>
                </button>
            </div>
        </div>
    )
}

export default SessionTime;