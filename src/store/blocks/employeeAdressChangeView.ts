import { ViewsOpenArguments } from '@slack/web-api';
import { stringify as stringifyQs } from 'querystring';

// Built using https://app.slack.com/block-kit-builder
export default (triggerId: string, response_url: string): ViewsOpenArguments => ({
  trigger_id: triggerId,
  view: {
    callback_id: 'employeeAddress.changed',
    title: {
      type: 'plain_text',
      text: 'Atualização de endereço',
    },
    submit: {
      type: 'plain_text',
      text: 'É isso :thumbsup:',
      emoji: true,
    },
    close: {
      type: 'plain_text',
      text: 'Cancelar',
      emoji: true,
    },
    private_metadata: stringifyQs({ response_url: response_url }),
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*É sua casa?* ',
        },
        accessory: {
          type: 'radio_buttons',
          action_id: 'employeeAddress.iLiveHere',
          options: [
            {
              text: {
                type: 'plain_text',
                text: 'Não',
                emoji: true,
              },
              value: 'false',
            },
            {
              text: {
                type: 'plain_text',
                text: 'Sim',
                emoji: true,
              },
              value: 'true',
            },
          ],
        },
      },
      {
        type: 'input',
        element: {
          type: 'plain_text_input',
          placeholder: {
            type: 'plain_text',
            text: 'Rua/Avenida/Praça/...',
          },
        },
        label: {
          type: 'plain_text',
          text: 'Endereço',
        },
      },
      {
        type: 'input',
        element: {
          type: 'plain_text_input',
          placeholder: {
            type: 'plain_text',
            text: '00',
          },
        },
        label: {
          type: 'plain_text',
          text: 'Número',
        },
      },
      {
        type: 'input',
        element: {
          type: 'plain_text_input',
          placeholder: {
            type: 'plain_text',
            text: 'apto/bloco/cjt/...',
          },
        },
        label: {
          type: 'plain_text',
          text: 'Complemento',
        },
      },
      {
        type: 'input',
        element: {
          type: 'plain_text_input',
          placeholder: {
            type: 'plain_text',
            text: 'Bairro...',
          },
        },
        label: {
          type: 'plain_text',
          text: 'Bairro',
        },
      },
      {
        type: 'input',
        element: {
          type: 'plain_text_input',
          placeholder: {
            type: 'plain_text',
            text: 'Cidade...',
          },
        },
        label: {
          type: 'plain_text',
          text: 'Cidade',
        },
      },
      {
        type: 'input',
        element: {
          type: 'plain_text_input',
          placeholder: {
            type: 'plain_text',
            text: 'Estado...',
          },
        },
        label: {
          type: 'plain_text',
          text: 'UF',
        },
      },
      {
        type: 'input',
        element: {
          type: 'plain_text_input',
          placeholder: {
            type: 'plain_text',
            text: '000000-00',
          },
        },
        label: {
          type: 'plain_text',
          text: 'CEP',
        },
      },
      {
        type: 'input',
        optional: true,
        element: {
          type: 'plain_text_input',
          placeholder: {
            type: 'plain_text',
            text: 'Qualquer outo comentário, ponto de referência, etc..',
          },
        },
        label: {
          type: 'plain_text',
          text: 'Comentários',
        },
      },
    ],
    type: 'modal',
  },
});
