import Model from '../core/src/Model';
import IModel from '../core/src/IModel';

export interface ITestModel extends IModel {
  name: string;
  secret: string;
}

export default class TestModel extends Model implements ITestModel {
  private _name: string;
  private _secret: string;

  constructor(dto: ITestModel) {
    super(dto);

    this._name = this.name = dto.name;
    this._secret = this.secret = dto.secret;
  }

  get secret(): string {
    return this._secret;
  }

  set secret(value: string) {
    this._secret = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    // assertions
    this._name = value;
  }

  toDTO() {
    return { ...super.toDTO(), name: this.name, secret: this.secret };
  }

  toJSON() {
    return this.toDTO();
  }
}