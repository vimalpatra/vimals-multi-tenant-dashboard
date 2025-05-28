export const encoder = new TextEncoder();

// Debug logs
console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);
console.log("JWT_SECRET length:", process.env.JWT_SECRET?.length);

export const SECRET = encoder.encode(process.env.JWT_SECRET);
