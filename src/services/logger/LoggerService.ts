import { Logger } from 'winston';
import LoggerFactory from './LoggerFactory';

export default class LoggerService {
  static logger: Logger = LoggerFactory.create();
}
