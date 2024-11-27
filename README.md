# serverless-step-functions-example

このプロジェクトは、毎月の請求バッチプロセスと支払いモックサーバーを含むServerlessアプリケーションです。バッチはモックAPIに複数のリクエストを送信し、結果をDynamoDBのテーブルに保存する。

## Setup Instructions

1. **リポジトリをクローンする**

   ```sh
   git clone <repository-url>
   cd <repository-name>
   ```

2. **環境変数を設定する**
   
   .env.default`を`.env`にコピーし、AWSの認証情報を入力する。

   ```sh
   cp .env.default .env
   ```

   **.env.default**
   ```
   AWS_ACCESS_KEY_ID=
   AWS_SECRET_ACCESS_KEY=
   AWS_DEFAULT_REGION=ap-northeast-1
   ```

3. **アプリケーションのデプロイ**
   
   Serverless Frameworkを使ってアプリケーションをAWSにデプロイする。

   ```sh
   serverless deploy
   ```

   このコマンドを実行すると、Lambda関数、API Gateway、DynamoDBなど、必要なAWSリソースがすべて作成される。

4. **関数の実行**
   ```sh
   serverless invoke -f billingBatch
   ```

   ```
   aws stepfunctions start-execution \
    --state-machine-arn arn:aws:states:ap-northeast-1:741233137755:stateMachine:BillingBatchStateMachine
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

