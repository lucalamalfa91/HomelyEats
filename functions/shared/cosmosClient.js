const { CosmosClient } = require("@azure/cosmos");
const uri = process.env.COSMOS_CONNECTION;
let cachedDb = null;
async function getDb() {
  if (!cachedDb) {
    const client = new CosmosClient(uri);
    const database = client.database("foodapp");
    cachedDb = database;
  }
  return cachedDb;
}
module.exports = { getDb };