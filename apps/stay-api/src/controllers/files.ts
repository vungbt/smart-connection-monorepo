import { ApiNext, ApiRequest, ApiResponse } from '@/types';
import { FileServices } from '@/services/files';
import HttpStatus from 'http-status-codes';

const getSignUrlUpload = async (
  req: ApiRequest<Record<string, never>, Record<string, never>, { name?: string }>,
  res: ApiResponse,
  next: ApiNext
) => {
  try {
    const queries = req.query;
    const name = queries?.name ?? '';
    const urlUpload = await FileServices.uploadUrl(name);
    return res.jsonApi(HttpStatus.OK, { data: urlUpload });
  } catch (error) {
    return next(error);
  }
};

const getSignUrlUploads = async (
  req: ApiRequest<Record<string, never>, Record<string, never>, { names: string[] }>,
  res: ApiResponse,
  next: ApiNext
) => {
  try {
    const queries = req.query;
    let names = queries?.names ?? [];
    if (typeof names === 'string') {
      names = [names];
    }
    const urlUpload = await FileServices.uploadUrls(names);
    return res.jsonApi(HttpStatus.OK, { data: urlUpload });
  } catch (error) {
    return next(error);
  }
};

export const FileControllers = {
  getSignUrlUpload,
  getSignUrlUploads,
};
