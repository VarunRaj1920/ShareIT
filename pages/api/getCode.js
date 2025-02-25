import connectToDB from "../../utils/db";
import Code from "../../models/Code";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const { id } = req.query;
  await connectToDB();

  try {
    const code = await Code.findOne({ id });
    console.log("Retrieved code for id", id, ":", code);
    res.status(200).json({ content: code ? code.content : "" });
  } catch (error) {
    console.error("Error fetching code:", error);
    res.status(500).json({ error: "Error fetching code" });
  }
}
