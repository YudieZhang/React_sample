import React  from 'react';
import ReactDOM from 'react-dom';
import ConnectFour from "./components/connectFour";
import "./scss/game.scss";
import Header from "./components/Header";


const Main = () => {
  return (
    <div className="Page">
     <Header/>
    <div className="game-box">
        <ConnectFour />
    </div>
    </div>
  );
};

const container = document.getElementById('root');
ReactDOM.render(<Main />, container);
