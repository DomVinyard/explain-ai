import Head from "next/head";

export function TopicHead(props: any) {
  const description =
    props.descriptions?.[0]?.extra_short || "Generating Description";
  return (
    <>
      <Head>
        <title>Explain {props.name}</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="description" content={description} />
        <meta name="author" content="Sigma Labs" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="image" content={props.image} />
        <meta property="og:site_name" content={"ExplainAI"} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={props.image} />
      </Head>
    </>
  );
}

export function GroupsHead() {
  return (
    <>
      <Head>
        <title>ExplainAI</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:site_name" content={"ExplainAI"} />
        <meta name="description" content={"Explain it to me. Simply."} />
        <meta name="author" content="Sigma Labs" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
    </>
  );
}
