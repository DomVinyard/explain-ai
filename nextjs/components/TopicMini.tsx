import Link from "next/link";
import styles from "./TopicMini.module.css";

export default function TopicMini({
  slug,
  name,
  image,
  description,
  audience,
}: any) {
  return (
    <Link href={`/topic/${slug}/${audience}`}>
      <div className={styles.container}>
        <div>
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${image || "/placeholder.png"})` }}
        />
      </div>
    </Link>
  );
}
