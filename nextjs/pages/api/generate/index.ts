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

  try {
    // This should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    const { name } = req.body;

    if (!name) {
      return res.status(400).send("Missing name");
    }
    console.log(`[OpenAI] Generating /${name}`);
    const { slug, data, error } = await generate({ name });
    if (error) throw error;
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
    if (!data) throw new Error("Error generating topic");

    // await res.revalidate(`/${slug}`);
    for (const audience of ["5", "10", "20"]) {
      console.log(`[Next.js] Building /${slug}/${audience}`);
      await res.revalidate(`/${slug}/${audience}`);
    }
    // console.log({ revalidationRes });
    return res.json({ success: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    console.error(err);
    return res.status(500).json({ success: false });
  }
}
