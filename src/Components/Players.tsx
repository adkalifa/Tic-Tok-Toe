import { useState } from "react";

type PlayersProps = {
  name: string;
  symbol: string;
  isActive: boolean;
  onChangeName: (symbol: string, newName: string) => void;
};

export default function Players({ name, symbol, isActive, onChangeName }: PlayersProps) {
  const [isName, setIsName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  const handleIsEditing = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
    if (!isEditing) {
      onChangeName(symbol, isName);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsName(e.target.value);
  };

  return (
    <li className={`flex items-center gap-5 ${isActive ? "border border-[#d4cb15] rounded-lg p-2" : ""}`}>
      {isEditing ? (
        <input
          type="text"
          value={isName}
          onChange={handleOnChange}
          className="px-4 py-3 rounded-xl"
        />
      ) : (
        <span className="flex gap-4 items-center">
          <span>{isName}</span>
          <span className="text-[#d4cb15]">{symbol}</span>
        </span>
      )}
      <button className="font-bold text-md" onClick={handleIsEditing}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}
