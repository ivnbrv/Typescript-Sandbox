import IModel from './IModel';
import assert from 'assert';

export interface IModelConstructor {
  new(dto: IModel): Model;
}

export default class Model implements IModel {
  id: string;
  created: number;
  modified: number;

  constructor(dto: IModel) {
    assert(typeof dto.id === 'string', 'id must be of type string');
    this.id = dto.id;

    assert(typeof dto.created === 'number', 'created must be of type number');
    this.created = dto.created;

    assert(typeof dto.modified === 'number', 'modified must be of type modified');
    this.modified = dto.modified;
  }

  toDTO() {
    return {
      id: this.id,
      created: this.created,
      modified: this.modified,
    }
  }

  toJSON() {
    return {
      id: this.id,
      created: this.created,
      modified: this.modified,
    }
  }
}
