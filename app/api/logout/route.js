import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/constants";
import { clearCookieOpts } from "@/lib/cookies";

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(SESSION_COOKIE, "", clearCookieOpts);
  return res;
}
