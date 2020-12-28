declare module 'http' {
  export interface IncomingMessage {
    rawBody?: any;
    body?: any;
  }
}
