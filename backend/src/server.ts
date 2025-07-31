import "module-alias/register";
import express from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";

import { connectToDatabase, disconnectFromDatabase } from "@/lib/mongoose";
import limiter from "@/lib/express_rate_limit";
import { logger } from "@/lib/winston";
import corsOptions from "@/lib/corsOptions";

import config from "@/config";
import v1Routes from "@/routes/v1";

dotenv.config();

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cookieParser());
app.use(limiter);
app.use(express.urlencoded({ extended: true }));
app.use(
  compression({
    threshold: 1024,
  })
);

const startServer = async () => {
  try {
    await connectToDatabase();

    app.use("/api/v1", v1Routes);

    app.listen(config.PORT, () => {
      logger.info(`Server is running: http://localhost:${config.PORT}`);
    });
  } catch (err) {
    logger.error(`Failed to start the Server`, err);

    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
  }
};

startServer();

const handleServerShutdown = async () => {
  try {
    logger.warn("Server SHUTDOWN");
    await disconnectFromDatabase();
    process.exit(0);
  } catch (err) {
    logger.error("Error during server shutdown", err);
    process.exit(1);
  }
};

process.on("SIGTERM", handleServerShutdown);
process.on("SIGINT", handleServerShutdown);
