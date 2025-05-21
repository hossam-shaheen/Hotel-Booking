import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const subabaseUrlKey = "uolvrlaxxzpsfocsawuh";
export const subabaseUrl = `https://${subabaseUrlKey}.supabase.co`;
const subabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbHZybGF4eHpwc2ZvY3Nhd3VoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkyMTc5OTIsImV4cCI6MjA1NDc5Mzk5Mn0.grHjxq04oMGSc-j9l82cY1Nzrdc96z04WRvtduf1kJY`;
const supabase = createClient(subabaseUrl,subabaseKey);
export default supabase;
