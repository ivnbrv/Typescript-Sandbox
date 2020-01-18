import Mongo from '@paxico/services/build/mongo'

test('adds 1 + 2 to equal 3', () => {

    const driver = new Mongo('mongodb://127.0.0.1:27017', 'testdrive');

    expect(driver.test()).toBe(true);

    
  });