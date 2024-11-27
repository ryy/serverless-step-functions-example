// handlers/paymentMockServer.js

module.exports.handler = async (event) => {
  const paymentId = `payment_${Math.random().toString(36).slice(-10)}`;

  // 最大1秒待機
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));

  if (Math.random() < 0.005) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Mock server error" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ paymentId }),
  };
};
