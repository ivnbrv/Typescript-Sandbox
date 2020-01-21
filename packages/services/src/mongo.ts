/**
 * TODO:
 * create a SIGTERM process listener to close opened conections 
 */
import { IQueryableDriver } from '@paxico/core/build/IDrivers';
import Model from '@paxico/core/build/Model';
import mongodb, { ObjectId, MongoClient } from 'mongodb';
import assert, { throws } from 'assert'

/**
 * Mongo conectionMap will allow us 
 * to create instances to diferent mongo 
 * servers using uri as the key for each of them
 */
export const connectionMap: { [key: string]: Promise<void | mongodb.MongoClient> } = {};

/**
 * Options Interface for the mongo connection
 */
export interface IMongoOptions {
    database?: string;
    uri?: string;
}

export interface IMongoStatus {
    code?: string,
    uri?: string,
    database?: string
}

/**
 * Mongo Driver
 */
export default class Mongo implements IQueryableDriver {
    private connection: any;
    private options: IMongoOptions;
    private status: IMongoStatus;

    constructor(options: IMongoOptions) {
        const uri = options.uri || process.env.MONGODB_URI; // env variable
        const database = options.database || 'test'
        this.options = { ...options, database, uri }
        this.status = { database, uri };
        
        // Must have a valid mongo url
        if (!uri) {
            this.setDriverStatus('URI_NOT_FOUND')
            return;
        }

        // this.connection = this.setMapConnections(uri);

        if (!(uri in connectionMap)) {
            connectionMap[uri] = mongodb.MongoClient
                .connect(uri, {
                    poolSize: 10,
                    socketTimeoutMS: 90000,
                    useNewUrlParser: true,
                })
                .catch((e) => {
                    this.setDriverStatus('CONNECTION_ERROR')
                    return;
                });
        }
        
        this.connection = connectionMap[uri];
        
        if (!this.connection) {
            this.setDriverStatus('NOT_CONNECTED')
            process.exit(1);
            return;
        } else {
            this.setDriverStatus('CONNECTED')
        }
        
       
    }

    /**
     * setDriverStatus
     * @param code 
     */
    async setDriverStatus(code: string) {
        
        this.status = {
            code,
            'uri': this.options.uri!,
            'database': this.options.database!
        }
    }
    getDriverStatus() {
        return this.status;
    }
    /**
     * mapConnections
     * @param uri 
     */
    setMapConnections(uri:string) {

        if (!(uri in connectionMap)) {

            connectionMap[uri] = mongodb.MongoClient.connect(uri, {
                poolSize: 10,
                socketTimeoutMS: 90000,
                useNewUrlParser: true,
                useUnifiedTopology: true // Use new Server Discover and Monitoring engine
            }).then((connection) => {
                return connection;
            }).catch((e) => {
                process.exit(1);
                return;
            })   
        }
        return connectionMap[uri];
    }
    getMappedConnection(uri: string) {
        return connectionMap[uri];
    }

    async insert(obj: any): Promise<any> {
        const connection = await this.connection;
        const collectionName = 'test';
    ​
        if (connection) {
          const db = connection.db(this.options.database);
          const collection = db.collection(collectionName);
          const results = await collection.insertOne(obj);
          return results.ops.shift();
        }
    ​
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

    test() {
        return true;
    }

    /**
     * Close connections
     */
    async close() {
        return await this.connection.close();
    }

}