const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('Hello from the Tic-Tac-Toe backend!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});