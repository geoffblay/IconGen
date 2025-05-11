import OpenAI from 'openai';

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Only use this in development
});

// Rate limiting for non-authenticated users
const RATE_LIMIT_KEY = 'icon_generation_count';
const RATE_LIMIT_RESET_KEY = 'icon_generation_reset';
const DAILY_LIMIT = 3; // 3 free generations per day

function checkRateLimit(): boolean {
  const count = parseInt(localStorage.getItem(RATE_LIMIT_KEY) || '0');
  const resetTime = parseInt(localStorage.getItem(RATE_LIMIT_RESET_KEY) || '0');
  const now = Date.now();

  // Reset count if it's a new day
  if (now > resetTime) {
    localStorage.setItem(RATE_LIMIT_KEY, '0');
    localStorage.setItem(RATE_LIMIT_RESET_KEY, String(now + 24 * 60 * 60 * 1000));
    return true;
  }

  return count < DAILY_LIMIT;
}

function incrementRateLimit() {
  const count = parseInt(localStorage.getItem(RATE_LIMIT_KEY) || '0');
  localStorage.setItem(RATE_LIMIT_KEY, String(count + 1));
}

export async function generateIcon(description: string, isAuthenticated: boolean = false): Promise<string> {
  try {
    // Check rate limit for non-authenticated users
    if (!isAuthenticated && !checkRateLimit()) {
      throw new Error('Daily free generation limit reached. Please sign up to continue generating icons.');
    }

    const prompt = `Create a simple, minimalist vector-style icon of ${description}. The icon should have a white background and be suitable for use in a user interface. Use clean lines and simple shapes.`;

    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt: prompt,
    });

    if (!response.data?.[0]?.b64_json) {
      throw new Error('No image data returned from OpenAI');
    }

    // Increment rate limit for non-authenticated users
    if (!isAuthenticated) {
      incrementRateLimit();
    }

    const base64Image = response.data[0].b64_json;
    const imageDataUrl = `data:image/png;base64,${base64Image}`;
    
    return `<img src="${imageDataUrl}" alt="${description}" class="w-full h-full object-contain" />`;
  } catch (error) {
    console.error('Error generating icon:', error);
    throw error;
  }
} 