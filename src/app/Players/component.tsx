"use client"

import React, { useState }  from "react"
import { PlayerInput } from "./Player/component";
import styles from "./style.module.css";
import { useSetAllPlayers } from "@/hooks/usePlayer";
import { generateTeams } from "@/service/team";
import { useSetAlpha, useSetBeta } from "@/hooks/useTeam";

export const Players = () => {
    const maxPlayerNum = 8;

    const [allPlayerNames, setAllPlayerNames] = useState<string[]>(new Array(maxPlayerNum).fill(""));
    // const [allPlayers, setAllPlayers] = useState<Player[]>([]);
    const setAllPlayers = useSetAllPlayers()
    const [isAnchorInputs, setIsAnchorInputs] = useState<boolean[]>(Array(maxPlayerNum).fill(false));
    
    const setAlphaList = useSetAlpha();
    const setBetaList = useSetBeta();

    const onClick = () => {
        const players = allPlayerNames.map((name,index)=> ({
            name: name,
            win: 0,
            lose: 0,
            isAnchor: isAnchorInputs[index]
        }));
        setAllPlayers(players);
        const { alphaTeam, betaTeam } = generateTeams(players);
        setAlphaList([alphaTeam]);
        setBetaList([betaTeam]);
    }

    return (
        <div className={styles.players}>
            { [...Array(maxPlayerNum)].map((_, index) => 
            <PlayerInput 
                key={index}
                index={index} 
                allPlayerNames={allPlayerNames} 
                setAllPlayerNames={setAllPlayerNames}
                isAnchorInputs={isAnchorInputs}
                setIsAnchorInputs={setIsAnchorInputs}
            /> )}
            <button type="reset" onClick={onClick} className={styles.initializeButton}>start</button>
        </div>
    );
}