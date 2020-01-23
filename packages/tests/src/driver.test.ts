import Mongo, { IMongoOptions, connectionMap } from '@paxico/services/build/mongo';
import Model from '@paxico/core/build/Model';


describe('Mongo', () => {
  let mongo: Mongo;
  let options: IMongoOptions = {
    'uri': '//mongodb://127.0.0.1:27018',
    'database': 'purposeprep'
  }

  beforeEach(() => {
      mongo = new Mongo(options);
  });

  afterAll(async () => {
    await mongo.close();
  });

  it('is driver connected?', () => {
    console.log(mongo.getDriverStatus().code)
    expect(mongo.getDriverStatus().code).toBe('CONNECTED')
  });

  // it('is it true?', async(done) => {
  //   expect(mongo.test()).toBeTruthy();
  //   done();
  // });

  it('can insert data?', async (done) => {


    // const model = { "_id": "004", "name": "ivan" };
    const insert = await mongo.insert(model);

    expect(insert).toEqual(model);
    done();
  
  });


});
