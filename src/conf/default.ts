export default {
  env: undefined,
  name: 'slacking',
  host: '0.0.0.0',
  port: undefined,
  // forceSSL: true,
  concurrency: 1, // Do not change
  log: {
    level: 'info',
    pretty: false,
    silent: false,
    exitOnError: false,
  },
  slack: {
    botToken: undefined,
    signingSecret: undefined,
  },
  // database: {
  //   native: true,
  //   logging: false,
  //   // TODO: use operator symbols instead!
  //   operatorsAliases: false,
  //   pool: {
  //     max: 10,
  //     min: 1,
  //     idle: 5000,
  //   },
  //   transactionConfig: {
  //     isolationLevel: 'READ COMMITTED',
  //     // isolationLevel: 'READ UNCOMMITTED',
  //     // isolationLevel: 'REPEATABLE READ',
  //     // isolationLevel: 'SERIALIZABLE',
  //   },
  // },
};
