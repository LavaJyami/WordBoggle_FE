import React, { Component } from 'react';
import Mainboard from './Mainboard';
import Wordlist from './Wordlist';

class GameBoard extends Component {
  constructor(props){
    super(props);
    this.state = {
      word: '',
      approvedWords: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event){
      console.log(event.target.value);
    this.setState({word: event.target.word});
  }
  handleSubmit(event){
  let word = event.target[0].value;
  this.setState(previousState => ({
  approvedWords: [...previousState.approvedWords, word]}));
  this.setState({word: ''});
  event.preventDefault();
  }
  render(){
    return(
    <div id="mainboard">
      <div className = "boards">
      <div>
        <Mainboard />
        <form id="input_box" onSubmit={this.handleSubmit}>
          <input  type="text"  onChange={this.handleChange}  value={ this.state.word } placeholder="enter word"/>
          <input  className = "addButton"type="submit" value="Add +" />
        </form>
        </div>
        <Wordlist value = {this.state.approvedWords}/>
      </div>
    </div>
    );
  }
}

export default GameBoard;
