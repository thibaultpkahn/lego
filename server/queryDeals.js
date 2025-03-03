const { MongoClient } = require('mongodb');

const MONGODB_URI = 'mongodb+srv://thibaultpkahn:IpYuXtOYrYObhKBe@webdeisgnthibault.0jv7e.mongodb.net/?retryWrites=true&w=majority&appName=WebDeisgnThibault';
const MONGODB_DB_NAME = 'lego';

async function connectDB() {
    const client = await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    return client.db(MONGODB_DB_NAME);
}

//1
async function findBestDiscountDeals() {
    const db = await connectDB();
    const deals = await db.collection('deals')
        .find({})
        .sort({ discount: -1 }) // Tri par réduction décroissante
        .toArray();
    console.log(deals);
}

//2
async function findMostCommentedDeals() {
    const db = await connectDB();
    const deals = await db.collection('deals')
        .find({})
        .sort({ comments: -1 }) // Tri par nombre de commentaires décroissant
        .toArray();
    console.log(deals);
}

//3
async function findDealsSortedByPrice() {
    const db = await connectDB();
    const deals = await db.collection('deals')
        .find({})
        .sort({ price: 1 }) // Tri par prix croissant
        .toArray();
    console.log(deals);
}

//4
async function findDealsSortedByDate() {
    const db = await connectDB();
    const deals = await db.collection('deals')
        .find({})
        .sort({ date: -1 }) // Tri par date décroissante (du plus récent au plus ancien)
        .toArray();
    console.log(deals);
}

//5
async function findSalesForLegoSet(legoSetId) {
    const db = await connectDB();
    const sales = await db.collection('sales')
        .find({ legoSetId: legoSetId })
        .toArray();
    console.log(sales);
}

//6
async function findRecentSales() {
    const db = await connectDB();
    const threeWeeksAgo = new Date();
    threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21); // 21 jours en arrière

    const sales = await db.collection('sales')
        .find({ dateScraped: { $gte: threeWeeksAgo } })
        .toArray();
    console.log(sales);
}

// Exécuter une fonction de test
findBestDiscountDeals();

// 
