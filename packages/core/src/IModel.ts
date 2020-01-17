export default interface IModel {
  id: string;
  created: number;
  modified: number;
  toDTO: () => any;
  toJSON: () => any;
}
