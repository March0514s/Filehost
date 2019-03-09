const FilesModel = require('./model');
const blockExternalAccess = require('../../hooks/blockExternalAccess');
const dbService = require('feathers-nedb');

exports.endpointPrefix = '/api/files';

exports.register = app => {
  app.use(exports.endpointPrefix, dbService({
    Model: FilesModel,
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
        blockExternalAccess(404),
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
