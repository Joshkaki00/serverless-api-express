# My Express Application

A serverless Express.js application with user management functionality, built with AWS Lambda, API Gateway, and DynamoDB.

## 🚀 Features

- **RESTful API** for user management
- **Serverless architecture** using AWS Lambda
- **DynamoDB integration** for data persistence
- **Local development** environment
- **AWS deployment** with Serverless Framework

## 📋 API Endpoints

### Production (AWS)
Base URL: `https://vwhyqceh23.execute-api.us-east-1.amazonaws.com/dev`

### Local Development
Base URL: `http://localhost:3000`

### Available Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/` | Health check | - |
| POST | `/users` | Create a new user | `{"userId": "string", "name": "string"}` |
| GET | `/users/{userId}` | Get user by ID | - |

## 🛠️ Prerequisites

- **Node.js** (v18+)
- **npm**
- **AWS CLI** configured with credentials
- **AWS Account** with appropriate permissions

## ⚙️ AWS Permissions Required

Your AWS user needs the following managed policies:
- `AWSCloudFormationFullAccess`
- `AWSLambda_FullAccess`
- `AmazonAPIGatewayAdministrator`
- `AmazonDynamoDBFullAccess`
- `IAMFullAccess`
- `AmazonS3FullAccess`
- `AmazonSSMFullAccess`

## 🏗️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-express-application
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure AWS credentials**
   ```bash
   aws configure
   ```
   Enter your AWS Access Key ID, Secret Access Key, and default region (us-east-1).

## 🚀 Deployment to AWS

1. **Deploy the application**
   ```bash
   sls deploy
   ```

2. **Note the API endpoints** displayed after successful deployment

3. **Test the deployment**
   ```bash
   # Test health check
   curl https://your-api-gateway-url/dev
   
   # Create a user
   curl -X POST https://your-api-gateway-url/dev/users \
     -H "Content-Type: application/json" \
     -d '{"userId": "123", "name": "John Doe"}'
   
   # Get a user
   curl https://your-api-gateway-url/dev/users/123
   ```

## 💻 Local Development

### Start Local Server
```bash
npm run dev
```

This starts a local Express server on `http://localhost:3000` that connects to your AWS DynamoDB table.

### Test Local Endpoints
```bash
# Health check
curl http://localhost:3000

# Create a user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"userId": "local-123", "name": "Local User"}'

# Get a user
curl http://localhost:3000/users/local-123
```

## 📁 Project Structure

```
my-express-application/
├── index.js              # Main Lambda handler
├── local-server.js       # Local development server
├── serverless.yml        # Serverless Framework configuration
├── package.json          # Node.js dependencies and scripts
├── start-local.js        # Alternative local server starter
└── README.md             # This file
```

## 🔧 Configuration Files

### serverless.yml
- Defines AWS resources (Lambda, API Gateway, DynamoDB)
- Configures IAM permissions
- Sets up deployment settings

### index.js
- Express application with user management routes
- DynamoDB integration
- Serverless HTTP wrapper

### local-server.js
- Standalone Express server for local development
- Uses AWS DynamoDB (same table as production)
- Hot reloading friendly

## 🗄️ Database Schema

### Users Table (DynamoDB)
- **Table Name**: `my-express-application-dev-UsersDynamoDBTable-{random}`
- **Partition Key**: `userId` (String)
- **Attributes**:
  - `userId`: Unique identifier for the user
  - `name`: User's display name

## 📦 Dependencies

### Production Dependencies
- `express`: Web framework
- `aws-sdk`: AWS SDK for JavaScript
- `body-parser`: Request body parsing middleware
- `serverless-http`: Serverless Express wrapper

### Development Dependencies
- `serverless-offline`: Local development server
- `dynamodb-local`: Local DynamoDB (optional)
- `serverless-dynamodb-local`: DynamoDB local integration

## 🚨 Troubleshooting

### AWS Permissions Issues
If you get permission errors:
1. Verify AWS credentials: `aws sts get-caller-identity`
2. Check IAM policies are attached to your user
3. Ensure policies have necessary permissions

### DynamoDB Connection Issues
- Verify the table exists: `aws dynamodb list-tables`
- Check environment variables in Lambda console
- Verify region settings match

### Local Development Issues
- Ensure AWS credentials are configured
- Check that port 3000 is available
- Verify the DynamoDB table name in `local-server.js`

## 📝 Scripts

- `npm run dev`: Start local development server
- `npm run offline`: Start serverless offline (alternative)
- `npm test`: Run tests (placeholder)

## 🌐 Architecture

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Client    │    │ API Gateway │    │   Lambda    │
│             │───▶│             │───▶│  Functions  │
│ (Browser/   │    │  (REST API) │    │ (Express.js)│
│  cURL/etc)  │    │             │    │             │
└─────────────┘    └─────────────┘    └─────────────┘
                                              │
                                              ▼
                                      ┌─────────────┐
                                      │  DynamoDB   │
                                      │    Table    │
                                      │   (Users)   │
                                      └─────────────┘
```

## 🔄 Development Workflow

1. **Make changes** to `index.js` or other files
2. **Test locally** with `npm run dev`
3. **Deploy to AWS** with `sls deploy`
4. **Test production** endpoints
5. **Monitor** with AWS CloudWatch logs

## 📄 License

ISC

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally and on AWS
5. Submit a pull request

---

**Need help?** Check the [Serverless Framework documentation](https://www.serverless.com/framework/docs/) or [AWS documentation](https://docs.aws.amazon.com/).
