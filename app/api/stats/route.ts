import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Use service role if possible for safe increments, but anon works with RLS
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("app_stats")
      .select("download_count")
      .single();

    if (error) {
      // If table empty or error, return 0
      return NextResponse.json({ download_count: 0 });
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ download_count: 0 });
  }
}

export async function POST() {
  try {
    // Increment the download_count using Supabase RPC or just a manual update if single row
    // RPC is safer for concurrency: create function increment_download_count() ...
    // For now, let's do a simple select-then-update or just handle it via RPC if user adds it.
    
    // Attempting a simple increment via manual update for now
    const { data: currentStats } = await supabase.from("app_stats").select("download_count").single();
    const currentCount = currentStats?.download_count || 0;

    const { error } = await supabase
      .from("app_stats")
      .update({ download_count: currentCount + 1 })
      .eq('id', 1); // Assuming we use id 1 for global stats

    if (error) throw error;

    return NextResponse.json({ success: true, new_count: currentCount + 1 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
