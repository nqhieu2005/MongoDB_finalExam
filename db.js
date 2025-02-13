const {MongoClient} = require('mongodb');
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db("eShop");
        const collection = db.collection("OrderCollection");
        return collection;
    } catch (error) {
        console.log("Error conneting to MongoDB: ", error);
        process.exit(1);
    } 
}

module.exports = connectDB;