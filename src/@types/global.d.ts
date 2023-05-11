export {};

declare global {
  type Nullable<T> = T | null;
  type Optional<T> = T | undefined;
  type Primitive = string | number | boolean | null | undefined;
  type AnyObject = { [key: string]: any };

  interface IPaginatorEvent {
    page: number;
    first: number;
    rows: number;
    pageCount: number;
  }
}
