const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    this.url = `mongodb://${this.host}:${this.port}`;
    this.client = new MongoClient(this.url, { useUnifiedTopology: true });
    this.isConnected = false;
    // this.client.connect((err) => {
    //   if (err) {
    //     this.isConnected = false;
    //     console.log(err.message);
    //   } else {
    //     this.isConnected = true;
    //     this.db = this.client.db(this.database);
    //   }
    // });
    this.client.connect()
      .then(() => {
        this.isConnected = true;
        this.db = this.client.db(this.database);

        this.client.on('close', () => {
          this.isConnected = false;
        });

        this.client.on('reconnect', () => {
          this.isConnected = true;
        });
      })
      .catch((err) => {
        console.log('could not connect to MongoDB: ', err);
      });
  }

  isAlive() {
    return this.isConnected;
  }

  async nbUsers() {
    try {
      const usersCount = await this.db.collection('users').countDocuments();
      return usersCount;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async nbFiles() {
    try {
      const fileCount = await this.db.collection('files').countDocuments();
      return fileCount;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
