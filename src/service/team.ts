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
    console.log(notAnchorPlayers);
    // for (let i = 0; i < notAnchorPlayers.length; i = i + 2) {
    //     if ((i/2) % 2 === 0) {
    //         alphaTeam.length < allPlayers.length/2 && alphaTeam.push(notAnchorPlayers[i]);
    //         betaTeam.length < allPlayers.length/2 && betaTeam.push(notAnchorPlayers[i + 1]);
    //     } else {
    //         betaTeam.length < allPlayers.length/2 && betaTeam.push(notAnchorPlayers[i]);
    //         alphaTeam.length < allPlayers.length/2 && alphaTeam.push(notAnchorPlayers[i + 1]);
    //     }
    // }
    

    for (let i = 0; i < notAnchorPlayers.length / 2; i++) {
        const alphaWin = alphaTeam.reduce((acc, player) => acc + player.win, 0);
        const betaWin = betaTeam.reduce((acc, player) => acc + player.win, 0);
        const isAlpha = alphaWin >= betaWin ? true : false;
  
        if (isAlpha) {
            if (i % 2 === 0) {
                betaTeam.length < allPlayers.length/2 && betaTeam.push(notAnchorPlayers[i]);
                alphaTeam.length < allPlayers.length/2 && alphaTeam.push(notAnchorPlayers[i+1]);
            } else {
                betaTeam.length < allPlayers.length/2 && betaTeam.push(notAnchorPlayers[notAnchorPlayers.length - i]);
                alphaTeam.length < allPlayers.length/2 && alphaTeam.push(notAnchorPlayers[notAnchorPlayers.length - i - 1]);
            }
        } else {
            if (i % 2 === 0) {
                alphaTeam.length < allPlayers.length/2 && alphaTeam.push(notAnchorPlayers[i]);
                betaTeam.length < allPlayers.length/2 && betaTeam.push(notAnchorPlayers[i+1]);
            } else {
                alphaTeam.length < allPlayers.length/2 && alphaTeam.push(notAnchorPlayers[notAnchorPlayers.length - i]);
                betaTeam.length < allPlayers.length/2 && betaTeam.push(notAnchorPlayers[notAnchorPlayers.length - i - 1]);
            }
        }

        // if (i % 2 === 0) {
        //     betaTeam.length < allPlayers.length/2 && betaTeam.push(notAnchorPlayers[i]);
        //     alphaTeam.length < allPlayers.length/2 && alphaTeam.push(notAnchorPlayers[i+1]);
        // } else {
        //     betaTeam.length < allPlayers.length/2 && betaTeam.push(notAnchorPlayers[notAnchorPlayers.length - i - 1]);
        //     alphaTeam.length < allPlayers.length/2 && alphaTeam.push(notAnchorPlayers[notAnchorPlayers.length - i]);
        // }
    }
    return {alphaTeam, betaTeam};
}