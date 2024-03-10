const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

const AppController = {
  getStatus: (req, res) => {
    const status = {
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    };
    res.status(200).send(status);
  },
  getStats: async (req, res) => {
    const users = await dbClient.nbUsers();
    const files = await dbClient.nbFiles();
    const stats = {
      users,
      files,
    };
    res.status(200).send(stats);
  },
};

module.exports = AppController;
