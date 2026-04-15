import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { rating, comment, user_name, token } = await req.json();

    // 1. Verify reCAPTCHA token with Google
    const params = new URLSearchParams();
    params.append("secret", process.env.RECAPTCHA_SECRET || "");
    params.append("response", token);

    const recaptchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success) {
      return NextResponse.json(
        { error: "reCAPTCHA verification failed. Are you a robot?" },
        { status: 400 }
      );
    }

    // 2. Initialize Supabase (Server-side)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON || "";

    if (!supabaseUrl || !supabaseAnonKey) {
       throw new Error("Supabase credentials missing on server");
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // 3. Insert data into Supabase
    const { error } = await supabase.from("feedback").insert([
      {
        rating,
        comment,
        user_name: user_name || "Anonymous User",
      },
    ]);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to process feedback" },
      { status: 500 }
    );
  }
}
