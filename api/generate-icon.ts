import { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Mock PNG for development/testing
const mockPng = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  
  if (req.method !== 'POST') {
    console.error('Invalid method:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { description } = req.body;

    if (!description) {
      console.error('No description provided');
      return res.status(400).json({ error: 'Description is required' });
    }

    // Use mock response if USE_MOCK_RESPONSE is set to 'true'
    if (process.env.USE_MOCK_RESPONSE === 'true') {
      console.log('Using mock response');
      return res.status(200).json({ png: Buffer.from(mockPng).toString('base64') });
    }

    const prompt = `Create a simple, minimalist vector-style icon of ${description}. The icon should be black with a white background and be suitable for use in a user interface. Use clean lines and simple shapes.`;

    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt: prompt,
      size: "1024x1024",
      quality: "high",
      background: "transparent"
    });

    if (!response.data?.[0]?.b64_json) {
      console.error('No image data in response:', response);
      throw new Error('No image data returned from OpenAI');
    }

    const base64Image = response.data[0].b64_json;
    console.log('Successfully generated image');
    
    res.status(200).json({ png: base64Image });
  } catch (error) {
    console.error('Error generating icon:', error);
    res.status(500).json({ 
      error: 'Failed to generate icon', 
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 