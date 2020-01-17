export interface IDriver { };

export interface IDriverOptions {
  schema: string;
}

export type DriverOptions = IDriverOptions & any;

export interface IKeyValueDriver extends IDriver {
  set(key: string, value: any, options: DriverOptions): Promise<void>;
  get(key: string, options: DriverOptions): Promise<any>;
  del(key: string, options: DriverOptions): Promise<void>;
}

export interface IQueryableDriver extends IDriver {
  insert(query: any, options: DriverOptions): Promise<any>;
  upsert(query: any, options: DriverOptions): Promise<any>;
  delete(query: any, options: DriverOptions): Promise<any>;
  find(query: any, options: DriverOptions): Promise<any[]>;
}

export const isKeyValueDriver = (obj: any): obj is IKeyValueDriver => {
  return 'get' in obj &&
    'set' in obj &&
    'del' in obj;
}

export const isQueryableDriver = (obj: any): obj is IQueryableDriver => {
  return 'insert' in obj &&
    'upsert' in obj &&
    'delete' in obj &&
    'find' in obj;
}

export const isDriver = (obj: any): obj is IDriver => {
  return isQueryableDriver(obj) || isKeyValueDriver(obj);
}