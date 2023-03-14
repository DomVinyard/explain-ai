import Full from "./components/Full";
import dynamic from "next/dynamic";

const Stub = dynamic(() => import("./components/Stub"), {
  loading: () => <p>Loading...</p>,
});

const API = process.env.HASURA_ENDPOINT;
const headers = {
  "Content-Type": "application/json",
  "X-Hasura-Admin-Secret": process.env.HASURA_ADMIN_SECRET as string,
};

const audiences = ["5", "10", "20"];
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
  return { props: { ...data, isStub, audience, page: "topic" } };
}

export default function Topic(props: any) {
  if (props.isStub) return <Stub {...props} />;
  return <Full {...props} />;
}
