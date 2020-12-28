import { Logger } from 'winston';
import { SlackMessageAdapter } from '@slack/interactive-messages/dist/adapter';

import LoggerService from '../../services/logger/LoggerService';

export default abstract class SlackAction {
  static logger: Logger = LoggerService.logger;
  static actionId: string;

  public static registerAction(slackInteractions: SlackMessageAdapter): void {
    slackInteractions.action(
      {
        actionId: this.actionId,
      },
      async (payload, respond) => {
        try {
          await this.try(payload, respond);
          this.logger.debug('Success on handling action', {
            actionId: this.actionId,
            payload: payload,
          });
        } catch (error) {
          await this.catch(error);
          this.logger.error('Error while handling action', {
            actionId: this.actionId,
            error: error,
          });
        } finally {
          await this.finally();
          this.logger.debug('After action handling (success/error)', {
            actionId: this.actionId,
          });
        }
      },
    );
  }

  static async try(payload, respond): Promise<void> {
    this.logger.debug('Static method try not implemented for subclass of SlackAction', {
      class: this.name,
    });
  }

  static async catch(error: Error): Promise<void> {
    this.logger.debug('Static method catch not implemented for subclass of SlackAction', {
      class: this.name,
    });
  }

  static async finally(): Promise<void> {
    this.logger.debug('Static method finally not implemented for subclass of SlackAction', {
      class: this.name,
    });
  }
}
