# serverless-step-functions-example

This project is a Serverless application that includes a monthly billing batch process and a payment mock server. The batch sends multiple requests to the mock API and stores the results in a DynamoDB table.

## Setup Instructions

1. **Clone the repository**
   
   Clone this repository to your local environment.

   ```sh
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Copy environment variables**
   
   Copy `.env.default` to `.env` and fill in your AWS credentials.

   ```sh
   cp .env.default .env
   ```

   **.env.default**
   ```
   AWS_ACCESS_KEY_ID=
   AWS_SECRET_ACCESS_KEY=
   AWS_DEFAULT_REGION=ap-northeast-1
   ```

   - Update the AWS credentials (`AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`) in the `.env` file.

<!-- 3. **Install dependencies**
   
   Install the required packages using Yarn.

   ```sh
   yarn install
   ``` -->

3. **Deploy the application**
   
   Use the Serverless Framework to deploy the application to AWS.

   ```sh
   serverless deploy
   ```

   This command will create all necessary AWS resources, including Lambda functions, API Gateway, and DynamoDB.

4. **aaaaa**
   ```sh
   serverless invoke -f batchApiRequest
   ```

## Removing the Application

To remove all deployed resources, use the following command:

```sh
serverless remove
```

This will delete the Lambda functions, API Gateway endpoints, and DynamoDB table created during the deployment process.

## Summary

- **Setup**: Copy environment variables and install dependencies.
- **Deploy**: Use `serverless deploy` to deploy the application.
- **Remove**: Use `serverless remove` to delete all AWS resources.

Ensure that you have the AWS CLI configured with appropriate permissions to manage resources in your AWS account.

