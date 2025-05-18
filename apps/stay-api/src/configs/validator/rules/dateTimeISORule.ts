import logger from '@/utils/logger';

const dateTimeISORule = (
  value: string | number | boolean,
  args: string,
  attribute: string,
  passes: (success?: boolean, message?: string) => void
) => {
  try {
    const newValue = String(value);
    const date = new Date(newValue);
    if (String(date) !== 'Invalid Date' && newValue === date.toISOString()) {
      return passes();
    }
    return passes(false);
  } catch (error) {
    logger.error('[Validate] dateTimeISORule', error);
  }
};

export default dateTimeISORule;
