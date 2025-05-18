import { Request, Response, RequestHandler } from 'express';
import { format } from 'date-fns';
import morgan, { Options, StreamOptions } from 'morgan';
import path from 'path';

morgan.token('time', () => format(new Date(), 'yyyy-MM-dd HH:mm:ss'));
morgan.token('data', (req: Request) => JSON.stringify(req.body));
morgan.token('res', (req: Request) => JSON.stringify(req.resTemp));

export async function createLogger(): Promise<RequestHandler> {
  const options: Options<Request, Response> = {};

  if (process.env.NODE_ENV === 'production') {
    const rfs = await import('rotating-file-stream');
    const fileName = 'temp.log';
    const stream: StreamOptions = rfs.createStream(fileName, {
      size: '10M',
      interval: '1d',
      path: path.join(process.cwd(), 'logs/request'),
    });
    options.stream = stream;
  }

  return morgan('INFO [:time] [Request] :method :url :status :total-time \n:data  \n:res', options);
}
