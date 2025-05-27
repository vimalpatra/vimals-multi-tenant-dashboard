export const cookieOpts = {
  httpOnly: true,
  path: "/",
  maxAge: 2 * 60 * 60,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
};

export const clearCookieOpts = {
  maxAge: 0,
  path: "/",
};
