import { ChatPostMessageArguments } from '@slack/web-api';

// Built using https://app.slack.com/block-kit-builder
export default (channel: string): ChatPostMessageArguments => ({
  channel: channel,
  text: '',
  attachments: [
    {
      color: '#FF80A1',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: [
              '*Olá Pier!!*',
              'Estamos atualizando os endereços de todos os Piers e gostaríamos que você atualizasse o seu!',
            ].join('\n\n'),
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: 'Seu endereço mudou?',
          },
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              action_id: 'employeeAddress.change',
              text: {
                type: 'plain_text',
                text: 'Sim :thumbsup:',
                emoji: true,
              },
              value: 'yes',
            },
            {
              type: 'button',
              action_id: 'employeeAddress.notChanged',
              text: {
                type: 'plain_text',
                text: 'Não :thumbsdown:',
                emoji: true,
              },
              value: 'no',
            },
          ],
        },
      ],
    },
  ],
});
