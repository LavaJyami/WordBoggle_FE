import React, { Component } from 'react';
import Mainboard from './Mainboard';
import Wordlist from './Wordlist';
import Score from './Score';

class GameBoard extends Component {
  constructor(props){
    super(props);

    this.state = {
      word: '',
      approvedWords: [],
      error: '',
      board: [[''," "," "," "],[" "," "," "," "],[" "," "," "," "],[" "," "," "," "]],
      time: {},
      seconds: 9,
      score: 0,
      validityData: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateWordAPI = this.validateWordAPI.bind(this);
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.startGame = this.startGame.bind(this);
    this.playAgain = this.playAgain.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  handleChange(event){
    this.setState({word: event.target.word});
  }

  validate(word){
    const board = this.state.board;
    const currentWord = word.toLowerCase();
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
    let stack = [];
    let approvedLetters = [[i,j]];
    let wordLength = word.length;
    const boardDim = board.length;
    var k = 1;
    var value = [];
    var foundFlag  = false;
    var lettersFound = 0;
    var unchecked_branch = 0;

    while(k<=wordLength){

      if(!this.isOutOfBounds(i,j,boardDim-1,'tp') && !this.isRepeated(approvedLetters,i-1,j) && board[i-1][j].toLowerCase()===word[k]){
        stack.push([i-1,j]); foundFlag = true; lettersFound++;
      }
      if(!this.isOutOfBounds(i,j,boardDim-1,'tr') && !this.isRepeated(approvedLetters,i-1,j) && board[i-1][j+1].toLowerCase()===word[k]){
        stack.push([i-1,j+1]);  foundFlag = true; lettersFound++;
      }
      if(!this.isOutOfBounds(i,j,boardDim-1,'rt') && !this.isRepeated(approvedLetters,i,j+1) && board[i][j+1].toLowerCase()===word[k]){
        stack.push([i,j+1]);  foundFlag = true; lettersFound++;
        }
      if(!this.isOutOfBounds(i,j,boardDim-1,'br') && !this.isRepeated(approvedLetters,i+1,j+1) && board[i+1][j+1].toLowerCase()===word[k]){
        stack.push([i+1,j+1]); foundFlag = true; lettersFound++;
        }
      if(!this.isOutOfBounds(i,j,boardDim-1,'bt') && !this.isRepeated(approvedLetters,i+1,j) && board[i+1][j].toLowerCase()===word[k]){
        stack.push([i+1,j]);  foundFlag = true; lettersFound++;
        }
      if(!this.isOutOfBounds(i,j,boardDim-1,'bl') && !this.isRepeated(approvedLetters,i+1,j-1) && board[i+1][j-1].toLowerCase()===word[k]){
        stack.push([i+1,j-1]); foundFlag = true; lettersFound++;
        }
      if(!this.isOutOfBounds(i,j,boardDim-1,'lt') && !this.isRepeated(approvedLetters,i,j-1) && board[i][j-1].toLowerCase()===word[k]){
        stack.push([i,j-1]); foundFlag = true; lettersFound++;
        }
      if(!this.isOutOfBounds(i,j,boardDim-1,'tl') && !this.isRepeated(approvedLetters,i-1,j-1) && board[i-1][j-1].toLowerCase()===word[k]){
        stack.push([i-1,j-1]); foundFlag = true; lettersFound++;
        }

        if(!foundFlag && stack.length === 0) {
            return false;
        }

        if(foundFlag && lettersFound === 1){
          k++;
          if(k === wordLength)
          return true;
          value = stack.pop();i = value[0]; j = value[1]; foundFlag=false; lettersFound = 0;
          approvedLetters.push(value);
        }
         else if(foundFlag && lettersFound> 1){
          unchecked_branch = k+1;
          k++;
          if(k === wordLength)
          return true;
          value = stack.pop();i = value[0]; j = value[1]; foundFlag=false; lettersFound = 0;
          approvedLetters.push(value);
        }
         else if(!foundFlag && stack.length>0){
          k = unchecked_branch;
          const number_of_items_to_backtrack = approvedLetters.length - (k-1);
          for(let l=0;l<number_of_items_to_backtrack;l++){
            approvedLetters.pop();

          }
          value = stack.pop();i = value[0]; j = value[1]; lettersFound = 0;
          approvedLetters.push(value);
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

  handleIncomingData(data){
    if(data.length>0)
    return true;
    else
    return false;
  }

  async validateWordAPI(event){
        event.preventDefault();
    const word = event.target[0].value;
    const key = 'dict.1.1.20200319T090129Z.8eb6b755e125a705.7fd9b9cb85a09a0dd9c47a86bb564c856893cafc';
    const response = await fetch(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=en-ru&text=${word}`);
    const data = await response.json();
    if(data.def.length>0){
      if(this.validate(word) === true ) {
          this.setState({error: ''});
          this.setState(previousState => ({
          approvedWords: [...previousState.approvedWords, word]}));
          this.setState({word: ''});
          // event.target[0].value = this.state.word;
      }
      else {
          this.setState({error: 'invalid!!'});
          this.setState({word: ''});
          // event.target[0].value = this.state.word;
      }
    }
    else {
        this.setState({error: 'invalid!!'});
        this.setState({word: ''});
        // event.target[0].value = this.state.word;
    }

    // return data;
  }


  //Timer related functions
  secondsToTime(secs){
      let hours = Math.floor(secs / (60 * 60));

      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);

      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds);

      let obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
      };
      return obj;
    }

  startTimer() {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds === 0) {
      this.endGame();
      clearInterval(this.timer);
      this.timer = 0;
    }
  }

  componentDidMount() {
    this.startGame();
  }

    startGame() {
    var board = this.getNewGame();
    this.setState({board: board});

    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });

    this.startTimer();
    }

    getNewGame(){
      return([['E',"T","N","A"],["D","Z","E","E"],["L","O","U","R"],["S","T","O","P"]]);
    }

  endGame(){
    this.setState({
      board: [['','','',''],['','','',''],['','','',''],['','','','']],
      approvedWords: [],
      seconds: 9
      });
  }

  playAgain(){
    this.startGame();
  }




  render(){

    const {word, approvedWords, error, board} = this.state;
    return(

      <div id="mainboard">
            <div className = "boards">
                <div>
                    <Mainboard value = {board}/>

                    <form id="input_box" onSubmit={this.validateWordAPI}>
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
                    <div>
                      <button
                      onClick={this.playAgain}
                      >Play Again
                      </button>

                    </div>
                  </div>

                  <div>
                      <div id="timer">
                        Time remaining: {this.state.time.m} : {this.state.time.s}
                      </div>
                      <Wordlist value = {approvedWords}/>
                      <Score words={approvedWords} />

                  </div>
            </div>
      </div>


    );
  }
}

export default GameBoard;
