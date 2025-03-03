// Fichier insertDeals.js 
const connectToDatabase = require('./database');

async function insertDeals() {
    const { client, db } = await connectToDatabase();
    if (!db) return;

    const collection = db.collection('deals');

    const deals = [
        { title: "Lego Star Wars X-Wing", price: 49.99, discount: 20 },
        { title: "Lego Technic Ferrari", price: 199.99, discount: 10 }
    ];

    const result = await collection.insertMany(deals);
    console.log(`${result.insertedCount} deals ajoutés !`);

    client.close();
}

insertDeals();
