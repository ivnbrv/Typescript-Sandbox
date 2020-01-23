import Redis, { IRedisOptions } from '@paxico/services/build/redis';

describe('Redis', () => {

    let driver: Redis;
    let options: IRedisOptions = {
        'host': "localhost",
        "port": 6379
    }

    beforeEach(() => {
        driver = new Redis(options);
    });
    afterAll(async (done) => {
        done();
    });
    test('can set data?', async (done) => {
        let key = 'this.key';
        let val = 'Atomic Digest';
        let data = await driver.set(key, val, {});

        expect(data).toBe(val);
        done();
    });
    test('can get data?', async (done) => {
        let key = 'this.key';
        let data = await driver.get(key, {});

        expect(data).toBeTruthy();
        done();
    });
    test('can delete data?', async (done) => {
        let key = 'this.key';
        let data = await driver.del(key, {});

        expect(data).toBeTruthy();
        done();
    });

});
