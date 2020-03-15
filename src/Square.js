import React, { Component } from 'react';
import './App.css';

class Square extends Component {
  render(){
    return(
      <div class="square" >
        {this.props.value}
      </div>
    );
  }
}

export default Square;
