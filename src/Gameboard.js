import React, { Component } from 'react';
import Mainboard from './Mainboard';

class GameBoard extends Component {
  render(){
    return(
    <div id="mainboard">
      <Mainboard />
      <form id="input_box">
          <label>
            Enter Word
            <input class="textbox" type="text" name="name" />
          </label>
          <input class="submit_button" type="submit" value="Submit" />
      </form>
    </div>
    );
  }
}

export default GameBoard;
