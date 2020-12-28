import { isSymbol, cloneDeepWith } from 'lodash';
import * as winston from 'winston';

const REDACT_REPLACE_KEYS = [
  /passw(or)?d/i,
  /^pw$/i,
  /^pass$/i,
  /secret/i,
  /token/i,
  /api[-._]?key/i,
  /session[-._]?id/i,
  /^connect\.sid$/i,
  /authorization/i,
  /cookie/i,
];
const REDACT_REPLACE_BY = '*';

export default class ObjectRedactorService {
  static shouldRedact(key: string | number | undefined): boolean {
    return key && !isSymbol(key) && REDACT_REPLACE_KEYS.some((regex) => regex.test(key.toString()));
  }

  static redact(info?: winston.Logform.TransformableInfo): winston.Logform.TransformableInfo {
    return cloneDeepWith(info, (_: any, key: string | number | undefined) => {
      if (this.shouldRedact(key)) {
        return REDACT_REPLACE_BY;
      }
      return undefined;
    });
  }
}
