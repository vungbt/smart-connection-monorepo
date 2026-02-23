import { RenderIcon } from '@smart-connection-monorepo/ui-components';

type ActionButtonsProps = {
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
};

export function ActionButtons({ onEdit, onDelete, onView }: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      {onEdit && (
        <button
          type="button"
          className="p-1 transition-all ease-linear hover:bg-pending rounded-md hover:text-neutral-white text-pending"
          onClick={onEdit}
        >
          <RenderIcon name="pencil-square" className="!w-5 !h-5" />
        </button>
      )}
      {onDelete && (
        <button
          type="button"
          className="p-1 transition-all ease-linear hover:bg-error rounded-md hover:text-neutral-white text-error"
          onClick={onDelete}
        >
          <RenderIcon name="trash" className="!w-5 !h-5" />
        </button>
      )}
      {onView && (
        <button
          type="button"
          className="p-1 transition-all ease-linear hover:bg-success rounded-md hover:text-neutral-white text-success"
          onClick={onView}
        >
          <RenderIcon name="eye" className="!w-5 !h-5" />
        </button>
      )}
    </div>
  );
}
