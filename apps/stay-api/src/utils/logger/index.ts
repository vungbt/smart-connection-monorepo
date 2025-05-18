/**
 * Setup the winston logger.
 *
 * Documentation: https://github.com/winstonjs/winston
 */
import { format } from 'date-fns';
import { omit } from 'lodash';
import { TransformableInfo } from 'logform';
import { createLogger, format as formatWinston, transports } from 'winston';

const { combine, timestamp, splat, json, simple, printf } = formatWinston;

// Import Functions
const { File, Console } = transports;

// Init Logger
const logger = createLogger({
  format: combine(
    formatWinston((info: TransformableInfo) => {
      info.level = info.level.toUpperCase();
      return info;
    })(),
    timestamp(),
    splat(),
    json(),
    simple(),
    printf((info: TransformableInfo) => {
      const data = omit(info, ['level', 'timestamp', 'message']);
      return `${info.level} [${format(new Date(String(info.timestamp)), 'yyyy-MM-dd HH:mm:ss')}] ${
        info.message
      } ${Object.keys(data).length ? JSON.stringify(data) : ''}`;
    })
  ),
});

if (process.env.NODE_ENV === 'production') {
  logger.add(
    new File({
      filename: './logs/logger/temp.log',
    })
  );
} else {
  const consoleTransport = new Console();
  logger.add(consoleTransport);
}

export default logger;
