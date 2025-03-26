"use client"

import { useAllPlayers } from "@/hooks/usePlayer"
import { generateTeams } from "@/service/team";
import styles from "./style.module.css";
import { useAlpha, useBeta } from "@/hooks/useTeam";


export const TeamList = () => {
    const {allPlayers, setAllPlayers} = useAllPlayers();
    
    const {alphaList, setAlphaList} = useAlpha();
    const {betaList, setBetaList} = useBeta();
    
    /* eslint @typescript-eslint/no-explicit-any: 0 */
    const win = (e: any) => {
        const winners = "alpha" === e.currentTarget.getAttribute("data-winner")
            ? alphaList.slice(-1)[0]
            : betaList.slice(-1)[0]

        const newAllPlayers = allPlayers.map(player => {
            return {
                ...player,
                win:  winners.findIndex(winner => winner.name === player.name) > -1 ? player.win + 1 : player.win,
            }
        });

        setAllPlayers(newAllPlayers)

        // 次の試合のためにチーム追加する
        const { alphaTeam, betaTeam } = generateTeams(newAllPlayers);
        setAlphaList([...alphaList,alphaTeam]);
        setBetaList([...betaList, betaTeam]);

        // console.log("alpha:",alphaList.slice(-1)[0])
        // console.log("beta:",betaList.slice(-1)[0])
    }

    return (
        <div>
            <table className={styles.teamList}>
                <thead>
                    <tr>
                        <th scope="col">試合</th>
                        <th scope="col">チーム</th>
                        <th scope="col">プレイヤー1</th>
                        <th scope="col">プレイヤー2</th>
                        <th scope="col">プレイヤー3</th>
                        <th scope="col">プレイヤー4</th>
                        {/* <th scope="col">ボタン</th> */}
                    </tr>
                </thead>
                <tbody>
                    {alphaList.map((alpha,index) => {
                        return (
                            <>
                            <tr>
                                <th scope="row" rowSpan={2}>{index+1}</th>
                                <th scope="row">alpha</th>
                                {alpha.map((player,key) => {
                                    return <th key={key}>{player.name}({player.win})</th>
                                })}
                                
                            </tr>
                            <tr>
                                <th scope="row">beta</th>
                                {betaList[index].map((player,key) => {
                                    return <th key={key}>{player.name}({player.win})</th>
                                })}
                                
                            </tr>
                        </>
                        );
                    })}
                    
                </tbody>
            </table>
            <button onClick={win} data-winner="alpha" data-team={alphaList.slice(-1)[0]}>alpha 勝利</button>
            <button onClick={win} data-winner="beta" data-team={betaList.slice(-1)[0]}>beta 勝利</button>
        </div>
    )
}