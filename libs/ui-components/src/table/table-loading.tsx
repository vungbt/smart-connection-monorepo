import { ReactNode } from 'react';
import { RenderIcon } from '../icons';

export const TableLoading = (): ReactNode => {
  return (
    <tr>
      <td colSpan={1000} className="relative p-0">
        <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full flex items-center justify-center">
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]">
            <RenderIcon name="loading" />
          </span>
          {/* overlay */}
          <div className="absolute top-0 right-0 left-0 bottom-0 bg-primary-background opacity-60" />
        </div>
      </td>
    </tr>
  );
};
