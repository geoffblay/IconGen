import OpenAI from 'openai';

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Only use this in development
});

export async function generateIcon(description: string): Promise<string> {
  try {
    const prompt = `Create a simple, minimalist vector-style icon of ${description}. The icon should have a white background and be suitable for use in a user interface. Use clean lines and simple shapes.`;

    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt: prompt,
    });

    if (!response.data?.[0]?.b64_json) {
      throw new Error('No image data returned from OpenAI');
    }

    const base64Image = response.data[0].b64_json;
    const imageDataUrl = `data:image/png;base64,${base64Image}`;
    
    return `<img src="${imageDataUrl}" alt="${description}" class="w-full h-full object-contain" />`;
  } catch (error) {
    console.error('Error generating icon:', error);
    throw error;
  }
} 