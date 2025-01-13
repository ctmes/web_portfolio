import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Missing Supabase URL or Anon Key. Make sure your environment variables are set.",
    { supabaseUrl, supabaseAnonKey },
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test function to verify connection
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("count");
    if (error) throw error;
    console.log("Supabase connection successful:", data);
    return true;
  } catch (error) {
    console.error("Supabase connection test failed:", error);
    return false;
  }
}
