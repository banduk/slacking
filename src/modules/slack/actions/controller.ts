import * as config from 'config';
import { createMessageAdapter } from '@slack/interactive-messages';

import EmployeeAdressChangeAction from '../../../store/actions/EmployeeAdressChangeAction';
import EmployeeAdressChangedAction from '../../../store/viewSubmissions/EmployeeAdressChangedViewSubmission';
import EmployeeAdressNotChangedAction from '../../../store/actions/EmployeeAdressNotChangedAction';

import * as express from 'express';
import IControllerBase from 'interfaces/IControllerBase.interface';

export default class SlackActionsController implements IControllerBase {
  public path = '/slack/actions';
  public router: express.Router = express.Router();
  private slackInteractions = createMessageAdapter(config.get('slack.signingSecret'));

  constructor() {
    this.attachRegisteredHandlers();
    this.initRoutes();
  }

  attachRegisteredHandlers(): void {
    EmployeeAdressChangeAction.registerAction(this.slackInteractions);
    EmployeeAdressNotChangedAction.registerAction(this.slackInteractions);
    EmployeeAdressChangedAction.registerViewSubmission(this.slackInteractions);
  }

  initRoutes(): void {
    this.router.post(this.path, this.slackInteractions.expressMiddleware());
  }
}
