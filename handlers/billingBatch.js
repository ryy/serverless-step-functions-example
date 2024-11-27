// handlers/billingBatch.js

const AWS = require("aws-sdk");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: "ap-northeast-1",
});

// 請求対象のユーザー数
const TEST_USER_COUNT = 100;
const PAYMENT_API_URL = "https://7u4zjtxpe6.execute-api.ap-northeast-1.amazonaws.com/dev/api/v1/payments";

module.exports.handler = async () => {
  const startTime = Date.now();

  let status = "success";

  const users = Array.from({ length: TEST_USER_COUNT }, (_, i) => ({
    id: i + 1,
    name: `User-${i + 1}`,
  }));

  for (const user of users) {
    try {
      await axios.post(PAYMENT_API_URL);
    } catch (error) {
      status = "error";
    }
  }

  const params = {
    TableName: 'MonthlyBillingBatchResults',
    Item: {
      Id: uuidv4(),
      Status: status,
      Timestamp: new Date().toISOString(),
    },
  };

  await dynamoDb.put(params).promise();

  const endTime = Date.now();
  return {
    statusCode: 200,
    body: JSON.stringify({
      result: status,
      executionTime: `${endTime - startTime} ms`,
    }),
  };
};
