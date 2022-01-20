import React from "react"

const Timer = ({
    timerLabel, 
    timerTimeConvert,
    handleStartStopClick, 
    startStopButton, 
    displayTime, 
    handleResetTimer, 
    reset, 
    audioBeep
}) => {    

    return(
        <div> 
            <div className="session-counter">
                <div>
                    <span id="timer-label">{timerLabel}</span>
                </div>
                    <div 
                        className="timer-text" 
                        id="time-left">{<h1>{timerTimeConvert(displayTime)}</h1>}
                    </div>
                </div>

                <div className="session-player">
                    <button 
                        id="start_stop"  onClick={handleStartStopClick}> {startStopButton} || 
                    </button>
                    <button 
                        id="reset" onClick={handleResetTimer}>{reset} [ ]
                    </button>
                    <audio data-testid="audio" id="beep" ref={audioBeep}>
                        <source src="//onlineclock.net/audio/options/default.mp3" type="audio/mpeg"></source>
                    </audio>
                </div> 
        </div>
    )
}

export default Timer;