import styles from "./page.module.css";
import {Grapesjs} from "@/components";

export default function Home() {
  return (
    <div className={styles.page}>
      <Grapesjs />
    </div>
  );
}
