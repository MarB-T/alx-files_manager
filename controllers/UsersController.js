// Create new user in the DB
import { sha1HashPassword } from '../utils/security';

const dbClient = require('../utils/db');
// const redisClient = require('../utils/redis');

const UserController = {
  postUser: async (req, res) => {
    const { email, password } = req.body;
    if (!email) return res.status(400).send({ error: 'Missing email' });
    if (!password) return res.status(400).send({ error: 'Missing password' });
    if (await dbClient.nbUsers({ email })) return res.status(400).send({ error: 'Already exist' });

    const hashedPassword = sha1HashPassword(password);
    const newUser = { email, password: hashedPassword };

    const addedUser = await dbClient.addNewUser(newUser);
    return res.status(201).json({ email, id: addedUser.id });
  },
};

module.exports = UserController;
