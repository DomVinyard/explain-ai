import Link from "next/link";
import Inner from "./Inner";
import styles from "./Header.module.css";

const audiences = [
  { url: "5", label: "5" },
  { url: "10", label: "10" },
  { url: "20", label: "Adult" },
];

export default function Header({ slug, audience }: any) {
  return (
    <header>
      <Inner>
        <div className={styles.container}>
          <div style={{ color: "white" }}>ExplainAI</div>
          <div style={{ display: "flex" }}>
            {audiences.map((a) => (
              <Link href={`/${slug}/${a.url}`} key={a.url}>
                <div
                  style={{
                    color: "white",
                    border: a.url === audience ? "1px solid white" : "none",
                  }}
                >
                  {a.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Inner>
    </header>
  );
}
