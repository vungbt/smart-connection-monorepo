import clsx from 'clsx';
import { ReactNode } from 'react';
import ReactPaginate from 'react-paginate';
import { RenderIcon } from '../icons';

type PaginationProps = {
  limit: number;
  page: number;
  pageCount: number;
  total: number;
  className?: string;
  customClasses?: {
    container?: string;
    page?: string;
    active?: string;
    next?: string;
    previous?: string;
  };
  onChangePage: (value: number) => void;
};
export const Pagination = ({
  limit,
  pageCount,
  className,
  page,
  total,
  customClasses,
  onChangePage,
}: PaginationProps): ReactNode => {
  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel={renderItemPageFL(true, page === pageCount)}
        previousLabel={renderItemPageFL(false, page === 1)}
        pageLabelBuilder={(page: number) => renderItemPage(page)}
        pageCount={pageCount || Math.ceil(total / limit)}
        forcePage={page - 1}
        onPageChange={(event: { selected: number }) => {
          if (event.selected === undefined) return;
          onChangePage(event.selected + 1);
        }}
        pageRangeDisplayed={5}
        renderOnZeroPageCount={null}
        className={clsx(className, customClasses?.container)}
        containerClassName={clsx(customClasses?.container, 'flex items-center gap-2')}
        pageClassName={clsx(
          customClasses?.page,
          'h-7 min-w-7 w-fit text-14 transition-all ease-linear flex items-center justify-center border border-solid border-neutral rounded-md hover:bg-primary-background hover:border-primary-hover cursor-pointer'
        )}
        activeClassName={clsx(
          customClasses?.active,
          'bg-primary-hover rounded-md text-neutral-white border-primary-hover hover:text-neutral-black'
        )}
        previousClassName={clsx(
          customClasses?.previous,
          'rounded-md border-neutral rounded-md hover:bg-primary-background hover:border-primary-hover border border-solid',
          {
            '!cursor-not-allowed bg-neutral hover:!bg-neutral hover:!border-neutral': page === 1,
          }
        )}
        nextClassName={clsx(
          customClasses?.next,
          'rounded-md border-neutral rounded-md hover:bg-primary-background hover:border-primary-hover border border-solid',
          {
            'cursor-not-allowed bg-neutral hover:!bg-neutral hover:!border-neutral':
              page === pageCount,
          }
        )}
      />
    </>
  );
};

const renderItemPageFL = (isNext = true, disabled = false): ReactNode => {
  return (
    <div
      className={clsx('flex text-sm py-2 items-center justify-center h-7 min-w-7 aspect-square', {
        'cursor-not-allowed': disabled,
      })}
    >
      <RenderIcon
        strokeWidth={2}
        name={isNext ? 'chevron-double-right' : 'chevron-double-left'}
        className="!w-3 !h-3"
      />
    </div>
  );
};
const renderItemPage = (page: number): ReactNode => {
  return <span className="block w-full h-full p-2">{page}</span>;
};
