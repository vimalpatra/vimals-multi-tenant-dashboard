export const encoder = new TextEncoder();
export const SECRET = encoder.encode(process.env.JWT_SECRET);
