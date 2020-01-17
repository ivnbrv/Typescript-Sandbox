import { IQueryableDriver } from '@paxico/core/build/IDrivers';
import Model from '@paxico/core/build/Model';
import { MongoClient } from 'mongodb';
import assert, { throws } from 'assert'

/**
 * TODO:
 * create a SIGTERM process listener to close opened conections 
 */
export default class Mongo implements IQueryableDriver {
    
    private _client: any;
    private _database: string;

    constructor(host: string, database: string) {
        // const model = new Model(); 
        assert(typeof host === 'string', 'host is not a string')
        assert(typeof database === 'string', 'database is not a string')

        this._database = database
        this._client = MongoClient.connect(host, { 'useNewUrlParser': true, useUnifiedTopology: true }).then().catch((err) => {
            console.log('connection error')
        });
    }

    async insert(query: any, options: any): Promise<any> {
        
        const conn = await this._client;
        const collectionName = options.schema || 'default';

        if (conn) {
            const db = conn.db(this._database);
            const collection = db.collection(collectionName);
            const results = await collection.insertOne(query);
            return results.ops;
        }
        throw new Error('unable to connect to mongo, "connection" is falsey');  
    }
    

    async upsert(query: any, options: any): Promise<any> {
        
        throw new Error('unable to connect to mongo, "connection" is falsey');  
    }

    async delete(query: any, options: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async find(query: any, options: any): Promise<any[]> {
        throw new Error("Method not implemented.");
    }

    close() {
        console.log('closed')
    }

}

const driver = new Mongo('mongodb://127.0.0.1:27017', 'testdrive');

if (driver) {
    driver.insert({ name: "ivan", email: "ivan@paxicotech.com" }, { schema: 'users' }).then((document) => {

        console.log('insert done', document)

        
    }).catch((e) => {

        console.log('insert error cached')

    })
}
 