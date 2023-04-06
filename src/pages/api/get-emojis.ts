import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(400).send("Method not allowed");
    }

    const { prompt } = JSON.parse(req.body);

    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are on a website that searches for emojis using natural language, so everything I write, you respond with the emoji(s) that you think most closely resembles it, separated by commas. Next to the emoji, put the name of the emoji in the prompt language, separated by #. Always give 6 alternatives or less. If you cant, return 'Went wrong', okay?",
        },
        {
          role: "user",
          content: "Um homem no cavalo",
        },
        {
          role: "assistant",
          content: "🐎#cavalo,👨#homem,🏇#cavaleiro.",
        },
        {
          role: "user",
          content: "A man on a horse",
        },
        {
          role: "assistant",
          content: "👨#man,🏇#jockey,🐎#horse,",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const emojis = completion.data.choices[0].message?.content?.split(",");

    const options = emojis?.map((emoji) => {
      const [emojiChar, emojiName] = emoji.split("#");

      if (emojiChar.toLocaleLowerCase().includes("went wrong") || !emojiName) {
        throw new Error("Something went wrong");
      }

      const name = emojiName?.toLocaleLowerCase().split(/[-_ ]/g).join("_");

      return { char: emojiChar, name };
    });

    return res.status(200).json({ options });
  } catch (error) {
    return res.status(400).send("Something went wrong");
  }
}
