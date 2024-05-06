import React from "react";
import { GameState } from "../Pages/TicTokToe";

interface LogProps {
  turns: GameState[];
}

const Log: React.FC<LogProps> = ({ turns }) => {
  return (
    <ul className="flex flex-col mt-10">
      {turns.map(({ player, square }, index) => (
        <li key={index}>
          {player} selected {square.row}, {square.col}
        </li>
      ))}
    </ul>
  );
};

export default Log;
