import { IKeyValueDriver } from '@paxico/core/build/IDrivers';
import redis from 'redis'


/**
 * Options Interface for the redis connection
 */
export interface IRedisOptions {
    host?: string;
    port?: number;
    password?: string;
}

export default class Mongo implements IKeyValueDriver {
    private connection: any;


    constructor(options: IRedisOptions) {
        
        const host = options.host || process.env.REDIS_HOST;
        const port = options.port || process.env.REDIS_PORT;
        const password = options.password || process.env.REDIS_PASSWORD;

        
        
        
    }
    

    set(key: string, value: any, options: any): Promise<void> {
        throw new Error("Method not implemented.");
    }    
    get(key: string, options: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    del(key: string, options: any): Promise<void> {
        throw new Error("Method not implemented.");
    }

    
}