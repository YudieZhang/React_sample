import React from "react";
import { judgeIsOrNotWin } from "../lib";
import PlayerDisplay from "./PlayerDisplay"
import "../scss/game.scss";
import { PLAYERS } from '../data';
const
    /**
     * row
     */
    ROW_COUNT = 6,
    /**
     * columns
     */
    COL_COUNT = 7;

/**
 * create origin data
 */
function crateGridArr(row, col) {
  let outData = [],
      rowData = [];
  for (let i = 0; i < col; i++) {
    rowData.push(0);
  }
  for (let i = 0; i < row; i++) {
    outData.push(rowData.concat());
  }
  return outData;
}

/**
 * cell
 */
function Square(props) {
  return (
      <label
          className={`square ${(props.value === 1) ? "player1" : "" } ${(props.value === 2) ? "player2" : "" }`}
          datarow={props.row}
          datacol={props.col}
      >
      </label>
  );
}


/**
 * connect-four
 */
class ConnectFour extends React.Component {
  constructor() {
    super();

    // Generate grid data，O:1，X:2
    this.state = {
      grid: crateGridArr(ROW_COUNT, COL_COUNT),
      steps: []
    };

    this.curUser = 1;
    this.gameOver = false;
    this.result = [];
    this.reSet = this.reSet.bind(this);
  }

  /**
   * play chess
   */
  handleClick(e) {
    let target = e.target;
    if (this.gameOver || !target.getAttribute("datarow")) {
      return;
    }

    let row = +target.getAttribute("datarow"),
        col = +target.getAttribute("datacol");
    if (this.state.grid[row][col] !== 0) {
      // The current cell is already in use
      return;
    }
    let data = this.state.grid.concat();
    data[row][col] = this.curUser;
    let result = judgeIsOrNotWin(data, row, col);
    this.setStaticState(result);
    this.setState({
      grid: data
    });
  }

  setCurUser(user) {
    if (user) {
      this.curUser = user;
      return;
    }
    this.curUser = this.curUser === 1 ? 2 : 1;
  }

  setStaticState(result, user) {
    this.result = [];
    if (result && result.length === 4) {
      this.gameOver = true;
      result.forEach(item => {
        this.result.push(`${item.x}-${item.y}`);
      });
    } else {
      this.gameOver = false;
    }
    if (this.gameOver) {
      setTimeout(() => {
        alert(`${PLAYERS[this.curUser-1].name} wins`)
      })
      return
    }
    this.setCurUser(user);
  }


  reSet() {
    this.setStaticState([], 1);
    this.setState({
      grid: crateGridArr(ROW_COUNT, COL_COUNT),
      steps: []
    });
  }

  render() {
    return (
        <div className="gomoku-box" onClick={e => this.handleClick(e)}>
          <PlayerDisplay curUser = {this.curUser} />
          <div className="game-box">
            <div className="square-box">
              {this.state.grid.map((row, i) => {
                return (
                    <div key={i} className="square-row">
                      {row.map((cell, j) => {
                        let key = `${i}-${j}`;
                        return (
                            <Square key={key} value={cell} row={i} col={j}/>
                        );
                      })}
                    </div>
                );
              })}
            </div>
          </div>
          <div className="center">
            <button className="restart" onClick={this.reSet}>Restart</button>
          </div>
        </div>
    );
  }
}

export default ConnectFour;
