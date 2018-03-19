module.exports = {
  development: {
    client: "pg",
    connection: "postgres://localhost/bucket_three"
  },

  production: {
    client: "postgresql",
    connection: process.env.DATABASE_URL
  }
};
