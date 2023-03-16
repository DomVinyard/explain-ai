import Image from "next/image";
import Link from "next/link";
import { Inner } from "../pages/_app";
import styles from "./Header.module.css";

export default function Header({ slug, audience, page }: any) {
  const pagePath = page === "groups" ? "groups" : `topic/${slug}`;
  const audiencePath = audience === "5" ? `20` : "5";
  return (
    <header style={{ pointerEvents: page === "stub" ? "none" : "auto" }}>
      <Inner>
        <div className={styles.container}>
          <Link href={`/groups/${audience}`}>
            <Image
              className={styles.pointer}
              src="/logo.png"
              alt="Logo"
              width={200}
              height={50}
            />
          </Link>
          <Link href={`/${pagePath}/${audiencePath}`}>
            <div>
              <Image
                className={styles.pointer}
                src={`/${audience === "5" ? "checked" : "unchecked"}.png`}
                alt="Switch"
                width={120}
                height={24}
              />
            </div>
          </Link>
        </div>
      </Inner>
    </header>
  );
}
