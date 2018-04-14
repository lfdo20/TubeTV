import express from 'express';
import path from 'path';


const app = express();

app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
