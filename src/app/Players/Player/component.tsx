"use client";

import { useState } from "react";

type PlayerInputProps = {
  index: number;
  allPlayerNames: string[];
  setAllPlayerNames: React.Dispatch<React.SetStateAction<string[]>>;
  isAnchorInputs: boolean[];
  setIsAnchorInputs: React.Dispatch<React.SetStateAction<boolean[]>>;
};

export const PlayerInput = ({
  index,
  allPlayerNames,
  setAllPlayerNames,
  isAnchorInputs,
  setIsAnchorInputs,
}: PlayerInputProps) => {
  const [playerName, setPlayerName] = useState<string>("");

  return (
    <div>
      <p>プレイヤー{index + 1}</p>
      <input
        type="text"
        maxLength={10}
        size={12}
        value={playerName}
        onChange={(event) => {
          setPlayerName(event.target.value);
          const list: string[] = [];
          for (let i = 0; i < allPlayerNames.length; i++) {
            list.push(i === index ? event.target.value : allPlayerNames[i]);
          }
          setAllPlayerNames(list);
        }}
      />
      <input
        type="checkbox"
        onChange={(event) => {
          const list: boolean[] = [];
          for (let i = 0; i < isAnchorInputs.length; i++) {
            list.push(i === index ? event.target.checked : isAnchorInputs[i]);
          }
          setIsAnchorInputs(list);
        }}
      />
    </div>
  );
};
