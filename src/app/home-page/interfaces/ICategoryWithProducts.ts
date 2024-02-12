import internal from "stream";
import { IProduct } from "./IProduct";

export interface ICategoryWithProducts{
  id: number;
  categoryName: string;
  product: Array<IProduct> ;
}
