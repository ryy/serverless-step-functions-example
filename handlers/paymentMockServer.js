// handlers/paymentMockServer.js

module.exports.handler = async (event) => {
  const { userId } = JSON.parse(event.body || "{}");

  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));

  if (Math.random() < 0.005) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Mock server error" }),
    };
  }

  const paymentId = `payment_${Math.random().toString(36).slice(-10)}`;
  return {
    statusCode: 200,
    body: JSON.stringify({ paymentId }),
  };
};
