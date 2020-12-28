import * as winston from 'winston';

const ROOT_FIELDS: Array<string> = ['env', 'app', 'level', 'timestamp', 'message', 'type'];

const FIELD_TO_NEST = 'fields';

export default class FieldNestesService {
  static isRoot(rootFields: Array<string>, field: string): boolean {
    return rootFields.includes(field);
  }

  static nest(
    info?: winston.Logform.TransformableInfo,
    rootFields: Array<string> = ROOT_FIELDS,
    fieldToNest: string = FIELD_TO_NEST,
  ): winston.Logform.TransformableInfo {
    const newInfo = Object.assign({}, info, { [fieldToNest]: info[fieldToNest] || {} });

    Object.keys(info).forEach((field) => {
      if (!this.isRoot(rootFields, field) && field !== fieldToNest) {
        delete newInfo[field];
        Object.assign(newInfo[fieldToNest], { [field]: info[field] });
      }
    });

    return newInfo;
  }
}
