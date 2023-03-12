import "server-only";
import Full from "./components/Full";
import Stub from "./components/Stub";

const API = process.env.HASURA_ENDPOINT;
const headers = {
  "Content-Type": "application/json",
  "X-Hasura-Admin-Secret": process.env.HASURA_ADMIN_SECRET as string,
};

// export const dynamic = "force-static",
//   dynamicParams = true;

export async function generateStaticParams() {
  try {
    const response = await fetch(`${API}/api/rest/topics/all`, { headers });
    const { topics } = await response.json();
    console.log({ topics });
    return topics;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Topic({ params: { topic: slug } }: any) {
  const {
    topic: [data],
  } = await (await fetch(`${API}/api/rest/topic/${slug}`, { headers })).json();
  const isStub = !data?.descriptions?.length;
  const Page = isStub ? Stub : Full;
  return <Page data={{ slug, ...data }} />;
  // return <Full {...props} />;
}
