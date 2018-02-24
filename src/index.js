const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

app.use(expressGraphQL({
  schema,
  graphiql: true,
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
app.listen(PORT, '0.0.0.0', () => {
  app.emit('ready');

  if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test') {
    console.log(`GraphQL Server running at http://localhost:${PORT}`);
  }
});

module.exports = app;
