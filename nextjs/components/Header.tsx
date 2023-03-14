import Link from "next/link";
import { Inner } from "../pages/_app";
import styles from "./Header.module.css";

export default function Header({ slug, audience, page }: any) {
  const pagePath = page === "groups" ? "groups" : `topic/${slug}`;
  const audiencePath = audience === "5" ? `20` : "5";
  return (
    <header>
      <Inner>
        <div className={styles.container}>
          <Link href={`/groups/${audience}`}>
            <div style={{ color: "white" }}>ExplainAI</div>
          </Link>
          <div style={{ display: "flex" }}>
            <Link href={`/${pagePath}/${audiencePath}`}>
              <input
                type="checkbox"
                id="audience"
                name="audience"
                value={audience}
                checked={audience === "5"}
                readOnly
              />
              <label className={styles.label} htmlFor="audience">
                {"Like I'm 5"}
              </label>
            </Link>
          </div>
        </div>
      </Inner>
    </header>
  );
}
