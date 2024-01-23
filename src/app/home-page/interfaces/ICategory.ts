import { IProduct } from "./IProduct";

export interface ICategory{
  categoryName: string;
  product: Array<IProduct>;
}
