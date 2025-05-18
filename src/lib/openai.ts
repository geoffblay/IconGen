// Remove all imports and unused code
export async function generateIcon(description: string): Promise<string> {
  console.log('Sending request to generate icon:', description);
  console.log('Environment:', process.env.NODE_ENV);
  try {
    const response = await fetch('/api/generate-icon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description }),
    });

    console.log('Response status:', response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Failed to generate icon: ${errorText}`);
    }

    const data = await response.json();
    console.log('Received data:', data);
    if (!data.png) {
      console.error('No PNG in response:', data);
      throw new Error('No PNG data received');
    }
    return data.png;
  } catch (error) {
    console.error('Error in generateIcon:', error);
    throw error;
  }
} 