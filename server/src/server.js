require('dotenv').config();
const app = require('./api');
const Router = require('./routes');
const middlewares = require('./middlewares');

const { PORT } = process.env;

app.get('/', (_request, response) => {
  response.send();
});

app.use(Router);
app.use(middlewares.errorMiddleware);

app.listen(PORT, () => console.log(`Listening ${PORT}`, PORT));
