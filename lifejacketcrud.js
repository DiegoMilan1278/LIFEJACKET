const { MongoClient } = require('mongodb');

async function main() {

    const uri = "mongodb+srv://LifeJacket:lifejacket123@cluster0.yrvnibf.mongodb.net/?retryWrites=true&w=majority";
    
    const client = new MongoClient(uri);

    try {
      
        await client.connect();

        // Invoque sus funciones aquí
        console.log("Connected successfully to server");

    } finally {
        
        await client.close();
    }
}

main().catch(console.error);