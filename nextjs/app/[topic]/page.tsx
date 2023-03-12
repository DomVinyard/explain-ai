// import "server-only";
import Full from "./components/Full";
import Stub from "./components/Stub";

const API = process.env.HASURA_ENDPOINT;
const headers = {
  "Content-Type": "application/json",
  "X-Hasura-Admin-Secret": process.env.HASURA_ADMIN_SECRET as string,
};

export const dynamic = "force-static";
export const dynamicParams = true;
// export const dynamic = "force-dynamic";
// export const revalidate = 0;
// export const revalidate = "no-cache";

export async function generateStaticParams() {
  try {
    const response = await fetch(`${API}/api/rest/topics/all`, { headers });
    const { topics } = await response.json();
    return topics; //.slice(0, 5);
  } catch (error) {
    console.error(error);
    return [{ slug: "error" }];
  }
}

export default async function Topic({ params: { topic: slug } }: any) {
  console.log("page");
  const {
    topic: [data],
  } = await (
    await fetch(`${API}/api/rest/topic/${slug}`, {
      headers,
      cache: "default",
    })
  ).json();
  // console.log({ data });
  console.log({ regenerate: data.image });
  const isStub = !data?.descriptions?.length;
  const Page = isStub ? Stub : Full;
  // return <>{JSON.stringify(data)}</>;
  return <Page data={{ slug, ...data }} />;
  // return <Full {...props} />;
}
