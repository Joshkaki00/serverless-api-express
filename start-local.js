// Set environment variables for local development
process.env.IS_OFFLINE = 'true';
process.env.USERS_TABLE = 'my-express-application-dev-UsersDynamoDBTable-AEYHSWFF8GAL';

// Start the serverless offline
const { spawn } = require('child_process');

console.log('Starting local development server...');
console.log('Table:', process.env.USERS_TABLE);

const serverless = spawn('npx', ['serverless', 'offline'], {
  stdio: 'inherit',
  cwd: __dirname
});

serverless.on('close', (code) => {
  console.log(`Serverless offline exited with code ${code}`);
});
