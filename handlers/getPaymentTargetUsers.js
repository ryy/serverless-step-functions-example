const TEST_USER_COUNT = 100;

module.exports.handler = async () => {
  const users = Array.from({ length: TEST_USER_COUNT }, (_, i) => ({
    userId: i + 1,
  }));
  
  return {
    users,
  };
};
  