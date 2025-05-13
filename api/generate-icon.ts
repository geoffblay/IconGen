import { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Mock SVG for development/testing
const mockSvg = `<svg width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1024" height="1024" fill="white"/>
  <circle cx="512" cy="512" r="384" stroke="black" stroke-width="32"/>
  <path d="M512 256v512M256 512h512" stroke="black" stroke-width="32"/>
</svg>`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('Received request:', req.method);
  
  if (req.method !== 'POST') {
    console.error('Invalid method:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { description } = req.body;
    console.log('Generating icon for description:', description);
    console.log('Environment:', process.env.USE_MOCK_RESPONSE);

    if (!description) {
      console.error('No description provided');
      return res.status(400).json({ error: 'Description is required' });
    }

    // Use mock response if USE_MOCK_RESPONSE is set to 'true'
    if (process.env.USE_MOCK_RESPONSE === 'true') {
      console.log('Using mock response');
      return res.status(200).json({ svg: Buffer.from(mockSvg).toString('base64') });
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
    res.status(500).json({ 
      error: 'Failed to generate icon', 
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 