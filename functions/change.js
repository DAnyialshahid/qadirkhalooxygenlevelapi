let oxygenStatus = { oxygenLevelLow: false };

exports.handler = async (event) => {
  const { oxygenLevelLow } = event.queryStringParameters;

  if (oxygenLevelLow === "true" || oxygenLevelLow === "false") {
    oxygenStatus.oxygenLevelLow = oxygenLevelLow === "true";

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Status updated successfully",
        status: oxygenStatus,
      }),
    };
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Invalid query parameter. Use 'oxygenLevelLow' as 'true' or 'false'.",
      }),
    };
  }
};
