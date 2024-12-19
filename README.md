# serverless-step-functions-example

このリポジトリは [AWS Step FunctionsをServerlessで動かしてみた](https://zenn.dev/moshjp/articles/2605c6c2444d73) で使用したソースコードです。

## セットアップ

1. **リポジトリをクローンする**

```sh
git clone git@github.com:ryy/serverless-step-functions-example.git
```

2. **環境変数を設定する**
   
`.env.default` から `.env` ファイルを作成し、AWSの認証情報を入力する

```sh
cp .env.default .env
```

**.env.default**
```
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=ap-northeast-1
```

3. serverless.ymlに自身のAWSアカウントIDを設定する

- `arn:aws:dynamodb:ap-northeast-1:YOUR-AWS-ACCOUNT-ID:table/MonthlyPaymentBatchResults`
- `arn:aws:states:ap-northeast-1:YOUR-AWS-ACCOUNT-ID:stateMachine:PaymentBatchStateMachine`

https://github.com/ryy/serverless-step-functions-example/blob/73c3b910c91082b5de3eea6cfc5ce24fc8aed72e/serverless.yml#L2-L19

## デプロイ
```sh
serverless deploy
```

> [!NOTE]
> デプロイが完了するとAPI GatewayのAPIのURLが発行されます。<br/>
> 発行されたURLを以下の定数 `PAYMENT_API_URL` の値と書き換えて再度デプロイをしてください。

https://github.com/ryy/serverless-step-functions-example/blob/73c3b910c91082b5de3eea6cfc5ce24fc8aed72e/handlers/sendPaymentRequest.js#L3


## 実行
> [!CAUTION]
> StepFunctions及びLambdaの実行には無料利用枠が設けられていますが、一定の使用料を超えると利用が発生します。<br/>
> Lamdda: https://aws.amazon.com/jp/lambda/pricing/<br/>
> Step Functions: https://aws.amazon.com/jp/step-functions/pricing/<br/>

```
aws stepfunctions start-execution \
   --state-machine-arn arn:aws:states:ap-northeast-1:YOUR-AWS-ACCOUNT-ID:stateMachine:PaymentBatchStateMachine
```

## アプリケーションの削除

```sh
serverless remove
```