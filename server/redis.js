const { promisify } = require('util');
const redis = require('redis');

const configureRedisClient = () => {
  const client = redis.createClient({
    host: 'localhost',
    port: 6379,
  });

  client.on('error', err => {
    console.log(err);
  });

  return {
    getAsync: promisify(client.get).bind(client),
    setAsync: promisify(client.set).bind(client),
    delAsync: promisify(client.del).bind(client),
  };
};

module.exports = {
  configureRedisClient,
};
