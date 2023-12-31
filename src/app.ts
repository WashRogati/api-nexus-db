import express from 'express';
import 'dotenv/config';
import routes from './routes';
import cors from 'cors';

const app = express();

const PORT = 8000;

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost', 'http://10.0.0.173:8081'], // allowedOrigins
  methods: ['GET', 'POST', 'PUT'], // allowedMethods
  allowedHeaders: ['Content-Type', 'Authorization'], // allowedHeaders
  credentials: true, // allowCredentials
  exposedHeaders: ['Special-Response-Header'], // exposedResponseHeaders
  maxAge: 6000, // maxAge in seconds
};

app.use(cors(corsOptions));

app.use(express.json());
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
