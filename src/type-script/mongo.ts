import { IQueryableDriver } from '../core/build/IDrivers';
import { MongoClient } from 'mongodb';
import assert from 'assert'
import TestModel from './testModel'
import { resolve } from 'dns';
import { threadId } from 'worker_threads';
import Model from '../core/src/Model';


export default class Mongo implements IQueryableDriver {
    
    private conn: any;

    constructor(host: string) {        
        
        assert(String(host), 'host is not a string')
        this.conn = MongoClient.connect(host, { useUnifiedTopology: true })
    }
    
    async insert(query: TestModel, options: any): Promise<any> {
        const con = await this.conn;
        const collectionName = options.collection;

        if(con){
            const db = con.db(options.database)
            const collection = db.collection(collectionName);
            const res = await collection.insertOne(query.toDTO());
            return res.ops;
        }
        throw new Error('unable to connect to mongo, "connection" is false');
    }

    async upsert(query: any, options: any): Promise<any> {
        const con = await this.conn;
        if(con){

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

/*Before CRUD actions we have to set the model and the data*/
const TAskModel = new TestModel({id: "1", name:"algo", secret:"sdfsfsfs", modified:1, toDTO:() => {return { this:"algo" }}, toJSON:() => {return { this:"algo" }}, created:1});

/* Then we have to pass DTO to driver methods*/
try{
    driver.insert(TAskModel, { schema: 'testCollection', database:"test" , collection: "testCollection"})
    console.log('Success');
}catch(e){
    console.log('error: ', e);
}
 
