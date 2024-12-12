const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  const { oxygenLevelLow } = event.queryStringParameters;
  const statusFilePath = path.resolve(__dirname, "../status.txt");

  if (oxygenLevelLow === "true" || oxygenLevelLow === "false") {
    try {
      const newStatus = { oxygenLevelLow: oxygenLevelLow === "true" };

      // Write the updated status to the file
      fs.writeFileSync(statusFilePath, JSON.stringify(newStatus, null, 2), "utf8");

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Status updated successfully",
          status: newStatus,
        }),
      };
    } catch (error) {
      console.error("Error updating status file:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to update status." }),
      };
    }
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Invalid query parameter. Use 'oxygenLevelLow' as 'true' or 'false'.",
      }),
    };
  }
};
