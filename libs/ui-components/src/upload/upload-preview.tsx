import clsx from 'clsx';
import checkIsArray from 'lodash/isArray';
import { useMemo } from 'react';
import { RenderIcon } from '../icons';
import { UploadItem } from './types';

type UploadPreviewProps = {
  items: any;
  onRemove: (item: UploadItem) => void;
  className?: string;
};
export function UploadPreview({ items, className, onRemove }: UploadPreviewProps) {
  const itemRender = useMemo(() => {
    let newItem = [];
    const isArray = checkIsArray(items);
    if (isArray) {
      newItem = (items as UploadItem[]).map(item => ({
        id: item?.id,
        url: item?.url,
        type: item?.file?.type,
        fileName: item.file?.name,
      }));
    } else {
      newItem = [
        {
          id: items?.id,
          url: items?.url,
          type: items?.file?.type,
          fileName: items.file?.name,
        },
      ];
    }
    return newItem;
  }, [items]);

  /* image 4 */
  const renderPreview = (url: string, type: string, fileName?: string) => {
    const isBase64 = url.includes('base64');
    const typeUrl = isBase64
      ? url?.split(';')[0]?.split(':')?.pop()?.toLowerCase()?.split('/')?.pop()
      : url.split('?')[0].split('.').pop()?.toLowerCase();
    const fileExtension = type?.split('/')?.pop()?.toLowerCase() || typeUrl;
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(fileExtension!)) {
      return (
        <img
          className="rounded-lg aspect-square object-contain"
          width={114}
          height={114}
          src={url}
          alt="image-preview"
        />
      );
    } else if (['mp4', 'webm', 'ogg', 'mov'].includes(fileExtension!)) {
      return (
        <video
          width={114}
          height={114}
          className="rounded-lg aspect-square object-contain"
          controls
        >
          <source src={url} type={`video/${fileExtension}`} />
          Your browser does not support the video tag.
        </video>
      );
    } else if (fileExtension === 'pdf') {
      return (
        <iframe
          src={url}
          className="rounded-lg aspect-square object-contain"
          width={114}
          height={114}
          title="pdf-preview"
        />
      );
    } else if (
      [
        'vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'vnd.ms-excel',
        'csv',
        'xlsx',
        'xls',
      ].includes(fileExtension!)
    ) {
      return <div className="p-2 text-xs text-center">{fileName}</div>;
    } else {
      return <div className="text-sm text-gray-500">Unsupported Format</div>;
    }
  };

  return (
    <div className={clsx('flex items-center justify-start gap-3 flex-wrap', className)}>
      {itemRender.map(item => (
        <div
          key={item.id}
          className="relative rounded-lg w-fit h-fit max-h-[114px] max-w-[114px] aspect-square border border-solid border-neutral"
        >
          {renderPreview(item.url, item.type, item?.fileName)}

          <span
            onClick={() => onRemove && onRemove(item)}
            className="w-fit h-fit min-w-5 min-h-5 rounded-full cursor-pointer absolute -top-2 -right-2 bg-neutral flex items-center justify-center"
          >
            <RenderIcon name="x-mark" className="!w-3 !h-3 text-ui-fg-muted" />
          </span>
        </div>
      ))}
    </div>
  );
}
