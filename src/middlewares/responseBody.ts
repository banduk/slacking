import { Request, Response, NextFunction } from 'express';

const responseBodyMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const defaultWrite = res.write;
  const defaultEnd = res.end;
  const chunks = [];

  res.write = (chunk: string, ...restArgs): boolean => {
    chunks.push(Buffer.from(chunk));
    defaultWrite.apply(res, ...[chunk, ...restArgs]);
    return true;
  };

  res.end = (...restArgs) => {
    if (restArgs[0]) {
      chunks.push(Buffer.from(restArgs[0]));
    }
    res.body = Buffer.concat(chunks).toString('utf8');
    defaultEnd.apply(res, restArgs);
  };

  next();
};

export default responseBodyMiddleware;
