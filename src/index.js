import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import Form from './Form'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

/*ReactDOM.render(
  <React.StrictMode>
    <app />
  </React.StrictMode>,
  document.getElementById('root')
);*/

var element=React.createElement('h1',{className:'greating'},'Hello, world!');
ReactDOM.render(element,document.getElementById('root'));


function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }
  
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Form />,
  document.getElementById('root')
);

function Test() {
  return (
    <h2 className="test">Test</h2>
  )
}


function Home() {
  return (
    <h2 className="test">Home</h2>
  )
}

function Test2() {
  return (
    <h2>Test2</h2>
  )
}

function Default() {
  return (<Router>
    <div>
      
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/test">Test</Link>
          </li>
          <li>
            <Link to="/test2">Test2</Link>
          </li>
        </ul>
      

      <Switch>
        <Route path="/test">
          <Test />
        </Route>
        <Route path="/test2">
          <Test2 />
        </Route>
        <Route path="/">
        </Route>
      </Switch>
    </div>
  </Router>
);
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class NameForm extends React.Component{
  constructor(pros){
    super(pros);
    this.state={value:''};

    this.handelChange=this.handelChange.bind(this);
    this.handelSubmit=this.handelSubmit.bind(this);
  }
  handelChange(event){
    this.setState({value:event.target.value});
  }

  handelSubmit(event){
    alert('A name was submitted:'+this.state.value);
    event.preventDefault();
  }
  render(){
    return(
      <p>
  <form onSubmit={this.handelSubmit}>
<label>
  
Name:<input type="text" value={this.state.value} onChange={this.handelChange}/>
</label>
<input type="submit" value="Submit"/>
</form>
</p>
    );
}
}


/*ReactDOM.render(
  <NameForm />,
  document.getElementById('root')
);*/


class TextForm extends React.Component{
  constructor(props){
    super(props);
    this.state={ 
      value:'Think fine Always Shine'};

      this.handelChange=this.handelChange.bind(this);
      this.handelSubmit=this.handelSubmit.bind(this);
    }

    handelChange(event){
      this.setState({value:event.target.value});
    }

    handelSubmit(event){
      alert('a simple text:'+this.state.value);
      event.preventDefault();
    }

    render(){
      return(
        <p>
        <form onSubmit={this.handelSubmit}>
          <label>
            Text:
            <textarea value={this.state.value} onChange={this.handelChange}/>
            </label>
            <input type="submit" value="Submit"/>
            </form>
            </p>
      );
    }
  }

/*ReactDOM.render(
  <TextForm />,
  document.getElementById('root')
);*/






// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
