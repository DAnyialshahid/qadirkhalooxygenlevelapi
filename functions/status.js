const fs = require("fs");
const path = require("path");

exports.handler = async () => {
  const statusFilePath = path.resolve(__dirname, "../status.txt");

  try {
    const data = fs.readFileSync(statusFilePath, "utf8");
    const status = JSON.parse(data);

    return {
      statusCode: 200,
      body: JSON.stringify(status),
    };
  } catch (error) {
    console.error("Error reading status file:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to retrieve status." }),
    };
  }
};
