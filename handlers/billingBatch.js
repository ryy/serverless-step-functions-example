const axios = require("axios");

module.exports.handler = async () => {
  console.log("Starting batch API requests...");

  // モックAPIのエンドポイント
  const mockApiUrl = "https://d0kezi3adb.execute-api.ap-northeast-1.amazonaws.com/dev/api/v1/payments";

  const results = [];
  for (let i = 1; i <= 10; i++) {
    try {
      console.log(`Request ${i} to ${mockApiUrl}`);
      const response = await axios.post(mockApiUrl);

      results.push({
        request: i,
        status: "success",
        data: response.data,
      });
    } catch (error) {
      console.error(`Request ${i} failed:`, error.message);
      results.push({
        request: i,
        status: "error",
        message: error.message,
      });
    }
  }

  console.log("Batch requests completed.");

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Batch API requests completed",
      results,
    }),
  };
};
