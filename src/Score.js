import React, { Component } from 'react';

class Score extends Component {
  constructor(props){
    super(props);
    this.state = {
      score: 0
    }
  }
  showScore(){
    var length = this.props.words.length;
    var totalScore = 0;
    if(length > 0){
      for(let i=0;i<length;i++){
        totalScore = totalScore + this.props.words[i].length;
      }
      return totalScore;
    }
    else
    return 0;
  }
  render(){
    return(
      <div id="score">
        Score: {this.showScore()}
      </div>
    );
  }
}

export default Score;
