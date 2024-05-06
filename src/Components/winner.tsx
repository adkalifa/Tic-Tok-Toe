type WinnerProps = {
  winner: string | null;
  reStart: () => void;
};

export function Winner({ winner, reStart }: WinnerProps) {
  return (
    <div className="fixed inset-0 flex bg-black/50 items-center justify-center">
      <div className="p-10 bg-white text-black rounded-2xl">
        <h1>{winner ? `${winner} Won` : "Draw Match"}</h1>
        <button
          className="text-white bg-[#d4cb15] rounded-2xl p-2 mt-2"
          onClick={reStart}
        >
          Rematch
        </button>
      </div>
    </div>
  );
}
