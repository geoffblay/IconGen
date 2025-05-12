import { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('Received request:', req.method);
  
  if (req.method !== 'POST') {
    console.error('Invalid method:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { description } = req.body;
    console.log('Generating icon for description:', description);

    if (!description) {
      console.error('No description provided');
      return res.status(400).json({ error: 'Description is required' });
    }

    const prompt = `Create a simple, minimalist vector-style icon of ${description}. The icon should have a white background and be suitable for use in a user interface. Use clean lines and simple shapes.`;
    console.log('Using prompt:', prompt);

    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt: prompt,
      size: "1024x1024",
      quality: "high",
      background: "transparent"
    });

    console.log('OpenAI response received');
    if (!response.data?.[0]?.b64_json) {
      console.error('No image data in response:', response);
      throw new Error('No image data returned from OpenAI');
    }

    const base64Image = response.data[0].b64_json;
    console.log('Successfully generated image');
    
    res.status(200).json({ svg: base64Image });
  } catch (error) {
    console.error('Error generating icon:', error);
    res.status(500).json({ error: 'Failed to generate icon', details: error.message });
  }
} 