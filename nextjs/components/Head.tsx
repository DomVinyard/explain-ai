import Head from "next/head";

export function TopicHead(props: any) {
  const description =
    props.descriptions?.[0]?.extra_short || "Generating Description";
  console.log({ props });
  const audience = props.audience === "5" ? ` (Like I'm 5)` : "";
  const title = `Explain ${props.name}${audience}`;
  const image = props?.image || "/placeholder.png";
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="description" content={description} />
        <meta name="author" content="Sigma Labs" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="image" content={image} />
        <meta property="og:site_name" content={"ExplainAI"} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
      </Head>
    </>
  );
}

export function GroupsHead() {
  return (
    <>
      <Head>
        <title>ExplainAI: The AI Knowledge Platform</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:site_name" content={"ExplainAI"} />
        <meta name="description" content={"The AI Knowledge Platform"} />
        <meta name="author" content="Sigma Labs" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
    </>
  );
}
