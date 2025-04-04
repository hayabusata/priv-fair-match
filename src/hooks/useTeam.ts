import { Player } from "@/domain/player";
import { atom, useAtom, useSetAtom } from "jotai";

const alphaAtom = atom<Player[][]>([]);
const betaAtom = atom<Player[][]>([]);

export function useSetAlpha() {
  const setAlphaList = useSetAtom(alphaAtom);
  return setAlphaList;
}

export function useAlpha() {
  const [alphaList, setAlphaList] = useAtom(alphaAtom);
  return { alphaList, setAlphaList };
}

export function useSetBeta() {
  const setBetaList = useSetAtom(betaAtom);
  return setBetaList;
}

export function useBeta() {
  const [betaList, setBetaList] = useAtom(betaAtom);
  return { betaList, setBetaList };
}
