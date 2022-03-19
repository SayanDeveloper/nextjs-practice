const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: 'nextjs-tester',
        mongodb_password: 'K01vemC3OOPrSoxn',
        mongodb_clustername: 'cluster0',
        mongodb_database: 'next-meetups',
      },
    };
  }

  return {
    env: {
      mongodb_username: 'nextjs-tester',
      mongodb_password: 'K01vemC3OOPrSoxn',
      mongodb_clustername: 'cluster0',
      mongodb_database: 'next-meetups',
    },
  };
};
