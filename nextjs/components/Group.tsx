import styles from "./Group.module.css";
import TopicMini from "./TopicMini";

export default function Group({ group, audience }: any) {
  if (!group) return null;
  return (
    <>
      <h1 className={styles.h1}>
        {group.name}{" "}
        <span className={styles.description}>{group.description}</span>
      </h1>
      <div>
        {group.items.map(({ topic }: any) => (
          <div className={styles.item} key={topic.slug}>
            <TopicMini
              slug={topic.slug}
              name={topic.name}
              image={topic.image}
              description={topic.descriptions[0].extra_short}
              audience={audience}
            />
          </div>
        ))}
      </div>
    </>
  );
}
