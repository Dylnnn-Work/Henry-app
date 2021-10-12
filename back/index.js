const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const { resolvers } = require("./src/resolvers");
const { typeDefs } = require("./src/schema");
const jwt = require("jsonwebtoken");
const path = require("path");
const logger = require("./logger.js");
require("dotenv").config();
const requestId = require("express-request-id")();
const morganMiddleware = require("./morganMiddleware.js");

const app = express();

app.use(requestId);
//app.use(logger.requests);
//app.use(morganMiddleware);

app.use(cors());
//Settings Nodemailer

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

//app.use(morgan('dev'));

app.use(require("./src/routes/index"));

//app.use(helmet.contentSecurityPolicy());
/*
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());
*/
// app.use(rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 100,
//   }));

app.use(express.json());

const getUser = (token) => {
  try {
    if (token) {
      return jwt.verify(token, "secretkey");
    }
    return null;
  } catch (error) {
    return null;
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (err) => {
    logger.error(err);
    return err;
  },
  context: ({ req }) => {
    const token = req.headers.authorization;
    //console.log(token);

    return { user: token ? getUser(token.split(" ")[1]) : null };
  },
  introspection: true,
  playground: true,
});
server.applyMiddleware({ app });

//No route found handler
app.use((req, res, next) => {
  const message = "Route not found";
  const statusCode = 404;
  logger.warn(message);
  res.status(statusCode);
  res.json({
    message,
  });
});

// Error handler
app.use((err, req, res, next) => {
  const { message, statusCode = 500, level = "error" } = err;
  const log = `${logger.header(req)} ${statusCode} ${message}`;
  logger[level](log);
  res.status(statusCode);
  res.json({
    message,
  });
});

app.listen(process.env.SRV_PORT, () => logger.info("Server running"));
