import * as config from 'config';
import { createLogger, format, transports, Logger, LoggerOptions } from 'winston';
import ObjectRedactorService from './../objectRedactor/ObjectRedactorService';
import FieldNesterService from './../fieldNester/FieldNesterService';
import { config as winstonConfig } from 'winston';

export default class LoggerFactory {
  static create(conf = {}): Logger {
    const loggerConfig: LoggerOptions = LoggerFactory.baseLogConfig(conf);
    return createLogger(loggerConfig);
  }

  static baseLogConfig(conf = {}): LoggerOptions {
    const consoleLogFormats = [
      format((info) => ObjectRedactorService.redact(info))(),
      format.timestamp(),
      format((info) => FieldNesterService.nest(info))(),
    ];

    if (config.get('log.pretty')) {
      consoleLogFormats.push(format.prettyPrint({ depth: 20, colorize: true }));
    } else {
      consoleLogFormats.push(format.json());
    }
    return {
      format: format.combine(...consoleLogFormats),
      transports: [new transports.Console()],
      level: config.get('log.level'),
      silent: config.get('log.silent'),
      exitOnError: config.get('log.exitOnError'),
      levels: winstonConfig.syslog.levels,
      defaultMeta: {
        app: config.get('name'),
        env: config.get('env'),
      },
      ...conf,
    };
  }
}
