import express from 'express';
import cors from 'cors';

import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import http from 'http';
import { ORMFunctions } from './model/orm';

import { version, description, author } from '../package.json';
import { Console } from './utils/console';
import { Loader } from './utils/init';
import { Configuration } from './env/configuration';

import { SystemRoutes } from './routes/system';

const { SERVER, PORT, APPNAME } = Configuration;

//cargando variables de configuracion

// extendiendo de https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'API Event Checker',
      description: description,
      contact: {
        name: author
      },
      servers: [`http://${SERVER}:${PORT}`, `https://${APPNAME}.herokuapp.com`]
    }
  },
  apis: ['src/routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
const app = express();

// configurando express
app.set('port', PORT);
app.set('json spaces', 2);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(SystemRoutes);
// app.use('/api', AuthenticationRoutes)
// app.use('/api', UsersRoutes)
// app.use('/api', AvatarsRoutes)
// app.use('/api', GroupsRoutes)
// app.use('/api', MessagesRoutes)

app.use(express.static('dist'));

const httpServer = http.createServer(app);

const StartSequelize = async () => {
  await ORMFunctions.Start();
  await Loader();
};

httpServer.listen(PORT, SERVER, () => {
  StartSequelize();
  Console.Info(`API v${version}, Server Started at: http://${SERVER}:${PORT} ☕`);
});

//! Run Socket
// Listener.Socket(httpServer);
