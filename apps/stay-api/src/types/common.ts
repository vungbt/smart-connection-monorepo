export interface IModelBase {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface IPaginationReq {
  page?: number;
  pageSize?: number;
  offset?: number;
  limit?: number;
}

export enum EUserRole {
  Admin = 'admin',
  Employee = 'employee',
  Employer = 'employer',
}
