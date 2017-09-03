if (!process.env.JWT_SECRET && process.env.NODE_ENV === 'production') {
  throw new Error('JWT_SECRET env variable not set in production mode')
}

export default {
  secretOrKey: process.env.JWT_SECRET || "supersecretkey",
  claims: {
    issuer: "localhost",
    audience: "localhost",
    expiresIn: "365d"
  }
}
