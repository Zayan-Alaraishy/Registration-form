import app from '../app';
import config from '../config';
const {
  system: { port },
} = config;

app.listen(port, () => {
  console.log(`App is listening in https://localhost:${port}`);
});
