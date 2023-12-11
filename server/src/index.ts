import express from 'express';
import helmet from "helmet";
import morgan from "morgan";
import uploadFile from "express-fileupload"
import cookieParser from 'cookie-parser';
import * as cors from "cors";
import { Server } from 'socket.io';
import { createServer } from 'node:http';

import route from './routes';
import config from './configs/env';
import * as database from '@/configs/database';
import * as redis from './configs/redis';
import * as mailer from "@/utils/send_mail";
// Initialize application
const app = express();
const port = config.PORT;
const server = createServer(app);

// Initialize middleware
app.use(morgan(process.env.NODE_ENV === 'dev' ? "dev" : "tiny"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  uploadFile({
    useTempFiles: true,
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

app.use(cors.default({
  origin: config.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  optionsSuccessStatus: 200
}))

// Initialize routes
route(app);

const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('test', 'Hello Testing event!');
});

if (require.main === module) {
  server.listen(port, async () => {
    await redis.startup();
    console.log("📕 [redis]: Connected to redis");
    await database.connect();
    console.log("📒 [mongo]: Connected to mysql");
    // await mailer.startup();
    // console.log("💌 [database]: Connected to mailer");

    console.log(`✅ [server]: Server is running at http://localhost:${port}`);
  });
}

export default app;