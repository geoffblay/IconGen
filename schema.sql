-- Enable RLS
ALTER TABLE credits ENABLE ROW LEVEL SECURITY;

-- Drop existing objects if they exist
DROP FUNCTION IF EXISTS get_user_credit_balance;
DROP TABLE IF EXISTS credits;

-- Create credits table
CREATE TABLE credits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    amount INTEGER NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('purchase', 'usage', 'bonus')),
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create index for faster queries
CREATE INDEX credits_user_id_idx ON credits(user_id);
CREATE INDEX credits_created_at_idx ON credits(created_at);

-- Create function to get user's credit balance
CREATE OR REPLACE FUNCTION get_user_credit_balance(p_user_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN COALESCE(
        (SELECT SUM(amount) 
         FROM credits 
         WHERE user_id = p_user_id),
        0
    );
END;
$$;

-- RLS Policies
-- Allow users to view their own credits
CREATE POLICY "Users can view their own credits"
ON credits FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Allow users to insert their own credits
CREATE POLICY "Users can insert their own credits"
ON credits FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own credits
CREATE POLICY "Users can update their own credits"
ON credits FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own credits
CREATE POLICY "Users can delete their own credits"
ON credits FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON credits TO authenticated;
GRANT EXECUTE ON FUNCTION get_user_credit_balance TO authenticated; 