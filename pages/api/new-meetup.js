import {MongoClient} from 'mongodb';
// its url - "/api/new-meetup"

async function handler(req, res) {
    // req.method can be GET, POST, PUT, DELETE
    if (req.method == "POST") {
        // req.body contains the data which is sent by frontend form
        const data = req.body;

        try {

            // const client = await MongoClient.connect('mongodb+srv://nextjs-tester:K01vemC3OOPrSoxn@cluster0.tkrsh.mongodb.net/next-meetups?retryWrites=true&w=majority');
            const client = await MongoClient.connect(`mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@cluster0.tkrsh.mongodb.net/next-meetups?retryWrites=true&w=majority`);
            const db = client.db();
    
            const meetupCollections = db.collection('meetups');
            const result = await meetupCollections.insertOne(data);
            client.close();

            console.log("Post request received", result);
            res.status(201).json({message: "meetup inserted successfully"});

        }   catch(err) {
            // if db connection failed or collection post is failed
            res.status(404).json({message: err.message});
        } 
    };
}

export default handler;