// Remove all imports and unused code
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