/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import viteLogo from "/vite.svg";
import { GameBoard } from "../Components/GameBoard";
import Players from "../Components/Players";
import Log from "../Components/Log";
import { WINNING_COMBINATIONS } from "../Components/WinnerCombination";
import { Winner } from "../Components/winner";

export interface GameState {
  square: {
    row: number;
    col: number;
  };
  player: string;
}

const PLAYER = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_LIST = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export function DerivedStateCode(gameTurn: GameState[]) {
  let currentPlayer: string = "X";
  if (gameTurn && gameTurn.length > 0 && gameTurn[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

export function DeriveWinning(gameShow: any[][], player: any) {
  for (const combination of WINNING_COMBINATIONS) {
    const [firstCell, secondCell, thirdCell] = combination;
    const firstValue = gameShow[firstCell.row][firstCell.column];
    const secondValue = gameShow[secondCell.row][secondCell.column];
    const thirdValue = gameShow[thirdCell.row][thirdCell.column];

    // Check if all cells are non-null and have the same value
    if (firstValue && firstValue === secondValue && firstValue === thirdValue) {
      // If all cells match, assign the winner
      return player[firstValue];
    }
  }
  return null;
}

export function DeriveGameTurn(gameTurn: any) {
  const gameShow: any = INITIAL_LIST.map((array) => [...array]);

  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;

    gameShow[row][col] = player;
  }
  return gameShow;
}

export default function TicTokToe() {
  const [player, setPlayers] = useState(PLAYER);
  const [gameTurn, setGameTurn] = useState<any>([]);
  const activePlayer = DerivedStateCode(gameTurn);
  const gameShow = DeriveGameTurn(gameTurn);
  const winner = DeriveWinning(gameShow, player);

  const handleClickSelect = (rowIndex: number, colIndex: number) => {
    setGameTurn((prevState: GameState[]) => {
      const currentPlayer = DerivedStateCode(prevState);
      const updatedState = [
        {
          square: {
            row: rowIndex,
            col: colIndex,
          },
          player: currentPlayer,
        },
        ...prevState,
      ];
      return updatedState;
    });
  };

  const handleRestart = () => {
    setGameTurn([]);
  };

  const handleChangeName = (symbol: string, newName: string) => {
    setPlayers((prevState) => ({
      ...prevState,
      [symbol]: newName,
    }));
  };

  const hasDraw = gameTurn.length === 9 && !winner;
  return (
    <div className="flex items-center flex-col">
      <img src={viteLogo} className="logo" alt="Vite logo" />
      <h1>Tik Toc Toe</h1>
      <menu className="mt-10">
        <ol className="flex items-center gap-10">
          <Players
            name={PLAYER.X}
            symbol={"X"}
            isActive={activePlayer === "X"}
            onChangeName={handleChangeName}
          />
          <Players
            name={PLAYER.O}
            symbol={"O"}
            isActive={activePlayer === "O"}
            onChangeName={handleChangeName}
          />
        </ol>
      </menu>
      {(winner || hasDraw) && (
        <Winner winner={winner} reStart={handleRestart} />
      )}
      <GameBoard handleClickSelect={handleClickSelect} board={gameShow} />
      <Log turns={gameTurn} />
    </div>
  );
}
