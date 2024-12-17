const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: "ap-northeast-1",
});

module.exports.handler = async (event) => {
  const hasError = event.some((result) => result.status === "error");
  const status = hasError ? "error" : "success";

  const params = {
    TableName: "MonthlyPaymentBatchResults",
    Item: {
      Id: uuidv4(),
      Status: status,
      Timestamp: new Date().toISOString(),
    },
  };

  try {
    await dynamoDb.put(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Batch result saved successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to save batch result" }),
    };
  }
};
