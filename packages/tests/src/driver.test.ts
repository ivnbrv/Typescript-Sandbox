import Mongo, { IMongoOptions, connectionMap } from '@paxico/services/build/mongo';

describe('Mongo', () => {

  let mongo: Mongo;
  let options: IMongoOptions = {
    'uri': '//mongodb://127.0.0.1:27017',
    'database': 'purposeprep'
  }

  beforeEach(() => {
    mongo = new Mongo(options);
  });

  afterAll(async () => {
    await mongo.close();
  });


  it('is driver connected?', (done) => {

    mongo.open().then(() => {
      expect(mongo.driverStatus.code).toBe('CONNECTED')
      done()
    })

  });

  it('can insert data?', async (done) => {

    let model = { "name": "ivan" };
    let insert = await mongo.insert(model);

    expect(insert).toEqual(model);
    done();

  });

  it('can upsert data?', async (done) => {
    let query = { "_id": "040" };
    let model = { "name": "Replace" }
    let upsert = await mongo.upsert(query, model);

    expect(upsert).toEqual(model);
    done();

  });

  it('can delete data?', async (done) => {
    let model = { "name": "Ivan" }
    let del = await mongo.delete(model);
    expect(del).toBeTruthy();
    done();

  });

  it('can be found?', async (done) => {
    let query = {}
    let result = await mongo.find(query);


    let data = mongo.arrayFromCursor(result);
    
    data.then((result) => {
      expect(result).toBeTruthy();
      done();
    })
    

  });
});
