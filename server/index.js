const express = require('express');
const http = require('http');
const next = require('next');
const { JolocomLib } = require('jolocom-lib');
const bodyParser = require('body-parser');
const cors = require('cors');

const { DbWatcher } = require('./dbWatcher');
const { configureRoutes } = require('./routes');
const { configureRedisClient } = require('./redis');
const { configureSockets } = require('./sockets');
const { privateIdentityKey } = require('../config');


const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();
const app = express();
const server = new http.Server(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const { getAsync, setAsync, delAsync } = configureRedisClient();
const registry = JolocomLib.registry.jolocom.create();

configureRoutes(app, { setAsync, getAsync, delAsync });
registry.authenticate(privateIdentityKey)
  .then(identityWallet => {
    console.log(identityWallet);
    configureSockets(server, identityWallet, new DbWatcher(getAsync), { getAsync, setAsync, delAsync });
  })
  .catch(e => console.log(e));

nextApp.prepare()
  .then(() => {
    app.get('*', (req, res) => nextHandler(req, res));

    server.listen(port, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:' + port);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
