import { IKeyValueDriver } from '@paxico/core/build/IDrivers';
import { createHandyClient } from 'handy-redis'; //https://github.com/mmkal/handy-redis

/**
 * Options Interface for the redis connection
 */
export interface IRedisOptions {
    host: string;
    port: number;
    password?: string;
}
export interface IRedisStatus {
    code?: string,
    host?: string,
    port?: number
}
export default class Redis implements IKeyValueDriver {
    private connection: any;
    private status: IRedisStatus;

    constructor(options: IRedisOptions) {

        const host = options.host // process.env.REDIS_HOST;
        const port = options.port // process.env.REDIS_PORT;
        const password = options.password // process.env.REDIS_PASSWORD;
        this.status = { host, port, code: 'NOT_CONNECTED' };

        this.connection = createHandyClient({ host, port, password });

        this.connection.redis.on("connect", () => {
            this.driverStatus = { ...this.status, code: 'CONNECTED' };
        })
        this.connection.redis.on("error", (err:any) => {
            this.driverStatus = { ...this.status, code: err.code };
            process.exit(1);
            return;
        })
    }

    /**
     * get/set DriverStatus
     * @param code 
     */
    set driverStatus(status: IRedisStatus) {
        this.status = status
    }
    get driverStatus(): IRedisStatus {
        return this.status!;
    }

    async set(key: string, value: any, options:any): Promise<any> {
        await this.connection.set(key, value);
        const result = await this.connection.get(key);
        return result;
    }
    
    async get(key: string, options: any): Promise<any> {
        const result = await this.connection.get(key);
        return result;
    }
    async del(key: string, options: any): Promise<void> {
        const result = await this.connection.del(key)
        return result;
    }
}
