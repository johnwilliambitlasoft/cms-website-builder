import styles from "./page.module.css";
import { Grapesjs } from "@/components";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      {/* <div className={styles.devLinks}>
        <Link href="/widgets" className={styles.devLink}>
          <span>Widget Preview System</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 4H6a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2v-4"></path>
            <path d="m14 10 7-7m-7 0h7v7"></path>
          </svg>
        </Link>
        <Link href="/widget-customizer-example" className={styles.devLink}>
          <span>Widget Customizer Example</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 4H6a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2v-4"></path>
            <path d="m14 10 7-7m-7 0h7v7"></path>
          </svg>
        </Link>
      </div> */}
      <Grapesjs />
    </div>
  );
}
