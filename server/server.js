const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

const pgClient = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1234',
  port: 5432,
});

pgClient.connect();

mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const mongoSchema = new mongoose.Schema({
  data: String,
});
const MongoModel = mongoose.model('test', mongoSchema);

app.post('/api/save', async (req, res) => {
  const { postgresData, mongoData } = req.body;

  try {
    // PostgreSQL에 저장
    await pgClient.query('INSERT INTO test(input_data) VALUES($1)', [postgresData]);

    // MongoDB에 저장
    const mongoDoc = new MongoModel({ data: mongoData });
    const savedDoc = await mongoDoc.save();
    console.log('MongoDB data saved:', savedDoc); // 로그 추가

    res.status(200).send('Data saved successfully');
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send('Error saving data');
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
