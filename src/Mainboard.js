import React, { Component } from 'react';
import Square from './Square';
import './App.css';

class Mainboard extends Component{
  render(){
    return(
      <div>
        <h1>Word Boggle !!</h1>
        <div class="squarecontainer">
          <div class="row">
          <Square value="Q"/>
          <Square value="B"/>
          <Square value="A"/>
          <Square value="S"/>
          </div>
            <div class="row">
            <Square value="Q"/>
            <Square value="B"/>
            <Square value="A"/>
            <Square value="S"/>
            </div>
            <div class="row">
            <Square value="Q"/>
            <Square value="B"/>
            <Square value="A"/>
            <Square value="S"/>
            </div>
            <div class="row">
            <Square value="Q"/>
            <Square value="B"/>
            <Square value="A"/>
            <Square value="S"/>
            </div>
          </div>
      </div>
    );
  }

}

export default Mainboard;
