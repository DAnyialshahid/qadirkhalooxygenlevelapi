const faunadb = require("faunadb");
const q = faunadb.query;

const client = new faunadb.Client({
    secret: process.env.FAUNA_SECRET, // Store this in Netlify environment variables
});

exports.handler = async () => {
    try {
        const result = await client.query(q.Get(q.Ref(q.Collection("Status"), "oxygen_status")));
        return {
            statusCode: 200,
            body: JSON.stringify(result.data),
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
