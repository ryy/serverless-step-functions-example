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

3. serverless.ymlに自身のAWSアカウントIDを設定する

https://github.com/ryy/serverless-step-functions-example/blob/addb9f40839ebccf3e20e7ac74acda80d9b2cfda/serverless.yml#L12-L13

https://github.com/ryy/serverless-step-functions-example/blob/addb9f40839ebccf3e20e7ac74acda80d9b2cfda/serverless.yml#L17-L18


## デプロイ
```sh
docker compose run --rm app serverless deploy
```

> [!NOTE]
> デプロイが完了するとAPI GatewayのAPIのURLが発行されます。<br/>
> 発行されたURLを以下の定数 `PAYMENT_API_URL` の値と書き換えて再度デプロイをしてください。

<img width="683" src="https://github.com/user-attachments/assets/02be40db-5a85-4fea-9b2f-ce21948b2c26" />

https://github.com/ryy/serverless-step-functions-example/blob/73c3b910c91082b5de3eea6cfc5ce24fc8aed72e/handlers/sendPaymentRequest.js#L3


## 実行
> [!CAUTION]
> StepFunctions及びLambdaの実行には無料利用枠が設けられていますが、一定の使用料を超えると利用が発生します。<br/>
> Lambda: https://aws.amazon.com/jp/lambda/pricing/<br/>
> Step Functions: https://aws.amazon.com/jp/step-functions/pricing/<br/>

Lambdaの実行回数を抑えたい場合は以下の定数の値を変更してください。
https://github.com/ryy/serverless-step-functions-example/blob/5efd5b57cecff3d23c0baee5b1f86bf23884bf6f/handlers/getPaymentTargetUsers.js#L1

`YOUR-AWS-ACCOUNT-ID`は自身のAWSアカウントIDを指定してください。
```
aws stepfunctions start-execution \
   --state-machine-arn arn:aws:states:ap-northeast-1:YOUR-AWS-ACCOUNT-ID:stateMachine:PaymentBatchStateMachine
```

## アプリケーションの削除

```sh
docker compose run --rm app serverless remove
```