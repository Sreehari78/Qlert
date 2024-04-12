import OpenAI from "openai";

const OPENAI_API_KEY = "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";
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export async function GET() {
  const response = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Who won the world series in 2020?" },
      {
        role: "assistant",
        content: "The Los Angeles Dodgers won the World Series in 2020.",
      },
      { role: "user", content: "Where was it played?" },
    ],
    model: "gpt-3.5-turbo-0125",
  });
  return Response.json({ message: response.choices });
}
