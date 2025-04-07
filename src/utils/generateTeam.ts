import { AllPlayers, Player } from "@/domain/player";

function sortByWinCount(a: Player, b: Player) {
  return b.win - a.win;
}

export function generateTeams(allPlayers: AllPlayers) {
  const alphaTeam: Player[] = [];
  const betaTeam: Player[] = [];

  // 後衛分け
  const anchorPlayers = allPlayers
    .filter((player) => player.isAnchor)
    .sort(sortByWinCount);
  anchorPlayers.forEach((anchor, index) => {
    // 後衛が偶数なら、同数にわける
    if (anchorPlayers.length % 2 === 0) {
      if (index % 2 === 0) {
        alphaTeam.push(anchor);
      } else {
        betaTeam.push(anchor);
      }
      // 後衛が奇数なら、勝ちが多い側を後衛多めに
    } else {
      if (index <= anchorPlayers.length / 2) {
        alphaTeam.push(anchor);
      } else {
        betaTeam.push(anchor);
      }
    }
  });

  // 後衛以外
  const frontPlayers = allPlayers
    .filter((player) => !player.isAnchor)
    .sort(sortByWinCount);

  const bestMatchup = exhausiveSearch(frontPlayers, alphaTeam, betaTeam);

  for (let i = 0; i < bestMatchup.alpha.length; i++) {
    alphaTeam.push(bestMatchup.alpha[i]);
  }
  for (let i = 0; i < bestMatchup.beta.length; i++) {
    betaTeam.push(bestMatchup.beta[i]);
  }

  // betaにalpha固定のプレイヤーが含まれていたら入れ替える
  return alphaTeam.findIndex((player) => player.fixedAlpha)
    ? { alphaTeam, betaTeam }
    : { betaTeam, alphaTeam };
}

// 前衛の組み合わせを全探索し、勝率の差が小さくなるよう分ける
function exhausiveSearch(
  frontPlayers: Player[],
  alphaTeam: Player[],
  betaTeam: Player[],
) {
  let minDiff = Infinity;
  let bestMatchup: {
    alpha: Player[];
    beta: Player[];
  } = { alpha: [], beta: [] };

  for (let mask = 0; mask < 1 << frontPlayers.length; mask++) {
    const teamAFronts: Player[] = [];
    const teamBFronts: Player[] = [];

    for (let i = 0; i < frontPlayers.length; i++) {
      if ((mask & (1 << i)) !== 0) {
        teamAFronts.push(frontPlayers[i]);
      } else {
        teamBFronts.push(frontPlayers[i]);
      }
    }

    // TODO: Playerが8人前提の実装になっている
    if (
      teamAFronts.length + alphaTeam.length !== 4 ||
      teamBFronts.length + betaTeam.length !== 4
    )
      continue;

    // 各チームの勝ち数を計算
    const alphaTeamWin = alphaTeam[0]?.win ?? 0;
    const betaTeamWin = betaTeam[0]?.win ?? 0;
    const teamAWins =
      alphaTeamWin + teamAFronts.reduce((sum, p) => sum + p.win, 0);
    const teamBWins =
      betaTeamWin + teamBFronts.reduce((sum, p) => sum + p.win, 0);
    const diff = Math.abs(teamAWins - teamBWins);

    if (diff < minDiff) {
      minDiff = diff;
      bestMatchup = {
        alpha: teamAFronts,
        beta: teamBFronts,
      };
    }
  }

  return bestMatchup;
}
