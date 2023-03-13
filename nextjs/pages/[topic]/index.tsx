// import "server-only";
import Full from "./components/Full";
import Stub from "./components/Stub";

const API = process.env.HASURA_ENDPOINT;
const headers = {
  "Content-Type": "application/json",
  "X-Hasura-Admin-Secret": process.env.HASURA_ADMIN_SECRET as string,
};

// export const dynamic = "force-static";
// export const dynamicParams = true;
// export const dynamic = "force-dynamic";
// export const revalidate = 0;
// export const revalidate = "no-cache";

type Params = {
  params: {
    topic: string;
  };
};

export async function getStaticPaths() {
  try {
    const response = await fetch(`${API}/api/rest/topics/all`, { headers });
    const { topics } = await response.json();
    return {
      paths: topics.map((topic: any) => ({ params: topic })),
      fallback: "blocking",
    };
  } catch (error) {
    console.error(error);
    return { paths: [{ slug: "error" }], fallback: "blocking" };
  }
}

export async function getStaticProps({ params: { topic: slug } }: Params) {
  const response = await fetch(`${API}/api/rest/topic/${slug}`, { headers });
  const {
    topic: [data],
  } = await response.json();
  const isStub = !data?.descriptions?.length;
  return { props: { ...data, isStub } };
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
  return <Page {...props} />;
  // return <Full {...props} />;
}
