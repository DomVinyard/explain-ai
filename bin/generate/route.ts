import generate from "./generate";

const DB_ENDPOINT = process.env.DB_ENDPOINT || "http://localhost:8080";
const DB_SECRET = process.env.DB_SECRET || "admin_secret";

const saveToDB = async ({ data }: any) => {
  const endpoint = `${DB_ENDPOINT}/api/rest/topic`;
  const body = JSON.stringify(data);
  await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Hasura-Admin-Secret": DB_SECRET,
    },
    body,
  });
};

export async function POST(request: Request) {
  try {
    // parse body
    if (!request?.body?.name) throw new Error("Name is required");
    const { slug, data } = await generate({ name: request.body.name });
    await saveToDB({ data });
    if (!data) throw new Error("Error generating topic");
    // revalidate here
    // return if success
  } catch (error) {
    return { error };
  }
}
