import { WebClient } from '@slack/web-api';
import * as config from 'config';

import SlackAction from './SlackAction';
import employeeAdressChangeView from '../blocks/employeeAdressChangeView';

export default class EmployeeAdressChangeAction extends SlackAction {
  private static webClient = new WebClient(config.get('slack.botToken'));
  static actionId = 'employeeAddress.change';

  static async try(payload, respond): Promise<void> {
    await this.webClient.views.open(
      employeeAdressChangeView(payload.trigger_id, payload.response_url),
    );
  }

  static async catch(error): Promise<void> {
    return;
  }

  static async finally(): Promise<void> {
    return;
  }
}
