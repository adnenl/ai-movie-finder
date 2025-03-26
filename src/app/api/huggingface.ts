import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  response?: string;
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "POST") return res.status(405).end();

  const { movieNames } = req.body;

  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct",
      { inputs: movieNames.join(',') },
      { headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` } }
    );

    res.status(200).json({ response: response.data[0].generated_text });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
