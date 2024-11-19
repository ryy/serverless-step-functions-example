// handlers/billingBatch.js

const AWS = require("aws-sdk");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: "ap-northeast-1",
});

module.exports.handler = async () => {
  const startTime = Date.now();
  const mockApiUrl = "https://7u4zjtxpe6.execute-api.ap-northeast-1.amazonaws.com/dev/api/v1/payments";

  let status = "success";

  for (let i = 1; i <= 100; i++) {
    try {
      await axios.post(mockApiUrl);
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
