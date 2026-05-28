export interface PaginationParams {
  page?:      number;
  limit?:     number;
  search?:    string;
  sortBy?:    string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResult<T> {
  data:  T[];
  total: number;
  page:  number;
  limit: number;
  pages: number;
}
