import { ReactNode } from 'react';
import { RenderIcon } from '../icons';
import clsx from 'clsx';

type TableEmptyProps = {
  message?: string | ReactNode;
  columnLength: number;
  className?: string;
  height?: number;
};
export const TableEmpty = ({
  message = 'No data here',
  columnLength,
  className,
  height,
}: TableEmptyProps) => {
  return (
    <tr>
      <td
        colSpan={columnLength}
        className={clsx('p-4 text-center text-neutral-border text-14', className)}
        style={{ height }}
      >
        <div className="flex w-full justify-center items-center flex-col gap-2">
          <RenderIcon name="inbox" className="text-neutral-border !w-10 !h-10" />
          {message}
        </div>
      </td>
    </tr>
  );
};
