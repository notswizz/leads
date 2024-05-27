import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const transcribeImage = async (imageData) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: JSON.stringify({
            type: "image_url",
            image_url: {
              url: imageData,
            },
          }),
        },
      ],
    });

    const transcription = response.choices[0].message.content;
    return transcription;
  } catch (error) {
    console.error("Error transcribing image:", error);
    throw new Error("Failed to transcribe image.");
  }
};

export default transcribeImage;
