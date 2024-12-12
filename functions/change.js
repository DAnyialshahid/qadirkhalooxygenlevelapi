const faunadb = require("faunadb");
const q = faunadb.query;
//key of db
//fnacapi_omd2ZXJzaW9uAWdwYXlsb2FkWFiiYmlkcjQxNzA3ODI3MTg4OTM3NTgwOWZzZWNyZXR4OHdLRkFxSjlvWW81a1pyWWZqQnJqUVBHN1RMNDVPSnRkemNRL2NLVTR1bjMxVlhmWUlpcHBMQT09

const client = new faunadb.Client({
    secret: process.env.FAUNA_SECRET,
});

exports.handler = async (event) => {
    const { oxygenLevelLow } = event.queryStringParameters;

    if (oxygenLevelLow === "true" || oxygenLevelLow === "false") {
        try {
            const updatedStatus = {
                oxygenLevelLow: oxygenLevelLow === "true",
            };
            await client.query(
                q.Update(q.Ref(q.Collection("Status"), "oxygen_status"), { data: updatedStatus })
            );
            return {
                statusCode: 200,
                body: JSON.stringify({ message: "Status updated successfully", status: updatedStatus }),
            };
        } catch (error) {
            return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
        }
    } else {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Invalid query parameter. Use 'oxygenLevelLow' as 'true' or 'false'." }),
        };
    }
};
