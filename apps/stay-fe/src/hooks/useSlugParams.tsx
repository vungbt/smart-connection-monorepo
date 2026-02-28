import { useParams } from 'next/navigation';
import { useMemo } from 'react';

export const useSlugParams = () => {
  const { slug } = useParams<{ slug: string }>();
  const params = useMemo(() => {
    if (['add'].includes(slug as string))
      return {
        isAdd: true,
        itemId: null,
        configId: null,
      };
    return {
      itemId: slug,
      configId: slug,
      isAdd: false,
    };
  }, [slug]);

  return params;
};
