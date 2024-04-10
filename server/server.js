const express = require('express');
const path = require('path');
const db = require('./config/connection');
const {ApolloServer} = require('@apollo/server');
const {ExpressMiddleware, expressMiddleware} = require('@apollo/server/express4');
const { authMiddleware } = require('./utils/auth');
const {typedefs, resolvers} = require('./schemas')

// Error.stackTraceLimit = 30
const PORT = process.env.PORT || 3505;
const server = new ApolloServer({
  typeDefs: typedefs,
  resolvers,
  plugins: [
    {
      requestDidStart(ctx) {
        return {
          didEncounterErrors(errors) {
            console.log("************\nError\n************")
            console.log("Query:", errors.source)
            console.log("Errors:", errors.errors)
          }
        }
      }
    }
  ]
})
const app = express();
const startApolloServer = async () => {
  await server.start()
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use('/graphql',expressMiddleware(server,{
    context: authMiddleware
  }))
// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
}

app.get('*',(req,res) => {
  res.sendFile(path.join(__dirname,'../client/dist/index.html'))
})


db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`)
    console.log(`use graphql sandbox at http://localhost:${PORT}/graphql`)
  });

});

}
startApolloServer()