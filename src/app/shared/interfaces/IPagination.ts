import { ICategory } from "../../home-page/interfaces/ICategory";

export interface IPagination<T> extends ICategory{
  Pagination: Array<Array<T>>;
}
