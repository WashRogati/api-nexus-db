import 'dotenv/config';

export type Environment = {
  JWT_SECRET: string;
};

export const environment = process.env as Environment;
