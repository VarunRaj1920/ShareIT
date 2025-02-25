import connectToDB from "../../utils/db";
import Code from "../../models/Code";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { id, content } = req.body;
  await connectToDB();

  try {
    let code = await Code.findOne({ id });
    if (code) {
      code.content = content;
      await code.save();
    } else {
      code = await Code.create({ id, content });
    }
    console.log("Code saved:", code);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error saving code:", error);
    res.status(500).json({ error: "Error saving code" });
  }
}