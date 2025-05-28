import { NextResponse } from "next/server";
import { SECRET } from "@/lib/auth";
import { cookieOpts } from "@/lib/cookies";
import { SESSION_COOKIE } from "@/lib/constants";
import * as jose from "jose";

// Debug logs
console.log("Login Route - JWT_SECRET exists:", !!process.env.JWT_SECRET);
console.log("Login Route - SECRET exists:", !!SECRET);
console.log("Login Route - SECRET length:", SECRET?.length);

if (!SECRET) {
  console.warn("No JWT_SECRET found!");
}

const validUsers = {
  "milan-corp": { username: "milan", password: "milan123" },
  "vimal-co": { username: "vimal", password: "vimal123" },
  "abc-corp": { username: "admin", password: "admin123" },
};

export async function POST(req) {
  const { tenant, username, password } = await req.json();
  const record = validUsers[tenant];
  if (!record || record.username !== username || record.password !== password) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  try {
    const payload = {
      tenant,
      username,
      iat: Math.floor(Date.now() / 1000),
    };

    const token = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("2h")
      .sign(SECRET);

    const res = NextResponse.json({ success: true });
    res.cookies.set(SESSION_COOKIE, token, cookieOpts);
    return res;
  } catch (err) {
    console.error("Login Route - JWT signing error:", err.message);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
