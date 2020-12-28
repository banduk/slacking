import { parse as parseQs } from 'querystring';

import axios from 'axios';

import SlackViewSubmission from './SlackViewSubmission';
import employeeAdressUpdatedMessage from '../blocks/employeeAdressChangedMessage';

export default class EmployeeAdressChangedViewSubmission extends SlackViewSubmission {
  static callbackId = 'employeeAddress.changed';

  static async try(payload): Promise<void> {
    const parsedQs = parseQs(payload.view.private_metadata);
    const responseUrl: string = parsedQs.response_url.toString();
    axios.post(responseUrl, employeeAdressUpdatedMessage(payload.user.id));
  }

  static async catch(error): Promise<void> {
    return;
  }

  static async finally(): Promise<void> {
    return;
  }
}
