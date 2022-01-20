import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import BreakTime from './clock/BreakTime';
import SessionTime from './clock/SessionTime';
import Timer from './clock/Timer';

const App = () => {
  const [currentSessionType, setCurrentSessionType] = useState("Session")
  const [currentBreakType, setCurrentBreakType] = useState("Break"); 
  const [intervalId, setIntervalId] = useState(null);
  const [displayTime, setDisplayTime] = useState(25 * 60);
  const [breakLength, setBreakLength] = useState(5 * 60);
  const [sessionLength, setSessionLength] = useState(25 * 60);
  const audioBeep = useRef(null);

//inline style
  const btnOperator = {
    fontSize: "2em",
    color: "#565454"
  }; 

  const incrementBreakLength = () => {
    const newIncrementBreakLength = breakLength + 60;
      newIncrementBreakLength <= 60 * 60 && setBreakLength(newIncrementBreakLength)
  };

  const decrementBreakLength = () => {
    const newDecrementBreakLength = breakLength - 60;
      newDecrementBreakLength > 0 && setBreakLength(newDecrementBreakLength); 
  }

  const incrementSessionLength = () => { 
    const newIncrementSessionLength = sessionLength + 60;
    newIncrementSessionLength <= 60 * 60 && setSessionLength(newIncrementSessionLength)
  }
  
  const decrementSessionLength = () => {
      const newDecrementSessionLength = sessionLength - 60;
      newDecrementSessionLength > 0 && setSessionLength(newDecrementSessionLength);
  };

  useEffect(() => {
    setDisplayTime(sessionLength);
  }, [sessionLength]);

  useEffect(() => {   
   if(displayTime === 0){
    audioBeep.current.play();
    if(currentSessionType === "Session") { 
       setCurrentSessionType("Break") 
       setDisplayTime(breakLength) 
    } else if(currentSessionType === "Break") {
        setCurrentSessionType("Session")
        setDisplayTime(sessionLength)  
    } else if(currentBreakType === "Break") {
        setCurrentBreakType("Session")
        setDisplayTime(sessionLength)
    }else if(currentBreakType === "Session")
        setCurrentBreakType("Break")
        setDisplayTime(breakLength)
   }

  }, [displayTime, currentSessionType, currentBreakType, sessionLength, breakLength]);

  const isStarted = intervalId !== null; 
  const handleStartStopClick = () => {
    if(isStarted) { 
        clearInterval(intervalId);
        setIntervalId(null); 
    } else { 
        const newIntervalId = setInterval(() => { 
            setDisplayTime(prevDisplayTime => prevDisplayTime - 1); 
            }, 1000); 
            setIntervalId(newIntervalId); 
        }   
  };

  const handleResetTimer = () => {
    audioBeep.current.load(); 
    setCurrentSessionType("Session"); 
    clearInterval(intervalId) 
    setIntervalId(null); 
    setDisplayTime(25 * 60); 
    setBreakLength(5 * 60); 
    setSessionLength(25 * 60); 
  };

  const timerTimeConvert = (displayTime) => {
    const minutes = Math.floor(displayTime/60); 
    const seconds = displayTime % 60;
    return `${(minutes < 10 ? "0" : "" )}${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`; 
  };

  const breakTimeConvert = (breakLength) => {
    const minutes = Math.floor(breakLength/60); 
    return `${(minutes < 10 ? "" : "")}${minutes}`;
  };
  
  const sessionTimeConvert = (sessionLength) => {
    const minutes = Math.floor(sessionLength/60); 
    return `${(minutes < 10 ? "" : "")}${minutes}`;
  };

  return ( 
    <div className="App">
      <header className="App-header">
      <div id="typing-container">
        <h2 id="typing-texts">25 + 5 Clock</h2> 
      </div>
        <span>
        <div className="length-sizing">
          <BreakTime 
            btnOperator={btnOperator}
            title={"Break Length"}
            type={"break"}
            breakLength={breakLength} 
            breakTimeConvert={breakTimeConvert}
            incrementBreakLength={incrementBreakLength} 
            decrementBreakLength={decrementBreakLength}
          />
          <SessionTime 
            btnOperator={btnOperator}
            title={"Session Length"}
            type={"session"}
            sessionLength={sessionLength}
            sessionTimeConvert={sessionTimeConvert}
            incrementSessionLength={incrementSessionLength}
            decrementSessionLength={decrementSessionLength}
          />
        </div>
        <div>
        <Timer 
            timerLabel={currentSessionType}
            handleStartStopClick={handleStartStopClick}
            startStopButton={isStarted ? "Stop" : "Start"}
            reset={"Reset"}
            handleResetTimer={handleResetTimer}
            displayTime={displayTime}
            sessionLength={sessionLength} 
            breakLength={breakLength}
            audioBeep={audioBeep}
            timerTimeConvert={timerTimeConvert}
            />
        </div>
        </span>
     
      <div id="signature">
               <div>
                  Designed and Coded by
                  <span id="name"> &copy;iPanzek </span>
               </div> 
        </div>
        </header>
        <div className="copyright">
               <div>
                <a href="http://ipanzek.com"> &copy; iPanzek </a>2021. All Rights Reserved!
               </div> 
        </div>
    </div>
  );
}

export default App;
