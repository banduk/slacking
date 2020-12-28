declare namespace Express {
  export interface Request {
    context?: any;
    rawBody?: any;
  }
  export interface Response {
    body?: any;
  }
}
