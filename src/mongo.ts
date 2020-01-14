import MongoClient from 'mongodb';

const url = 'mongodb://127.0.0.1:27017'
const dbName = 'sandbox'
const client = MongoClient.connect(url, (error, client) => {

    var db = client.db('test');
    console.log(db)
})

