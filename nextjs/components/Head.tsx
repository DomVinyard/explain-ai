import Head from "next/head";

export function TopicHead(props: any) {
  return (
    <>
      <Head>
        <title>{props.name}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content={
            props.descriptions?.[0]?.extra_short || "Generating Description"
          }
        />
        <meta name="author" content="Sigma Labs" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="image" content={props.image} />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
    </>
  );
}

export function GroupsHead() {
  return (
    <>
      <Head>
        <title>ExplainAI.me</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={"Explain it to me. Simply."} />
        <meta name="author" content="Sigma Labs" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
