let oxygenStatus = { oxygenLevelLow: false };

exports.handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(oxygenStatus),
  };
};
