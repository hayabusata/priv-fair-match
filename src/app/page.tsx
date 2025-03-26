import { Players } from "./Players/component";
import { TeamList } from "./TeamList/component";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1>8人用プラべチーム分け</h1>
      <p style={{fontSize:"14px"}}>スプラトゥーンのプライベートマッチにおいて、後衛の人数およびチーム勝率を均等にチーム分けを行います。</p>
      <p style={{fontSize:"14px"}}>名前の横のチェックボックスにチェックすると、そのプレイヤーは後衛として扱われてチーム分けされます。</p>
      <br/>
      <Players />
      <TeamList />
    </div>
  );
}
