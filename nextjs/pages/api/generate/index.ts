import { NextApiRequest, NextApiResponse } from "next";
import generate from "./src/generate";

const DB_ENDPOINT = process.env.DB_ENDPOINT || "http://localhost:8080";
const DB_SECRET = process.env.DB_SECRET || "admin_secret";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check for secret to confirm this is a valid request
  // if (req.query.secret !== process.env.REVALIDATE_SECRET) {
  //   return res.status(401).json({ message: "Invalid token" });
  // }

  // check that it doesn't already exist

  try {
    const { name } = req.body;

    if (!name) return res.status(400).send("Missing name");
    console.log(`[OpenAI] Generating /${name}`);
    const { data } = await generate({ name });
    const endpoint = `${DB_ENDPOINT}/api/rest/topic`;
    const body = JSON.stringify(data);
    const dbResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Hasura-Admin-Secret": DB_SECRET,
      },
      body,
    });
    const dbData = await dbResponse.json();
    if (dbData.error) throw new Error(dbData.error);
    if (!data) throw new Error("Error generating topic");

    // await res.revalidate(`/${slug}`);
    const AUDIENCES = ["5", "20"];
    for (const { slug } of data.topics) {
      for (const audience of AUDIENCES) {
        await res.revalidate(`/topic/${slug}/${audience}`);
      }
    }
    // console.log({ revalidationRes });
    return res.json({ success: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    console.error(err);
    return res.status(500).json({ error: err, success: false });
  }
}
