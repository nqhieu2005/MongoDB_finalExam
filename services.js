const {MongoClient} = require('mongodb');

async function insertOrders(collection) {
    const orders = [
        {
            orderid: 1,
            products: [
                {product_id: "quanau", product_name: "quan au", size: "XL", price :10, quantity: 1},
                {product_id: "somi", product_name: "ao so mi", size: "XL", price: 10.5, quantity: 2}
            ],
            total_amount: 31,
            delivery_address: "Hanoi"
        }
    ];

    await collection.insertMany(orders);
    console.log("Orders inserted successfully");
}

async function updateDeliveryAddress(collection, orderid, newAddress) {
    await collection.updateOne({orderid}, {$set: {delivery_address: newAddress}});
    console.log(`Updated delivery address for orderid ${orderid}`);
}

async function removeOrder(collection, orderid) {
    await collection.deleteOne({orderid});
    console.log("Remote success");
}

// async function readAllOrders(collection) {
//     const orders = await collection.find().toArray();
//     console.log("No\tProduct name\tPrice\tQuantity\tTotal");
//     orders.forEach((order, index) => {
//         order.products.forEach((product) => {
//             const total = product.price * product.quantity;
//             console.log(`${index + 1}\t${product.product_name}\t${product.price}\t${product.quantity}\t${total}`)
//         })
//     })
// }

async function readAllOrders(collection) {
    const orders = await collection.find().toArray();
    const tableData = [];

    orders.forEach((order) => {
        order.products.forEach((product) => {
            tableData.push({
                No: tableData.length + 1,
                "Product Name": product.product_name,
                Price: product.price,
                Quantity: product.quantity,
                Total: product.price * product.quantity,
            });
        });
    });

    console.table(tableData);
}

async function calculateTotalAmount(collection) {
    const orders = await collection.find().toArray();
    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.total_amount;
    });

    console.log("Total Amount: ", totalAmount);
}

async function countProductById(collection, productId) {
    const orders = await collection.find().toArray();
    let count = 0;

    orders.forEach(order => {
        order.products.forEach(product => {
            if (product.product_id === productId) {
                count += product.quantity;
            }
        });
    });

    console.log("total quantity: ", count);
}

module.exports = {
    insertOrders,
    updateDeliveryAddress,
    removeOrder,
    readAllOrders,
    calculateTotalAmount,
    countProductById
};