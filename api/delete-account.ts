import { createClient } from '@supabase/supabase-js';
import { VercelRequest, VercelResponse } from '@vercel/node';

// Load from Vercel's environment variables (safe)
const supabaseAdmin = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Make sure this is the service role key, never expose in frontend
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }

  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

  if (error) {  
    console.error(error);
    return res.status(500).json({ error: 'Failed to delete user.' });
  }

  return res.status(200).json({ success: true });
}
