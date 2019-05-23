const User = require("../src/services/user");

async function clear() {
  const user = await User.deleteTestData();
  console.log("User clear result: ", user);

  console.log("Test data cleared.");
}

clear();
