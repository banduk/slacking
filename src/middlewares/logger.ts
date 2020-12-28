import { Request, Response, NextFunction } from 'express';

import RequestLoggerService from './../services/logger/RequestLoggerService';

const loggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const startedAt: number = Date.now();
  res.on('finish', () => {
    RequestLoggerService.log(req, res, startedAt);
  });
  next();
};

export default loggerMiddleware;
