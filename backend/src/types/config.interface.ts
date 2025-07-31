import type ms from 'ms'

export interface Config {
  PORT: number;
  NODE_ENV: string | undefined;
  WHITELIST_ORIGINS: string[];
  MONGO_URI: string | undefined ;
  LOG_LEVEL: string;
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
  ACCESS_TOKEN_EXPIRY: ms.StringValue;
  REFRESH_TOKEN_EXPIRY: ms.StringValue;
}   