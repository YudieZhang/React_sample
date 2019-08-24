
import React from 'react';
import "../scss/game.scss";
import { PLAYERS } from '../data';

interface Props {
  curUser: number;
}

const PlayerDisplay = ({ curUser }: Props) => (
  <div className="player-bar">
    {PLAYERS.map((player, i) => (
        <label key={player.name} className={`${curUser === i + 1 ? 'active' : '' }`}>{player.name}</label>
    ))}
  </div>
);

export default PlayerDisplay;
