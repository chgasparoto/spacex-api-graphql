const Dataloader = require('dataloader');
const express = require('express');
const expressGraphQL = require('express-graphql');
const cors = require('cors');
const schema = require('./schema/schema');
const { fetchRockets } = require('./helpers/fetch');

const app = express();

app.use('/graphql', cors(), expressGraphQL(() => {
  const cacheMap = new Map();
  const rocketLoader = new Dataloader(keys => Promise.all(keys.map(fetchRockets)), { cacheMap });

  const loaders = {
    rocket: rocketLoader,
  };

  return {
    context: { loaders },
    grapiql: true,
    schema,
  };
}));

// 404 Error Handler
app.use((req, res) => {
  res.status(404);
  res.json({
    error: 'No results found',
  });
});

// generic error handler - must have 4 parameters
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500);
  res.json({
    error: 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`GraphQL Server running at port ${PORT}`);
});

module.exports = app;
