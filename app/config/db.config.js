module.exports = {
  HOST: "localhost",
  Tutorial: "postgres",
  PASSWORD: "demoPassword",
  DB: "postgres",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
