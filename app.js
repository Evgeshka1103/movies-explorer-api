require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const { limiter } = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const handleError = require('./middlewares/error');
const config = require('./config');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(cookieParser());

const { PORT = 3000 } = process.env;

mongoose.set('strictQuery', true);
mongoose.connect(config.db_url, {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(requestLogger);
app.use(limiter);
app.use(routes);
app.use(errorLogger);
app.use(errors());

app.use(handleError);

app.listen(PORT, () => {
  console.log(`App listen ${PORT}`);
});
