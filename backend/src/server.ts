const express = require("express");
const session = require("express-session");
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require("cors");
const cron = require("node-cron")
const HttpException = require('./utils/HttpException.utils.ts');
const errorMiddleware = require('./middleware/error.middleware.ts');
const userRouter = require('./routes/api/user.route.ts');
const notification = require('./routes/api/notification.route.ts');
const withdrawInfo = require('./routes/api/withdrawInfo.route.ts');
const depositInfo = require('./routes/api/depositInfo.route.ts');
const transaction = require('./routes/api/transaction.route.ts');

cron.schedule('*/10 * * * *', () => {
  // WalletService.updateTopTokens().then(() => {
  //   console.log("Top Token data updated")
  // })
});

// Init express
const app = express();
// Init environment
dotenv.config();
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
app.use(cookieParser());
// enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());
app.use(
    session({
      key: "user_sid",
      secret: "supersecret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 86400000,
      },
    })
  );

app.use(cookieParser());

app.use(`/api/users/`, userRouter);
app.use(`/api/notification`, notification);
app.use(`/api/withdrawinfo`, withdrawInfo);
app.use(`/api/depositinfo`, depositInfo);
app.use(`/api/transaction`, transaction);

// 404 error
app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Endpoint Not Found');
    next(err);
});

// Error middleware
app.use(errorMiddleware);

// starting the server
// app.listen(port, () =>
//     console.log(`🚀 Server running on port ${port}!`));


module.exports = app;