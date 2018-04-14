import express from 'express';
import path from 'path';


const app = express();

app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const port = process.env.PORT || 8080;

const server = app.listen(port, function () {
  const host = server.address().address;
  const por = server.address().port;

  console.log(`Web server started at http://${host}:${por}`);
});

// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });
