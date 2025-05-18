import { EUserRole, IPaginationReq } from '@types';
import { i18n, TFunction } from 'i18next';

export type DataResponse =
  | ({
      message?: string;
      error?: string;
    } & Record<string, unknown>)
  | string
  | undefined;

declare global {
  namespace Express {
    interface Request {
      _id: string;
      resTemp: DataResponse;
      i18n: i18n;
      t: TFunction;
      auth?: Payload;
      pagination: IPaginationReq;
    }

    interface Response {
      jsonApi: (status?: number, data?: DataResponse) => Response;
      i18n: i18n;
      t: TFunction;
    }
  }
}

export type Payload = {
  id: string;
  type: EUserRole;
};

// Validation related types
export type ValidationRules = { [key: string]: string | string[] | ValidationRules };
export type ValidationSource = 'body' | 'query' | 'params';
export type ValidationErrors = { [key: string]: string[] };
