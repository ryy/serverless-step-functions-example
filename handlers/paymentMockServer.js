// handlers/paymentMockServer.js

module.exports.handler = async (event) => {
  const paymentId = `payment_${Math.random().toString(36).slice(-10)}`;

  return {
    statusCode: 200,
    body: JSON.stringify({ paymentId }),
  };
};
