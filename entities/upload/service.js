const UploadsModel = require('./model');
const blockExternalAccess = require('../../hooks/blockExternalAccess');
const conf = require('../../config');
const dbService = require('feathers-nedb');
const parseUploadBody = require('../../utils/parseUploadBody');
const requireAuthToken = require('../../hooks/requireAuthToken');
const upload = require('../../utils/upload');
const { filesService } = require('../file');

exports.endpointPrefix = '/api/uploads';

exports.register = app => {
  app.use(exports.endpointPrefix, dbService({
    Model: UploadsModel,
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
        requireAuthToken(),

        async ctx => {
          const { req } = ctx.params;

          ctx.st = {};

          ctx.st.bodyParser = parseUploadBody(req);
          ctx.st.file = await ctx.st.bodyParser.file;

          ctx.data = {
            createdBy: null,
            status: null,
            resumeMode: 'overwrite',
            size: null,
            hash: null,

            // Store all other non-file fields so far.
            ...ctx.st.bodyParser.fields,
          };

          for (const [k, field] of Object.entries(
            ctx.st.bodyParser.fields,
          )) {
            ctx.data[k] = field.val;
          }

          for (const k of ['size', 'hash']) {
            if (!ctx.data[k]) {
              throw new Error(`Missing ${k}.`);
            }
          }

          ctx.data.createdBy = ctx.params.token.user;
          ctx.data.status = 'uploading';
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

    after: {
      create: [
        async ctx => {
          try {
            await upload({
              tmpUploadsDir: conf.tmpUploadsDir,
              uploadsDir: conf.uploadsDir,
              resumeMode: ctx.data.resumeMode,
              size: ctx.data.size,
              hash: ctx.data.hash,
              stream: ctx.st.file.stream,
            });

            await ctx.st.bodyParser.finished;

            const createdFile = (
              await filesService.instance.create({
                createdBy: ctx.params.token.user,
                size: ctx.data.size,
                hash: ctx.data.hash,
                mime: ctx.st.file.mime,
                accessPolicy: 'auth',
              })
            );

            ctx.result = await serviceInstance.patch(
              ctx.result._id, {
                status: 'success',
              },
            );

            ctx.result.createdFile = createdFile;
          }
          catch (err) {
            await serviceInstance.patch(ctx.result._id, {
              status: 'failed',
            });

            throw err;
          }
        },
      ],
    },
  });
};
