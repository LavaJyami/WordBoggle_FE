import React, { Component } from 'react';

class Timer extends Component{
constructor(props){
  super(props);
  this.state = {
    count: this.props.duration
  }
}
startTimer(){
  this.timeRemaining = setInterval( () => {
    if(this.state.count !== 0){
    this.setState(prevState => ({
      count: prevState.count - 1
    }))}
  }, 1000);
}
componentWillUnmount(){
  clearInterval(this.timeRemaining);
}
render(){
  this.startTimer();
  const {count} = this.state;
  return(
    <div id="timer">
        <p>Time Remaining: {count}</p>
    </div>
  );
}
}
export default Timer;
