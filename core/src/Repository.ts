import Model, { IModelConstructor } from './Model';
import DataSource, {TQueryMethod } from './DataSource';

import assert from 'assert';

export default class Repository {
  private schema: string;
  private datasource: DataSource;
  private ModelConstructor: IModelConstructor;

  constructor(model: IModelConstructor, datasource: DataSource) {
    this.schema = model.name;
    this.datasource = datasource;
    this.ModelConstructor = model;
  }

  async insertOne(model: Model): Promise<Model> {
    model.modified = Date.now();
    model.created = Date.now();
    const result = await this.datasource.insertOne(model.toDTO(), this.schema);
    return new this.ModelConstructor(result);
  }

  async replaceOne(model: Model): Promise<void> {
    assert(model.id, 'Repository.replaceOne requires a model that already exists');
    model.modified = Date.now();
    await this.datasource.replaceById(model.id, model.toDTO(), this.schema);
  }

  async deleteOne(model: Model): Promise<void> {
    assert(model.id, 'Repository.deleteOne requires a model that already exists');
    await this.datasource.deleteById(model.id, this.schema);
  }

  async findById(id: string): Promise<Model | null> {
    const result = await this.datasource.findById(id, this.schema);
    if (result) {
      return new this.ModelConstructor(result);
    }

    return result;
  }

  async findMany(properties: any): Promise<Model[]> {
    const results = await this.datasource.findMany(properties, this.schema);
    return results.map((dto) => new this.ModelConstructor(dto));
  }

  async execute(queryMethod: TQueryMethod): Promise<Model | Model[] | null> {
    const result = await this.datasource.execute(queryMethod);

    if (!result) {
      return null;
    }

    if (Array.isArray(result)) {
      return result.map((r) => new this.ModelConstructor(r));
    }

    return new this.ModelConstructor(result);
  }
}