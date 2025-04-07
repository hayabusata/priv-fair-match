export type Player = {
  name: string;
  win: number;
  lose: number;
  isAnchor: boolean; // 後衛判定フラグ
  fixedAlpha: boolean; // alpha固定フラグ
};

export type AllPlayers = Player[];
