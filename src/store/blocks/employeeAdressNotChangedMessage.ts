import { ChatPostMessageArguments } from '@slack/web-api';

// Built using https://app.slack.com/block-kit-builder
export default (channel: string): ChatPostMessageArguments => ({
  channel: channel,
  text: '',
  replace_original: true,
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
            text: 'Obrigado, mantivemos o endereço anterior :two_hearts:',
          },
        },
      ],
    },
  ],
});
