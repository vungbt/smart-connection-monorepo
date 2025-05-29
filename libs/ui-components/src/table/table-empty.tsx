import { ReactNode } from 'react';
import { RenderIcon } from '../icons';

type TableEmptyProps = {
  message?: string | ReactNode;
  columnLength: number;
};
export const TableEmpty = ({ message = 'No data here', columnLength }: TableEmptyProps) => {
  return (
    <tr>
      <td colSpan={columnLength} className="p-4 text-center text-neutral-border text-14">
        <div className="flex w-full justify-center items-center flex-col gap-2">
          <RenderIcon name="inbox" className="text-neutral-border !w-10 !h-10" />
          {message}
        </div>
      </td>
    </tr>
  );
};
