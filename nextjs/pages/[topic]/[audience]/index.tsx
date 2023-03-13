// import "server-only";
import Inner from "@/pages/components/Inner";
import Layout from "@/pages/layout";
import Full from "./components/Full";
import Stub from "./components/Stub";

const API = process.env.HASURA_ENDPOINT;
const headers = {
  "Content-Type": "application/json",
  "X-Hasura-Admin-Secret": process.env.HASURA_ADMIN_SECRET as string,
};

const audiences = ["5", "10", "20"];

// export const dynamic = "force-static";
// export const dynamicParams = true;
// export const dynamic = "force-dynamic";
// export const revalidate = 0;
// export const revalidate = "no-cache";

type Params = {
  params: {
    topic: string;
    audience: string;
  };
};

export async function getStaticPaths() {
  try {
    const response = await fetch(`${API}/api/rest/topics/all`, { headers });
    const { topics } = await response.json();
    const paths = audiences
      .map((audience) =>
        topics.map((topic: any) => ({ params: { ...topic, audience } }))
      )
      .flat();
    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error(error);
    return { paths: [{ slug: "error" }], fallback: "blocking" };
  }
}

export async function getStaticProps({
  params: { topic: slug, audience },
}: Params) {
  const response = await fetch(`${API}/api/rest/topic/${slug}/${audience}`, {
    headers,
    next: { revalidate: 0 },
  });
  const {
    topic: [data],
  } = await response.json();
  const isStub = !data?.descriptions?.length;
  return { props: { ...data, isStub, audience } };
}

export default function Topic(props: any) {
  // console.log("page");
  // const {
  //   topic: [data],
  // } = await (
  //   await fetch(`${API}/api/rest/topic/${slug}`, {
  //     headers,
  //     cache: "default",
  //   })
  // ).json();
  // // console.log({ data });
  // console.log({ regenerate: data.image });
  // const isStub = !data?.descriptions?.length;
  const Page = props.isStub ? Stub : Full;
  // return <>{JSON.stringify(props)}</>;
  return (
    <Layout audience={props.audience} slug={props.slug}>
      <Page {...props} />
    </Layout>
  );
  // return <Full {...props} />;
}
