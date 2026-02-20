import OpenAI from "openai";

const GROQ_BASE_URL = "https://api.groq.com/openai/v1";
const DEFAULT_MODEL = "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `You are an AI Music Prompt Architect specializing in generating high-quality prompts for Lo-Fi background music generation.

Your task is to create a detailed prompt that can be used in an AI music generator based on:
• Weather condition
• Mood

----------------------------------------
PROMPT SHOULD INCLUDE:

• Tempo (BPM)
• Instruments (piano, vinyl crackle, pads, etc.)
• Background ambience (rain, wind, night sounds)
• Emotional tone
• Beat style (soft, chill, mellow)
• Study-friendly atmosphere

----------------------------------------
STYLE REQUIREMENTS:

• Use descriptive but simple language
• Focus on relaxing Lo-Fi soundscape
• Include weather-based ambience
• Include mood-based musical tone
• Avoid complex music theory terms

----------------------------------------
OUTPUT FORMAT:

Return only a detailed music generation prompt
that can be directly used in an AI music generator.

Do not explain anything.`;

function getClient() {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Missing VITE_GROQ_API_KEY. Add it to your .env file as VITE_GROQ_API_KEY=your_key_here"
    );
  }

  return new OpenAI({
    apiKey,
    baseURL: GROQ_BASE_URL,
    dangerouslyAllowBrowser: true,
  });
}

/**
 * Generates a Lo-Fi AI music prompt based on weather and mood.
 * @param {Object} params
 * @param {string} params.weather - Current weather condition (e.g. "rainy", "foggy", "sunny")
 * @param {string} params.mood   - Current mood (e.g. "calm", "focused", "melancholic")
 * @param {string} [params.model] - Groq model to use (defaults to llama-3.3-70b-versatile)
 * @returns {Promise<string>} A detailed music generation prompt
 */
export async function createLofiMusicPrompt({
  weather,
  mood,
  model = DEFAULT_MODEL,
}) {
  if (!weather || !mood) {
    throw new Error("Both 'weather' and 'mood' are required.");
  }

  const client = getClient();

  const response = await client.chat.completions.create({
    model,
    temperature: 0.85,
    max_tokens: 512,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Weather condition: ${weather}\nMood: ${mood}`,
      },
    ],
  });

  const result = response.choices?.[0]?.message?.content?.trim();

  if (!result) {
    throw new Error("No prompt was returned from the AI model.");
  }

  return result;
}

export default createLofiMusicPrompt;
