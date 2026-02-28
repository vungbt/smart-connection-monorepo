import { NextFunction, Request, Response } from 'express';

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
  Plus = 'plus',
  Member = 'member',
  Guest = 'guest',
}

export type EmptyObject = Record<string, never>;

export type ApiRequest<
  TParams = EmptyObject,
  TBody = EmptyObject,
  TQuery = EmptyObject,
  TResBody = unknown
> = Request<TParams, TResBody, TBody, TQuery>;

export type ApiResponse = Response;

export type ApiNext = NextFunction;

export type IdParams = {
  id: string;
};
