import { NextApiRequest, NextApiResponse } from "next";
import generate from "./src/generate";
import dotenv from "dotenv";
dotenv.config();

const DB_ENDPOINT = process.env.HASURA_ENDPOINT || "http://localhost:8080";
const DB_SECRET = process.env.HASURA_ADMIN_SECRET || "admin_secret";

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
    const start = Date.now();
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
    await Promise.all(
      data.topics
        .map(({ slug }: any) => {
          return AUDIENCES.map((audience) => {
            return res.revalidate(`/topic/${slug}/${audience}`);
          });
        })
        .flat()
    );
    // console.log({ revalidationRes });
    const end = Date.now();
    console.log(`Execution time: ${end - start} ms`);
    return res.json({
      success: true,
      executionTime: `${((end - start) / 1000).toFixed(1)}s`,
      generated: data,
      database: dbData,
    });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    console.error(err);
    return res.status(500).json({ error: err, success: false });
  }
}
