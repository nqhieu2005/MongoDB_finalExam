const connectDB = require('./db');
const {insertOrders, updateDeliveryAddress, removeOrder, readAllOrders, calculateTotalAmount, countProductById} = require('./services');

(async () => {
    const collection = await connectDB();

    // await insertOrders(collection);
    await readAllOrders(collection);
    // await updateDeliveryAddress(collection, 1, "Ho Chi Minh");
    // await removeOrder(collection, 2);
    // await calculateTotalAmount(collection);
    // await countProductById(collection, "somi");
    process.exit(0);
})();