import express, { Application } from 'express';
import palencaRoutes from '../routes/routes';
import cors from 'cors';

class Server {
  private app: Application;
  private port: string;
  private apiPaths: {
    root: string;
    login: string;
    profile: string;
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8000';
    this.apiPaths = {
      root: '/',
      login: '/uber/login',
      profile: '/uber/profile/:access_token',
    };
    this.middlewares();
    this.routes();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Body parsing
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.apiPaths.root, palencaRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default Server;
