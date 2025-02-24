import { AllPlayers, Player } from "@/domain/player";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

// const playerAtom = atom<Player>({
//     name: null,
//     win: 0,
//     lose: 0,
//     isAnchor: false,
// });

const allPlayersAtom = atom<AllPlayers>([]);

// export function usePlayer() {
//     const [player,setPlayer] = useAtom(playerAtom);
//     return [player, setPlayer];
// }

// export function usePlayerValue() {
//     const player = useAtomValue(playerAtom);
//     return player;
// }

// export function useSetPlayer() {
//     const setPlayer = useSetAtom(playerAtom);
//     return setPlayer;
// }

export function useAllPlayers() {
    const [allPlayers, setAllPlayers] = useAtom(allPlayersAtom);
    return {allPlayers, setAllPlayers};
}

export function useAllPlayersValue() {
    const allPlayers = useAtomValue(allPlayersAtom);
    return allPlayers;
}

export function useSetAllPlayers() {
    const setAllPlayers = useSetAtom(allPlayersAtom);
    return setAllPlayers;
}