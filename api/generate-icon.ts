import { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }

    const prompt = `Create a simple, minimalist vector-style icon of ${description}. The icon should have a white background and be suitable for use in a user interface. Use clean lines and simple shapes.`;

    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt: prompt,
      output_format: "png",
      background: "transparent",
      quality: "high",
      size: "1024x1024",
    });

    // Convert base64 to SVG (you'll need to implement this conversion)
    // const svg = convertBase64ToSVG(response.data[0].b64_json);
    if (!response.data?.[0]?.b64_json) {
      throw new Error('No image data returned from OpenAI');
    }
    const base64Image = response.data[0].b64_json;

    res.status(200).json({ base64Image });
  } catch (error) {
    console.error('Error generating icon:', error);
    res.status(500).json({ error: 'Failed to generate icon' });
  }
} 