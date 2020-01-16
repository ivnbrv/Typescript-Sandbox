import { Db, MongoClient } from 'mongodb';
import assert from 'assert';


export class Mongo {
    private client: any;
    private readonly connection = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017';
    private readonly database = process.env.DB_NAME || 'test-drive';

    public close() {
        
        if (this.client) {
            this.client.close()
            .then()
            .catch((error: any) => {
                console.error(error);
            });
        } else {
            console.error('close: client is undefined');
        }
    }

    public async connect() {
        try {
            if (!this.client) {
                const client = await MongoClient.connect(this.connection, { 'useNewUrlParser': true, useUnifiedTopology: true });
                client.db()
            }
        } catch(error) {
            console.error(error);
        }
    }
    public db() {
        if (this.client) {

            return this.client.db(this.database);
        } else {
            console.error('no db found');
            return false;
        }
    }
}

const asyncCall = async () => {
    
    const mongo = new Mongo();
    await mongo.connect();
    const db = mongo.db();


}

asyncCall();

