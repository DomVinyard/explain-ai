import { NextApiRequest, NextApiResponse } from "next";

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
    const slug = req.query.slug || req.body;

    if (!slug) {
      return res.status(400).send("Missing slug");
    }
    // await res.revalidate(`/${slug}`);
    for (const audience of ["5", "20"]) {
      await res.revalidate(`/topic/${slug}/${audience}`);
      await res.revalidate(`/groups/${audience}`);
    }
    // console.log({ revalidationRes });
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    console.error(err);
    return res.status(500).send("Error revalidating");
  }
}
