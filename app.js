// TODO: Implement VFS / fix accessPolicy for multi-user files.
// TODO: Implement proper password validation (use bcrypt).
// TODO: Implement usersService.
// TODO: Replace hardcoded credentials with calls to usersService.

const conf = require('./config');
const express = require('@feathersjs/express');
const feathers = require('@feathersjs/feathers');
const jwt = require('./jwt');
const testAccessPolicy = require('./utils/testAccessPolicy');
const handleAccessPolicyViolation = require('./utils/handleAccessPolicyViolation');
const { dirEntriesService } = require('./entities/dirEntry');
const { sessionsService } = require('./entities/session');
const { uploadsService } = require('./entities/upload');

const app = express(feathers());

// This is for regular API body parsing.
app.use(express.json());

// This is just for easily testing uploads using data URIs.
app.use(express.urlencoded({ extended: true }));

// Setup Feathers' "REST" transport.
app.configure(express.rest());

// Expose the underlying request to Feathers services and
// hooks.
app.use(async (req, res, next) => {
  req.feathers.req = req;
  next();
});

// Verify Authorization header (if present) and place the
// parsed token data in req.feathers.token.
app.use(async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(req.headers);
  if (!authorization) {
    return next();
  }

  try {
    req.token = req.feathers.token = (
      await jwt.verify(authorization)
    );
  } catch(err) {
    return res.status(401).send(
      `Invalid authorization token.`,
    );
  }

  next();
});

// Serve static files from public directory.
app.use(express.static(conf.publicDir));

// Redirect file requests with no slug.
app.get('/files/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const entry = await dirEntriesService.instance.get(id);

    if (!testAccessPolicy(req, entry)) {
      return handleAccessPolicyViolation(req, res, entry);
    }

    if (!entry || entry.type !== 'file') {
      return res.sendStatus(404);
    }

    res.redirect(`/files/${id}/${entry.name}`);
  }
  catch (err) {
    console.error(err);
    res.send(err);
  }
});

// Serve uploaded files.
app.get('/files/:id/:slug', async (req, res) => {
  try {
    const { id } = req.params;

    const entry = await dirEntriesService.instance.get(id);

    if (!testAccessPolicy(req, entry)) {
      return handleAccessPolicyViolation(req, res, entry);
    }

    if (!entry || entry.type !== 'file') {
      return res.sendStatus(404);
    }

    const upload = (await uploadsService.instance.find({
      query: {
        _id: entry.uploadId,
        status: 'success',
      },
    }))[0];

    if (!upload) {
      throw new Error(
        `File found with no matching upload.`
      );
    }

    res.set('Content-Type', upload.mime);
    res.sendFile(`${conf.uploadsDir}/${upload.hash}`);
  }
  catch (err) {
    console.error(err);
    res.send(err);
  }
});

// Serve index.html for all other non-API requests.
app.use((req, res, next) => {
  if (req.originalUrl.startsWith('/api')) {
    return next();
  }

  res.sendFile(`${conf.publicDir}/index.html`);
});

// Register Feathers application services.
dirEntriesService.register(app);
sessionsService.register(app);
uploadsService.register(app);

// Listen to incoming HTTP requests.
app.listen(conf.serverPort);
console.log(`Listening on port ${conf.serverPort}.`);
