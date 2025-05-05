const { getDb } = require("../shared/cosmosClient");
module.exports = async function (context, req) {
  const db = await getDb();
  const users = db.container("users");
  const dishes = db.container("dishes");
  await users.items.create({ id: "chef1", name: "Luigi", rating: 4.8 });
  await users.items.create({ id: "chef2", name: "Maria", rating: 4.2 });
  await dishes.items.create({ name: "Lasagne", price: 12, chef: "chef1" });
  await dishes.items.create({ name: "Polpette", price: 10, chef: "chef2" });
  context.res = { status: 200, body: "Seeding completato" };
};