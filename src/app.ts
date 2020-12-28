import * as express from 'express';
import { Application } from 'express';
import LoggerService from './services/logger/LoggerService';

class App {
  public app: Application;
  public port: number;
  public host: string;
  public logger;

  constructor(appInit: { port: number; host: string; middleWares: any; controllers: any }) {
    this.app = express();
    this.port = appInit.port;
    this.host = appInit.host;
    this.logger = LoggerService.logger;

    this.middlewares(appInit.middleWares);
    this.routes(appInit.controllers);
    this.assets();
    this.template();
  }

  private middlewares(middleWares: { forEach: (arg0: (middleWare?: any) => void) => void }) {
    middleWares.forEach((middleWare) => {
      this.app.use(middleWare);
    });
  }

  private routes(controllers: { forEach: (arg0: (controller: any) => void) => void }) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  private assets() {
    this.app.use(express.static('public'));
    this.app.use(express.static('views'));
  }

  private template() {
    this.app.set('view engine', 'pug');
  }

  public listen(): void {
    this.app.listen(this.port, this.host, () => {
      this.logger.debug('Server is up', {
        host: this.host,
        port: this.port,
      });
    });
  }
}

export default App;
