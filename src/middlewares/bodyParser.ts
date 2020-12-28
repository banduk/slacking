import * as bodyParser from 'body-parser';
import { Request, Response, NextFunction } from 'express';

const jsonParser = bodyParser.json({
  verify: (req, res, buff) => (req.rawBody = buff),
});

const urlEncodeParser = bodyParser.urlencoded({
  extended: true,
  verify: (req, res, buff) => (req.rawBody = buff),
});

// Slack integration requires us to provide the rawBody so the lib can verify the request signature
//
// This middleware guarantees we have `req.rawBody` to all json/urlencoded requests and also
// parses slack json bodies to ease debug
const bodyParserMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  urlEncodeParser(req, res, () =>
    jsonParser(req, res, () => {
      if (
        req.path == '/slack/actions' &&
        req.body.payload &&
        typeof req.body.payload === 'string'
      ) {
        req.body.payload = JSON.parse(req.body.payload);
        next();
      }
    }),
  );
};

export default bodyParserMiddleware;
