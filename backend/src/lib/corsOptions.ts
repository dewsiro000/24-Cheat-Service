import { CorsOptions } from 'cors';
import config from "@/config";
import { logger } from "@/lib/winston";

const corsOptions: CorsOptions = {
  origin(
    origin: string | undefined,
    callback: (err: Error | null, allowed: boolean) => void
  ) {
    if (
      config.NODE_ENV === "development" ||
      !origin ||
      config.WHITELIST_ORIGINS.includes(origin)
    ) {
      callback(null, true);
    } else {
      callback(
        new Error(`CORS error: ${origin} is not allowed by CORS`),
        false
      );
      logger.warn(`CORS error: ${origin} is not allowed by CORS`);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  
  allowedHeaders: ['Content-Type', 'Authorization'],    
  credentials: true,  
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

export default corsOptions;