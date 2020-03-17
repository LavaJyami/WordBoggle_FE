import React, { Component } from 'react';
import Mainboard from './Mainboard';
import Wordlist from './Wordlist';
import Timer from './Timer';

class GameBoard extends Component {
  constructor(props){
    super(props);
    this.state = {
      word: '',
      approvedWords: [],
      error: '',
      board: [['E',"T","N","A"],["D","Z","E","E"],["L","O","U","R"],["S","T","O","P"]]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({word: event.target.word});
  }

  validate(word){
    const board = this.state.board;
    const currentWord = word.toLowerCase();
    var visited = [[1,1]];
    if(this.state.approvedWords.includes(currentWord))
      return false;
      // console.log(!this.isOutOfBounds(3,0,3,'rt') && !this.isRepeated(visited,2,0) && board[3][1].toLowerCase()===word[1]);
      for(let i=0;i<board.length;i++){
          for(let j=0;j<board[0].length;j++){
              if(board[i][j].toLowerCase() === currentWord[0].toLowerCase())
              if(this.depthFirstSearch(i, j, board, currentWord))
              return true;
          }
      }
    return false;
  }

  depthFirstSearch(i, j, board, word){
    let visited = [];
    let approvedLetters = [[i,j]];
    let wordLength = word.length;
    const boardDim = board.length;
    var k = 1;
    var value = '';
    var foundFlag  = false;
    var unchecked_sibling_pos = 0;

    while(k<=wordLength){
      if(!this.isOutOfBounds(i,j,boardDim-1,'tp') && !this.isRepeated(approvedLetters,i-1,j) && board[i-1][j].toLowerCase()===word[k]){
        visited.push([i-1,j]); approvedLetters.push([i-1,j]);foundFlag = true;
      }
      if(!this.isOutOfBounds(i,j,boardDim-1,'tr') && !this.isRepeated(approvedLetters,i-1,j) && board[i-1][j+1].toLowerCase()===word[k]){
        visited.push([i-1,j+1]); approvedLetters.push([i-1,j+1]); foundFlag = true;
      }
      if(!this.isOutOfBounds(i,j,boardDim-1,'rt') && !this.isRepeated(approvedLetters,i,j+1) && board[i][j+1].toLowerCase()===word[k]){
        visited.push([i,j+1]); approvedLetters.push([i,j+1]); foundFlag = true;
        }
      if(!this.isOutOfBounds(i,j,boardDim-1,'br') && !this.isRepeated(approvedLetters,i+1,j+1) && board[i+1][j+1].toLowerCase()===word[k]){
        visited.push([i+1,j+1]);approvedLetters.push([i+1,j+1]); foundFlag = true;
        }
      if(!this.isOutOfBounds(i,j,boardDim-1,'bt') && !this.isRepeated(approvedLetters,i+1,j) && board[i+1][j].toLowerCase()===word[k]){
        visited.push([i+1,j]); approvedLetters.push([i+1,j]); foundFlag = true;
        }
      if(!this.isOutOfBounds(i,j,boardDim-1,'bl') && !this.isRepeated(approvedLetters,i+1,j-1) && board[i+1][j-1].toLowerCase()===word[k]){
        visited.push([i+1,j-1]); approvedLetters.push([i+1,j-1]);foundFlag = true;
        }
      if(!this.isOutOfBounds(i,j,boardDim-1,'lt') && !this.isRepeated(approvedLetters,i,j-1) && board[i][j-1].toLowerCase()===word[k]){
        visited.push([i,j-1]);approvedLetters.push([i,j-1]); foundFlag = true;
        }
      if(!this.isOutOfBounds(i,j,boardDim-1,'tl') && !this.isRepeated(approvedLetters,i-1,j-1) && board[i-1][j-1].toLowerCase()===word[k]){
        visited.push([i-1,j-1]); approvedLetters.push([i-1,j-1]);foundFlag = true;
        }

        if(k==wordLength){
          return true;
        }
        if(visited.length>0){
            if(foundFlag){
                unchecked_sibling_pos = k;
                k++;
            }
            else{
                k = unchecked_sibling_pos;
                k++;
            }
             value = visited.pop(); i = value[0]; j = value[1]; foundFlag=false;
        }
        else {
            return false;
        }
      }
  }
  isRepeated(visited,i,j){
    for(let k=0; k<visited.length;k++){
      if(visited[k][0]===i && visited[k][1]===j ){
        return true;
      }
    }
    return false;
  }
  isOutOfBounds(i, j, boardDim, direction){
    if(direction === 'tp' && i-1<0)
      return true;
    else if(direction === 'tr' && (i-1<0 || j+1>boardDim))
      return true;
    else if(direction === 'rt' &&  j+1>boardDim)
      return true;
    else if(direction === 'br' && (i+1>boardDim || j+1>boardDim))
      return true;
    else if(direction === 'bt' && i+1>boardDim)
      return true;
    else if(direction === 'bl' && (i+1>boardDim || j-1<0))
      return true;
    else if(direction === 'lt' && j-1<0)
      return true;
    else if(direction === 'tl' && (i-1<0 || j-1<0))
      return true;
    else
      return false;

  }


  handleSubmit(event){
    let word = event.target[0].value;
    if(this.validate(word) === true) {
        this.setState({error: ''});
        this.setState(previousState => ({
        approvedWords: [...previousState.approvedWords, word]}));
        this.setState({word: ''});
        event.target[0].value = this.state.word;
    }
    else {
        this.setState({error: 'invalid!!'});
        this.setState({word: ''});
        event.target[0].value = this.state.word;
    }
    event.preventDefault();
  }
  render(){
    const {word, approvedWords, error, board} = this.state;
    return(
      <div id="mainboard">
            <div className = "boards">
                <div>
                    <Mainboard value = {board}/>
                    <form id="input_box" onSubmit={this.handleSubmit}>
                        <input
                        type="text"
                        onChange={this.handleChange}
                        value={word}
                        placeholder="enter word"
                        />
                        <input
                        className = "addButton"
                        type="submit"
                        value="Add +"
                        />
                    </form>
                    <p className = "error">{error}</p>
                </div>
                <div>
                    <Wordlist value = {approvedWords}/>
                    <button className = "gameSubmit"> Submit Game </button>
                    <Timer duration = {5} />
                </div>
            </div>
      </div>
    );
  }
}

export default GameBoard;
