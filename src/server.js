require('dotenv').config();
const app = require('./api');
const Router = require('./routes');

const port = process.env.API_PORT || 3000;

app.get('/', (_request, response) => {
  response.send();
});

app.use(Router);

app.listen(port, () => console.log('ouvindo porta', port));
