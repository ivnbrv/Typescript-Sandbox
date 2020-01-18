import Mongo from '@paxico/services/build/mongo';


const mongo = new Mongo('mongodb://127.0.0.1:2701x', 'testdrive');

test('Testing Mongo Instance:', async (done) => {

  expect(mongo.test()).toBeTruthy();
  done();

});
