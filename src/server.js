import express from 'express';
import path from 'path';
import cors from 'cors';


const app = express();

app.use(express.static('dist'));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.options('*', cors());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const port = process.env.PORT || 3000;

const server = app.listen(port, function () {
  const host = server.address().address || 'localhost';
  const por = server.address().port;

  console.log(`Web server started at http://${host}:${por}`);
});

// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });
