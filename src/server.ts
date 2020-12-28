import { Logger } from 'winston';
import { command } from 'yargs';
import { isMaster, fork } from 'cluster';
import * as config from 'config';

// For testing
import employeeAdressChangeMessage from './store/blocks/employeeAdressChangeMessage';
import { WebClient } from '@slack/web-api';

import App from './app';

// Logger
import LoggerService from './services/logger/LoggerService';

//  Middlewares
import bodyParserMiddleware from './middlewares/bodyParser';
import correlationIdMiddleware from './middlewares/correlationId';
import loggerMiddleware from './middlewares/logger';
import responseBodyMiddleware from './middlewares/responseBody';

// Controllers
import PostsController from './modules/posts/controller';
import HomeController from './modules/home/controller';
import SlackActionsController from './modules/slack/actions/controller';

const logger: Logger = LoggerService.logger;

const webClient = new WebClient(config.get('slack.botToken'));

export default command({
  command: 'app',
  aliases: ['a'],
  // description: 'Start application',
  handler: () => {
    const concurrency = config.get('concurrency');
    if (concurrency > 1) {
      logger.warning(
        [
          "As we're attaching slack action handlers in execution time,",
          'launching more than one thread/process may cause problems',
          'because the new handler would be atteched only to one of the',
          'process/thread.',
        ].join(' '),
      );
    }
    if (isMaster) {
      for (let i = 0; i < concurrency; i += 1) {
        fork();
      }

      // const channel = 'UL3G6JWTC'; // Mesa
      // const channel = 'UHY0LBY4R'; // Ju
      const channel = 'U9UEX0A8J'; // Banduk
      webClient.chat.postMessage(employeeAdressChangeMessage(channel));
    } else {
      const app = new App({
        port: config.get('port'),
        host: config.get('host'),
        controllers: [new HomeController(), new PostsController(), new SlackActionsController()],
        middleWares: [
          bodyParserMiddleware,
          responseBodyMiddleware,
          correlationIdMiddleware,
          loggerMiddleware,
        ],
      });

      app.listen();
    }
  },
}).help().argv;
