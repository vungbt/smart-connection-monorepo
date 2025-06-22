export type DataResponse =
  | ({
      message?: string;
      error?: string;
    } & Record<string, unknown>)
  | string
  | undefined;

export interface IPaginationReq {
  page: number;
  pageSize: number;
  offset: number;
  limit: number;
}
