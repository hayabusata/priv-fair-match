import { AllPlayers } from "@/domain/player";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

const allPlayersAtom = atom<AllPlayers>([]);

export function useAllPlayers() {
  const [allPlayers, setAllPlayers] = useAtom(allPlayersAtom);
  return { allPlayers, setAllPlayers };
}

export function useAllPlayersValue() {
  const allPlayers = useAtomValue(allPlayersAtom);
  return allPlayers;
}

export function useSetAllPlayers() {
  const setAllPlayers = useSetAtom(allPlayersAtom);
  return setAllPlayers;
}
