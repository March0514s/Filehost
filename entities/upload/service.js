const UploadsModel = require('./model');
const blockExternalAccess = require('../../hooks/blockExternalAccess');
const conf = require('../../config');
const dbService = require('feathers-nedb');
const parseUploadBody = require('../../utils/parseUploadBody');
const requireAuthToken = require('../../hooks/requireAuthToken');
const upload = require('../../utils/upload');

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

          const { fields } = ctx.st.bodyParser;

          ctx.data = {
            uploader: null,
            size: null,
            hash: null,
            mime: null,
            resumeMode: null,
            status: null,
            startTime: null,
            endTime: null,
          };

          for (const [k, field] of Object.entries(fields)) {
            // TODO: Field validations / sanitization.
            ctx.data[k] = field.val;
          }

          for (const k of ['size', 'hash']) {
            if (!ctx.data[k]) {
              throw new Error(`Missing ${k}.`);
            }
          }

          ctx.data = {
            ...ctx.data,

            uploader: req.token.user,
            mime: ctx.st.file.mime,
            resumeMode: 'overwrite',
            status: 'uploading',
            startTime: Date.now(),
            endTime: null,
          };
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

            ctx.result = await serviceInstance.patch(
              ctx.result._id, {
                status: 'success',
                endTime: Date.now(),
              },
            );
          }
          catch (err) {
            await serviceInstance.patch(ctx.result._id, {
              status: 'failed',
              endTime: Date.now(),
            });

            throw err;
          }
        },
      ],
    },
  });
};
