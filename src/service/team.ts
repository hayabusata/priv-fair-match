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
    const notAnchorPlayers = allPlayers.filter(player => !player.isAnchor)
        .sort(sortByWinCount);

    for (let i = 0; i < notAnchorPlayers.length / 2; i++) {
        const alphaWin = alphaTeam.reduce((acc, player) => acc + player.win, 0);
        const betaWin = betaTeam.reduce((acc, player) => acc + player.win, 0);
        const moreAlpha = alphaWin >= betaWin ? true : false;

        if (moreAlpha) {
            betaTeam.length < allPlayers.length/2 && betaTeam.push(notAnchorPlayers[i]);
            alphaTeam.length < allPlayers.length/2 && alphaTeam.push(notAnchorPlayers[notAnchorPlayers.length - i - 1]);
        } else {
            alphaTeam.length < allPlayers.length/2 && alphaTeam.push(notAnchorPlayers[i]);
            betaTeam.length < allPlayers.length/2 && betaTeam.push(notAnchorPlayers[notAnchorPlayers.length - i - 1]);

        }
    }

    return {alphaTeam, betaTeam};
}