const ENV = process.env.NODE_ENV || "development";

module.exports = {
  db: `album_${ENV}`
};
