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

  // Check that the generated_at field is empty. if not, reject

  // set the generated_at field to now

  // check that it is linked to an existing topic
  // const topicInitial = await getTopic({ slug: slugify(req.body.name) });
  //  if (!topicInitial)
  //    return res.status(404).send({
  //      error:
  //        "Topic not found. You can only generate topics that are linked to existing topics.",
  //    });

  // check that we havn't had more than n generations in the past 24 hours

  try {
    const { name } = req.body;

    if (!name) return res.status(400).send("Missing name");
    console.log(`[OpenAI] Generating /${name}`);
    const start = Date.now();
    const { data, slug } = await generate({ name });
    const endpoint = `${DB_ENDPOINT}/api/rest/topic`; // switch to apollo
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
    const AUDIENCES = ["5", "20"];

    await Promise.all(
      AUDIENCES.map(async (audience) =>
        res.revalidate(`/topic/${slug}/${audience}`)
      )
    );
    const end = Date.now();
    console.log(`Execution time: ${end - start} ms`);
    return res.json({
      success: true,
      executionTime: `${((end - start) / 1000).toFixed(1)}s`,
      generated: data,
      database: dbData,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err, success: false });
  }
}
