import express, { Express } from 'express';
import helmet from "helmet";
import * as cors from "cors";
import morgan from "morgan";
import cookieParser from 'cookie-parser';

import route from './routes';
import config from './configs/env.config';

// cookieParser
// SQLlite

// Initialize application
const app: Express = express();
const port = config.PORT;

// Initialize middleware
app.use(morgan(process.env.NODE_ENV === 'dev' ? "dev" : "tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(helmet());
app.use(cors.default({
  origin: config.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  optionsSuccessStatus: 200
}))

// Initialize routes
route(app);


// Start app
// true if file is executed by cmd. This lines for testing purposes
if (require.main === module) { 
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at ${config.BACKEND}`);

  });
}

export default app;