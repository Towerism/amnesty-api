module.exports = {
  development: {
    dialect: "sqlite",
    storage: "db.development.sqlite"
  },
  test: {
    dialect: "sqlite",
    storage: ":memory:"
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "d3evnnsjpv32p9",
    host: "ec2-107-22-251-55.compute-1.amazonaws.com",
    dialect: "postgres"
  }
}
