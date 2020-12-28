import { stringify as stringifyQs } from 'querystring';
import { Request, Response } from 'express';
import { format as urlFormat } from 'url';
import LoggerFactory from './LoggerFactory';

export default class RequestLoggerService {
  static logger = LoggerFactory.create();

  static getHref(req: Request) {
    const queryObj: any = req.query;
    const queryStr = stringifyQs(queryObj);
    return urlFormat({
      protocol: req.protocol,
      hostname: req.hostname,
      pathname: req.path,
      search: queryStr,
    });
  }

  static getMessage(req: Request, res: Response) {
    return [req.method.toUpperCase(), this.getHref(req).split('?')[0]].join(' ');
  }

  static getUserInfo(req: Request, res: Response) {
    const adminId = req.get('X-PIER-ADMIN-ID');
    if (adminId) {
      return { id: adminId, role: 'pier-admin' };
    }

    const userId = req.get('X-PIER-USER-ID');
    if (userId) {
      return { id: userId, role: 'pier-user' };
    }

    return { role: 'anonymous' };
  }

  static getRequestContext(req: Request, res: Response) {
    return {
      user: this.getUserInfo(req, res),
      correlation_id: req.context.correlationId,
      request_id: req.context.requestId,
    };
  }

  static getRequestData(req: Request, res: Response) {
    return {
      href: this.getHref(req),
      body: req.body,
      queryString: req.query,
      headers: req.headers,
    };
  }

  static getResposeData(req: Request, res: Response) {
    return {
      status: res.statusCode,
      type: res.get('Content-Type'),
      body: res.body,
    };
  }

  static getFields(req: Request, res: Response, startedAt: number) {
    return {
      duration: Date.now() - startedAt,
      context: this.getRequestContext(req, res),
      request: this.getRequestData(req, res),
      response: this.getResposeData(req, res),
    };
  }

  static log(req: Request, res: Response, startedAt: number) {
    this.logger.info(this.getMessage(req, res), {
      type: 'http',
      fields: this.getFields(req, res, startedAt),
    });
  }
}
