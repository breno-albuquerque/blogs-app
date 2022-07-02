require('dotenv').config();
const app = require('./api');
const Router = require('./routes');
const middlewares = require('./middlewares');

const port = process.env.API_PORT || 3001;

app.get('/', (_request, response) => {
  response.send();
});

app.use(Router);
app.use(middlewares.errorMiddleware);

app.listen(port, () => console.log('ouvindo porta', port));
