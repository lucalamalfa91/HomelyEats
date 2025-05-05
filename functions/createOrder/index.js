const { getDb } = require("../shared/cosmosClient");
module.exports = async function (context, req) {
  const db = await getDb();
  const container = db.container("orders");
  const order = {
    title: req.body.title,
    price: req.body.price,
    vendorId: req.body.vendorId,
    createdAt: new Date(),
    status: "available"
  };
  const { resource } = await container.items.create(order);
  context.res = { status: 201, body: resource };
};