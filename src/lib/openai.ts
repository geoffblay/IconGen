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

export async function generateIcon(description: string): Promise<string> {
  const response = await fetch('/api/generate-icon', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ description }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate icon');
  }

  const data = await response.json();
  return data.svg;
} 