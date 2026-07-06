import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://wczmubqujwsqffofnvpg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_wv9XgY8qxw0TX9EoHK9xkQ_YNDhVILy";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
