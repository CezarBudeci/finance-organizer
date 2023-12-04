import './environmet.js';
import app from './firebase/firebaseApp.js';
import http from 'http';
import expressServer from './expressServer.js';
import Config from './util/config.js';
import Logger from './util/logger.js';

const server = http.createServer(expressServer);

const port = Config.PORT || 3001;

server.listen(port, () => {
    Logger.info('Server running on port ', port);
});
