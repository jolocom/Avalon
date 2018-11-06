const express = require('express');
const http = require('http');
const next = require('next');
const { JolocomLib } = require('jolocom-lib');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const { DbWatcher } = require('./dbWatcher');
const { configureRoutes } = require('./routes');
const { configureRedisClient } = require('./redis');
const { configureSockets } = require('./sockets');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();
const app = express();
const server = new http.Server(app);
const getConfig = require('next/config').default;
const { serverRuntimeConfig } = getConfig();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const { getAsync, setAsync, delAsync } = configureRedisClient();
const registry = JolocomLib.registry.jolocom.create();

(async() => {
  try {
    const identityWallet = await registry.authenticate(serverRuntimeConfig.privateIdentityKey);
    configureRoutes(app, { setAsync, getAsync, delAsync }, identityWallet);
    configureSockets(server, identityWallet, new DbWatcher(getAsync), { getAsync, setAsync, delAsync });

    await nextApp.prepare();
    app.get('*', (req, res) => nextHandler(req, res));

    server.listen(port, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:' + port);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
