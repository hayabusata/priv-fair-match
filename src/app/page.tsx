import { Players } from "./Players/component";
import { TeamList } from "./TeamList/component";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Players />
      <TeamList />
    </div>
  );
}
