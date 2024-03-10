const redis = require('redis');
const { promisify } = require('util');

class RedisClient {
  constructor() {
    this.isConnected = false;
    this.client = redis.createClient();
    this.isConnected = true;
    this.getAsync = promisify(this.client.get).bind(this.client);

    this.client.on('error', (err) => {
      this.isConnected = false;
      console.log(err.message);
    });
    this.client.on('connect', () => {
      this.isConnected = true;
    });
  }

  isAlive() {
    return this.isConnected;
  }

  async get(key) {
    return this.getAsync(key);
  }

  async set(key, value, duration) {
    try {
      await this.client.set(key, value, 'EX', duration);
    } catch (error) {
      console.error(error.message);
    }
  }

  async del(key) {
    try {
      await this.client.del(key);
    } catch (error) {
      console.error(error.message);
    }
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
