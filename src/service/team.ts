import { AllPlayers, Player } from "@/domain/player";

function sortByWinCount(a: Player, b: Player) {
    return b.win - a.win;
}

export function generateTeams(allPlayers: AllPlayers) {
    const alphaTeam: Player[] = [];
    const betaTeam: Player[] = [];

    // 後衛分け
    const anchorPlayers = allPlayers.filter(player => player.isAnchor).sort(sortByWinCount)
    anchorPlayers.forEach((anchor, index) => {
        // 後衛が偶数なら、同数にわける
        if (anchorPlayers.length % 2 === 0) {
            index % 2 === 0 ? alphaTeam.push(anchor) : betaTeam.push(anchor);
        // 後衛が奇数なら、勝ちが多い側を後衛多めに
        } else {
            index <= anchorPlayers.length / 2 ? alphaTeam.push(anchor) : betaTeam.push(anchor);
        }
    });

    // 後衛以外
    const frontPlayers = allPlayers.filter(player => !player.isAnchor)
        .sort(sortByWinCount);

    const bestMatchup = exhausiveSearch(frontPlayers, alphaTeam, betaTeam)

    for (let i = 0; i < bestMatchup.alpha.length; i++) {
        alphaTeam.push(bestMatchup.alpha[i])
    }
    for (let i = 0; i < bestMatchup.beta.length; i++) {
        betaTeam.push(bestMatchup.beta[i])
    }
    
    return {alphaTeam, betaTeam};
}

// 前衛の組み合わせを全探索し、勝率の差が小さくなるよう分ける
function exhausiveSearch(frontPlayers: Player[], alphaTeam: Player[], betaTeam: Player[]) {
    let minDiff = Infinity;
    let bestMatchup: {
        alpha: Player[], 
        beta: Player[]
    } = {alpha: [], beta: []};

    for (let mask = 0; mask < (1 << 6); mask++) {
        const teamAFronts: Player[] = [];
        const teamBFronts: Player[] = [];

        for (let i = 0; i < 6; i++) {
            if ((mask & (1 << i)) !== 0) {
                teamAFronts.push(frontPlayers[i]);
            } else {
                teamBFronts.push(frontPlayers[i]);
            }
        }

        if (teamAFronts.length !== 3 || teamBFronts.length !== 3) continue;

        // 各チームの勝ち数を計算
      const teamAWins = alphaTeam[0].win + teamAFronts.reduce((sum, p) => sum + p.win, 0);
      const teamBWins = betaTeam[0].win + teamBFronts.reduce((sum, p) => sum + p.win, 0);
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