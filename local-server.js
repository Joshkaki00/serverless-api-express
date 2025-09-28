const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');

const app = express();
const port = 3000;

// Set environment variables
process.env.USERS_TABLE = 'my-express-application-dev-UsersDynamoDBTable-AEYHSWFF8GAL';

// Configure DynamoDB client for local development
const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: 'us-east-1'
});

app.use(bodyParser.json({ strict: false }));

// Root endpoint
app.get('/', function (req, res) {
  res.send('Hello World! Users API is running locally.');
});

// Get User endpoint
app.get('/users/:userId', function (req, res) {
  const params = {
    TableName: process.env.USERS_TABLE,
    Key: {
      userId: req.params.userId,
    },
  };

  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not get user' });
    } else if (result.Item) {
      const { userId, name } = result.Item;
      res.json({ userId, name });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });
});

// Create User endpoint
app.post('/users', function (req, res) {
  const { userId, name } = req.body;
  
  if (typeof userId !== 'string') {
    res.status(400).json({ error: '"userId" must be a string' });
    return;
  } else if (typeof name !== 'string') {
    res.status(400).json({ error: '"name" must be a string' });
    return;
  }

  const params = {
    TableName: process.env.USERS_TABLE,
    Item: {
      userId: userId,
      name: name,
    },
  };

  dynamoDb.put(params, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not create user' });
    } else {
      res.json({ userId, name });
    }
  });
});

app.listen(port, () => {
  console.log(`Local development server running at http://localhost:${port}`);
  console.log(`Using DynamoDB table: ${process.env.USERS_TABLE}`);
  console.log('Available endpoints:');
  console.log('  GET  / - Root endpoint');
  console.log('  GET  /users/:userId - Get a user');
  console.log('  POST /users - Create a user');
});
