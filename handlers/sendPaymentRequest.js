const axios = require("axios");

const PAYMENT_API_URL = "https://xxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/dev/api/v1/payments";

module.exports.handler = async (event) => {
  const { userId } = event;

  await axios.post(PAYMENT_API_URL, { userId });
  return { status: "success" };
};
