import { isDriver, IDriver } from "./IDrivers";

export const isDataSource = (obj: any): obj is DataSource => {
  return 'insertOne' in obj &&
    'deleteById' in obj &&
    'replaceById' in obj &&
    'findById' in obj &&
    'findMany' in obj;
}

type TInject = (name: string) => IDriver;

export type TQueryMethod = (injector: TInject) => Promise<any>;

export default abstract class DataSource {
  private inject(name: string) {
    // @ts-ignore
    const prop = this[name];

    if (prop && isDriver(prop)) {
      return prop;
    }

    throw new Error(`${name} does not exist on this DataSource`);
  }

  abstract insertOne(obj: any, schema: string): Promise<any>;
  abstract deleteById(id: string, schema: string): Promise<any>;
  abstract replaceById(id: string, obj: any, schema: string): Promise<any>;
  abstract findById(id: string, schema: string): Promise<any | null>;
  abstract findMany(properties: any, schema: string): Promise<any[]>;

  execute(queryMethod: TQueryMethod) {
    return queryMethod(this.inject);
  }
}