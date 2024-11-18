// handlers/billingBatch.js

const AWS = require("aws-sdk");
const axios = require("axios");

// DynamoDBクライアントの設定
const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: "ap-northeast-1",
});

module.exports.handler = async () => {
  console.log("Starting batch API requests...");

  // モックAPIのエンドポイント
  const mockApiUrl = "https://ij3258zcs7.execute-api.ap-northeast-1.amazonaws.com/dev/api/v1/payments";

  const results = [];
  for (let i = 1; i <= 10; i++) {
    const response = await axios.post(mockApiUrl);

    const params = {
      TableName: 'MonthlyBillingBatchResults',
      Item: {
        Id: `${i}`,
        Status: "success",
        PaymentId: response.data.paymentId,
      },
    };
  
    await dynamoDb.put(params).promise();  
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "ok"
    }),
  };
};
