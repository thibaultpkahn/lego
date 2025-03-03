const { MongoClient } = require('mongodb');

const MONGODB_URI = 'mongodb+srv://thibaultpkahn:IpYuXtOYrYObhKBe@webdeisgnthibault.0jv7e.mongodb.net/?retryWrites=true&w=majority&appName=WebDeisgnThibault';
const MONGODB_DB_NAME = 'lego';

async function connectToDatabase() {
    try {
        const client = await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connexion à MongoDB réussie !");
        return { client, db: client.db(MONGODB_DB_NAME) };
    } catch (error) {
        console.error("Erreur de connexion à MongoDB :", error);
        return null;
    }
}

module.exports = connectToDatabase;
