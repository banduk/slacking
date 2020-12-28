import { Logger } from 'winston';
import { SlackMessageAdapter } from '@slack/interactive-messages/dist/adapter';

import LoggerService from '../../services/logger/LoggerService';

export default abstract class SlackViewSubmission {
  static logger: Logger = LoggerService.logger;
  static callbackId: string;

  public static registerViewSubmission(slackInteractions: SlackMessageAdapter): void {
    slackInteractions.viewSubmission(
      {
        callbackId: this.callbackId,
      },
      async (payload) => {
        try {
          await this.try(payload);
          this.logger.debug('Success on handling viewSubmission', {
            callbackId: this.callbackId,
            payload: payload,
          });
        } catch (error) {
          await this.catch(error);
          this.logger.error('Error while handling viewSubmission', {
            callbackId: this.callbackId,
            error: error,
          });
        } finally {
          await this.finally();
          this.logger.debug('After viewSubmission handling (success/error)', {
            callbackId: this.callbackId,
          });
        }
      },
    );
  }

  static async try(payload): Promise<void> {
    this.logger.debug('Static method try not implemented for subclass of SlackViewSubmission', {
      class: this.name,
    });
  }

  static async catch(error: Error): Promise<void> {
    this.logger.debug('Static method catch not implemented for subclass of SlackViewSubmission', {
      class: this.name,
    });
  }

  static async finally(): Promise<void> {
    this.logger.debug('Static method finally not implemented for subclass of SlackViewSubmission', {
      class: this.name,
    });
  }
}
