import React, { Component } from 'react';
import Mainboard from './Mainboard';
import Wordlist from './Wordlist';

class GameBoard extends Component {
  constructor(props){
    super(props);
    this.state = {word: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event){
      console.log(event.target.value);
    this.setState({word: event.target.word});
  }
  handleSubmit(event){
    event.preventDefault();
    //what do do when submitted??
    //make a component that will accept the word as acomponent and dispay the words there
  }
  render(){
    return(
    <div id="mainboard">
      <div className = "boards">
      <div>
        <Mainboard />
        <form id="input_box" onSubmit={this.handleSubmit}>
          <input  type="text"  onChange={this.handleChange}  value={ this.state.word } placeholder="enter word"/>
          <input  type="submit" value="Submit" />
        </form>
        </div>
        <Wordlist/>
      </div>


    </div>
    );
  }
}

export default GameBoard;
