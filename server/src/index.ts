import express, { Express } from 'express';
import helmet from "helmet";
import * as cors from "cors";
import morgan from "morgan";
import cookieParser from 'cookie-parser';

import route from './routes';
import config from './configs/env';
import * as database from '@/configs/database';
import * as redis from './configs/redis';
import * as mailer from "@/utils/send_mail";
import { graphqlHTTP } from 'express-graphql';
import schema from './schema';

// Initialize application
const app: Express = express();
const port = config.PORT;


// Initialize middleware
app.use(morgan(process.env.NODE_ENV === 'dev' ? "dev" : "tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use(helmet());
app.use(cors.default({
  origin: config.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  optionsSuccessStatus: 200
}))

// Initialize routes
route(app);

app.use("/graphql/",
  graphqlHTTP({
    schema,
    graphiql: true
  }));

// Start app
if (require.main === module) { // true if file is executed by cmd. This lines for testing purposes
  // Start application
  app.listen(port, async () => {
    await redis.startup();
    console.log("📕 [database]: Connected to redis");
    await database.connect();
    console.log("📒 [database]: Connected to mysql");
    // await mailer.startup();
    // console.log("💌 [database]: Connected to mailer");

    console.log(`✅ [server]: Server is running at http://localhost:${port}`);
  });
}

export default app;