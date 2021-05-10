export class PaginationModel<T> {
  _embedded?: T[];
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: {
      href?: string
    }
  }
}
