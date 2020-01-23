/**
 * TODO:
 * create a SIGTERM process listener to close opened conections 
 */
import { IQueryableDriver } from '@paxico/core/build/IDrivers';
import Model from '@paxico/core/build/Model';
import mongodb, { ObjectId, MongoClient, Cursor } from 'mongodb';
import assert, { throws } from 'assert'

/**
 * Mongo conectionMap will allow us 
 * to create instances to diferent mongo 
 * servers using uri as the key for each of them
 */
export const connectionMap: { [key: string]: Promise<void | MongoClient> } = {};

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
            this.driverStatus = { ...this.status, code: 'URI_NOT_FOUND' };
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
                    console.log('not connected')
                    this.driverStatus = { ...this.status, code: 'CONNECTION_ERROR' };
                    return;
                });
        }

        this.connection = connectionMap[uri];

        if (!this.connection) {
            this.driverStatus = { ...this.status, code: 'CONNECTION_ERROR' };
            process.exit(1);
            return;
        }

    }

    /**
     * get/set DriverStatus
     * @param code 
     */
    set driverStatus(status: IMongoStatus) {
        this.status = status
    }
    get driverStatus(): IMongoStatus {
        return this.status!;
    }

    /**
     * mapConnections
     * @param uri 
     */
    setMapConnections(uri: string) {

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

    /**
     * Insert into mongodb
     * @param obj 
     */
    async insert(obj: any): Promise<any> {
        const connection = await this.connection;
        const collectionName = 'test';

        if (connection) {
            const db = connection.db(this.options.database);
            const collection = db.collection(collectionName);
            const results = await collection.insertOne(obj);
            return results.ops.shift();
        }

        throw new Error('Connection Error');
    }
    /**
    * Update or insert record
    * @param obj 
    */
    async upsert(query: any, obj: any): Promise<any> {
        const connection = await this.connection;
        const collectionName = 'test';

        if (connection) {
            const db = connection.db(this.options.database);
            const collection = db.collection(collectionName);
            const results = await collection.updateOne(query, { $set: obj }, { upsert: true });
            return obj;
        }

        throw new Error('Connection Error');
    }


    async delete(obj: any): Promise<any> {
        const connection = await this.connection;
        const collectionName = 'test';

        if (connection) {
            const db = connection.db(this.options.database);
            const collection = db.collection(collectionName);
            const results = await collection.deleteOne(obj);
            return results;
        }

        throw new Error('Connection Error');
    }

    async find(query: any): Promise<any> {
        const connection = await this.connection;
        const collectionName = 'test';

        if (connection) {
            const db = connection.db(this.options.database);
            const collection = db.collection(collectionName);
            const results = await collection.find(query);
            return results;
        }

        throw new Error('Connection Error');
    }

    arrayFromCursor(cursor: Cursor<any>): Promise<any[]> {
        return new Promise((resolve, reject) => {
            const results: any[] = [];
            const stream = cursor.stream();
            stream.on('data', (chunk) => {
                results.push(chunk);
            });

            stream.on('error', (err) => {
                reject(err);
            });

            stream.on('end', () => {
                resolve(results);
            });
        });
    }


    test() {
        return true;
    }

    /**
     * Open / Close Connections
     */
    async open() {
        const connection = await this.connection;
        if (connection) {
            this.driverStatus = { ...this.status, code: 'CONNECTED' };
        }
    }
    async close() {
        return await this.connection.close();
    }

}