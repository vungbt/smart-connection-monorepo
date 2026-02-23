import { useSlugParams } from '@/hooks/useSlugParams';
import { ConfigListRes } from '@/types/configs';
import { configKeys } from '@/utils/apis/api-keys';
import { API_ROUTES } from '@/utils/apis/router';
import { useApiQuery } from '@smart-connection-monorepo/api-client';

type ConfigSlugUtilsResult = {
  isAdd: boolean;
  isLoadingDetail: boolean;
};
export default function ConfigSlugUtils(): ConfigSlugUtilsResult {
  const { configId, isAdd } = useSlugParams();
  const { isLoading: isLoadingDetail } = useApiQuery<ConfigListRes>(
    {
      endpoint: `${API_ROUTES.CONFIGS}/${configId}`,
      queryKey: configKeys.detail(configId as string),
      params: {
        id: configId,
      },
    },
    { enabled: !!configId }
  );

  return {
    isLoadingDetail,
    isAdd,
  };
}
