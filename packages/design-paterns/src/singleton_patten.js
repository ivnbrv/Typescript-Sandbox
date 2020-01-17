/**
 * @author https://medium.com/better-programming/javascript-design-patterns-25f0faaaa15
 */

class Database {
    constructor(data) {
      if (Database.exists) {
        return Database.instance;
      }
      this._data = data;
      Database.instance = this;
      Database.exists = true;
      return this;
    }
  
    getData() {
      return this._data;
    }
  
    setData(data) {
      this._data = data;
    }
  }
  
  // usage
  const mongo = new Database('mongo');
  console.log(mongo.getData()); // mongo
  
  const mysql = new Database('mysql');
  console.log(mysql.getData()); // mongo