import { Request, Response, NextFunction } from 'express';
import { v4 as uuidV4 } from 'uuid';

const correlationIdMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const requestId = uuidV4();
  const correlationId = req.get('x-correlation-id') || requestId;

  req.context = req.context || {};
  req.context.requestId = requestId;
  req.context.correlationId = correlationId;

  res.set('x-correlation-id', correlationId);
  next();
};

export default correlationIdMiddleware;
