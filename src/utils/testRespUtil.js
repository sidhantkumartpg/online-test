const fs = require("fs");

export function writeTestResponse(userInfo, testResp) {
  try {
    fs.writeFile("test17.json", JSON.stringify(testResp), (err) => {
      if (err) throw err;
    });
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
}
