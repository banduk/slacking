import SlackAction from './SlackAction';
import employeeAdressNotChangedMessage from '../blocks/employeeAdressNotChangedMessage';

export default class EmployeeAdressNotChangedAction extends SlackAction {
  static actionId = 'employeeAddress.notChanged';

  static async try(payload, respond): Promise<void> {
    respond(employeeAdressNotChangedMessage(payload.channel.id));
  }

  static async catch(error): Promise<void> {
    return;
  }

  static async finally(): Promise<void> {
    return;
  }
}
