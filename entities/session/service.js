const SessionsModel = require('./model');
const blockExternalAccess = require('../../hooks/blockExternalAccess');
const dbService = require('feathers-nedb');
const jwt = require('../../jwt');

const users = {
  arthur: '123456',
  gui: '123',
  marcus: '1234',
};

exports.endpointPrefix = '/api/sessions';

exports.register = app => {
  app.use(exports.endpointPrefix, dbService({
    Model: SessionsModel,
  }));

  const serviceInstance = exports.instance = (
    app.service(exports.endpointPrefix)
  );

  serviceInstance.hooks({
    before: {
      find: [
        blockExternalAccess(404),
      ],

      get: [
        blockExternalAccess(404),
      ],

      create: [
        async ctx => {
          const { user, password } = ctx.data;
          const actualUserPassword = users[user];

          if (
            !actualUserPassword ||
            actualUserPassword !== password
          ) {
            return blockExternalAccess(401)(ctx);
          }

          ctx.data = {
            user,
            token: await jwt.sign({ user }),
          };

          return ctx;
        },
      ],

      update: [
        blockExternalAccess(404),
      ],

      patch: [
        blockExternalAccess(404),
      ],

      remove: [
        blockExternalAccess(404),
      ],
    },
  });
};
