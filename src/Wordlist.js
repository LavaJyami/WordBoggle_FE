import React, { Component } from 'react';

class Wordlist extends Component{
  render(){
    return(
      <div id="wordList">
      <ul className = "wordList">
        {this.props.value.map(item => (
          <li key={item}>{item}</li>
        ))}
          </ul>
          </div>
      );

  }
}

export default Wordlist;
