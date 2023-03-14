import styles from "./TopicMain.module.css";

export default function TopicMain({ topic }: any) {
  const [description] = topic.descriptions;
  return (
    <div className={styles.container}>
      <div>
        <h2>{topic.name}</h2>
        {description.long.split("\n\n").map((paragraph: string, i: number) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
      <div className={styles.image_container}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${topic.image})` }}
        />
      </div>
    </div>
  );
}
