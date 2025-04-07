import { Players } from "./Players/component";
import { TeamList } from "./TeamList/component";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1>8人用プラべチーム分け</h1>
      <p>
        スプラトゥーンのプライベートマッチにおいて、以下がチーム間で等しくなるようチーム分けを行います。
      </p>
      <ul style={{ listStylePosition: "inside" }}>
        <li>後衛の人数</li>
        <li>プレイヤーの勝率</li>
      </ul>
      <br />
      <p>
        名前の横のチェックボックスにチェックすると、そのプレイヤーは後衛として扱われてチーム分けされます。
      </p>
      <br />
      <p>プレイヤー1はalpha固定です。</p>
      <br />
      <br />
      <Players />
      <TeamList />
    </div>
  );
}
