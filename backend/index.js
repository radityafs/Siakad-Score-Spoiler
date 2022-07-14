const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 8000;

app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  res.status(200);
  res.send('Welcome to root URL of Server');
});

app.post('/getnilai', async (req, res) => {
  const { token } = req.body;

  try {
    const getData = await fetch(
      'https://siakad.uns.ac.id/services/v1/nilai/khs?tahun=2021&semester=B',
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          Origin: 'https://siakad.uns.ac.id',
          Authorization: 'Bearer ' + token
        }
      }
    )
      .then(async (res) => res.json())
      .catch(async (err) => err);

    if (getData?.code === 200) {
      res.status(200);
      res.send(getData);
    } else {
      res.status(400);
      res.send(getData);
    }
  } catch (e) {
    res.status(400);
    res.send(e);
  }
});

app.listen(PORT, (error) => {
  if (!error) {
    console.log('Server is running on port: ' + PORT);
  } else console.log("Error occurred, server can't start", error);
});
